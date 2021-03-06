import {
  Icon,
  Text,
  Box,
  Tag,
  Flex,
  Link,
  Avatar,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  TableCaption,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsFillCollectionPlayFill, BsBookmarkPlus } from "react-icons/bs";
// import { BsBookmarkPlus, BsFillPeopleFill } from "react-icons/bs"
import ReactMarkdown from "react-markdown";
import ReactPlayer from "react-player";
import { request } from "../lib/datocms";
import Router from "next/router";
import Image from "next/image";
import LiveHeader from "../src/components/liveHeader";
import { useWeb3 } from "../src/utils/helper/web3";
import axios from "axios";
import Amount from '../src/components/amount';

const HOMEPAGE_QUERY = `query MyQuery {
    allHomepages(orderBy: _createdAt_DESC, first: "1") {
        title
        organization
        videoSource
        img
        timestamp
        eventSummary(markdown: true)
        agenda(markdown: true)
    }
  }
  `;

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 },
  });
  return {
    props: { data },
  };
}

const Live = ({ data }) => {
  useEffect(() => {
    const difference =
      +Number(data.allHomepages[0].timestamp) - +new Date().getTime();
    if (difference > 0) {
      Router.push("/");
    }
  }, []);

  const gfm = require("remark-gfm");
  const rehypeRaw = require("rehype-raw");

  // 登录钱包等设置
  const { active, balance, activate, deactivate, account, provider, pending } =
    useWeb3();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="main" minH="100vh" h="100%" bgColor="#F2F2F2">
      {/* {console.log(data.allHomepages[0].timestamp)} */}
      <Box>
        <LiveHeader data={data} />

        <ReactPlayer
          className="react-player"
          url={data.allHomepages[0].videoSource}
          // url={
          //   "rtmp://pc041b116.live.126.net/live/ffca1e305b5c4cb991f31e2df0c9c9f9?wsSecret=9a0835ed508d2d72fafde570e91b7cf5&wsTime=1627699173"
          // }
          width="100%"
          height="92vh"
          playing={true}
          controls={true}
        />

        <Box overflow="auto" w="100%">
          <ReactMarkdown
            remarkPlugins={[gfm]}
            rehypePlugins={[rehypeRaw]}
            children={data.allHomepages[0].agenda}
            components={{
              // Map `h1` (`# heading`) to use `h2`s.
              h1: ({ node, ...props }) => (
                <Box
                  alignItems="center"
                  as="h1"
                  fontWeight="700"
                  mt="1rem"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <Box
                  as="h2"
                  fontWeight="300"
                  mt="0.5rem"
                  fontSize="18px"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <Box as="p" fontSize="14px" mt="0.5rem" {...props} />
              ),
              table: ({ node, ...props }) => (
                <Table variant="striped" {...props} />
              ),
              caption: ({ node, ...props }) => (
                <TableCaption
                  variant="striped"
                  fontSize="large"
                  color="#b43032"
                  {...props}
                />
              ),
              thead: ({ node, ...props }) => <Thead {...props} />,
              tr: ({ node, ...props }) => <Tr {...props} />,
              th: ({ node, ...props }) => <Th {...props} />,
              tbody: ({ node, ...props }) => <Tbody {...props} />,
              td: ({ node, ...props }) => <Td {...props} />,
              tfoot: ({ node, ...props }) => <Tfoot {...props} />,
              live: ({ node, ...props }) => (
                <Flex  display={{ base: "flex", lg: "none" }}>
                  <Box
                    w="13px"
                    ml={6}
                    mt={3}
                    h="13px"
                    bgColor="#E90000"
                    borderRadius="50%"
                  />

                  <Text
                    fontSize="14px"
                    ml={4}
                    alignItems="center"
                    lineHeight="21px"
                    color="#000"
                    mt={2}
                  >
                    Live
                  </Text>

                  <Amount />
                </Flex>
              ),
              var: ({ node, ...props }) => (
                <>
                  {(!active || !account) && (
                    <Box
                      as="span"
                      mr="1.5rem"
                      display={{ base: "inline-block", lg: "none" }}
                      cursor="pointer"
                      onClick={activate}
                      fontSize="15px"
                      float="right"
                    >
                      🎁
                    </Box>
                  )}

                  {active && account && (
                    <>
                      <Box
                        as="span"
                        display={{ base: "inline-block", lg: "none" }}
                        cursor="pointer"
                        mr="1.5rem"
                        fontSize="15px"
                        float="right"
                        onClick={onOpen}
                      >
                        {" "}
                        点击领取{" "}
                      </Box>

                      <Modal onClose={onClose} isOpen={isOpen} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>
                            你好，{account.substr(account.length - 4)}
                          </ModalHeader>
                          <ModalCloseButton />
                          <ModalBody fontSize="1.5rem">
                            点击领取poap ==&gt;
                            <Box
                              as="span"
                              fontSize="20px"
                              onClick={() => {
                                axios({
                                  url: "https://graphql.us.fauna.com/graphql",
                                  method: "post",
                                  headers: {
                                    Authorization: `Basic Zm5BRVFlSkg5QUFBUU5MUGtlLV9RUC1FR0tfWk0tdlZWU21CZDd6Szo=`,
                                  },
                                  data: {
                                    query: `
                                    query obtain {
                                      obtain(user: "${account}" ){
                                        title
                                        user
                                      }
                                    }
                                      `,
                                  },
                                }).then((response) => {
                                  if (response.data.data !== undefined) {
                                    toast({
                                      title: "通知.",
                                      description:
                                        "领取成功，正在尝试跳转，若无法跳转请复制后点击跳转" +
                                        response.data.data.obtain.title,
                                      status: "success",
                                      duration: null,
                                      isClosable: true,
                                    });

                                    setTimeout(function () {
                                      window
                                        .open(
                                          response.data.data.obtain.title,
                                          "_blank"
                                        )
                                        .focus();
                                    }, 3000);
                                  } else {
                                    toast({
                                      title: "通知.",
                                      description: "领取失败",
                                      status: "error",
                                      duration: 9000,
                                      isClosable: true,
                                    });
                                  }
                                });
                              }}
                              cursor="pointer"
                            >
                              &nbsp; 🎁 &nbsp;
                            </Box>
                          </ModalBody>
                          <ModalFooter>
                            <Button onClick={deactivate}>Logout</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </>
                  )}
                </>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Live;
