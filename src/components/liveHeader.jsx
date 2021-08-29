import React from "react";
import {
  Icon,
  Text,
  Box,
  Tag,
  Flex,
  Link,
  Avatar,
  Heading,
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
import { useWeb3 } from "../utils/helper/web3";
import { BsFillCollectionPlayFill, BsBookmarkPlus } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import Amount from "../components/amount";

let randomNum = (m, n) => {
  var num = Math.floor(Math.random() * (m - n) + n);
  return num;
};

const LiveHeader = ({ data }) => {
  // 登录钱包等设置
  const { active, balance, activate, deactivate, account, provider, pending } =
    useWeb3();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     height: "112px",
    //     paddingLeft: "24px",
    //     paddingRight: "24px",
    //     alignItems: "center",
    //     justifyContent: "space-between",
    //   }}
    // >
    <>
      <Flex
        h="80px"
        px={6}
        alignItems="center"
        justifyContent="space-between"
        display={{ base: "none", lg: "flex" }}
      >
        <Flex alignItems="center">
          <Box
            as="span"
            onClick={() => {
              window.open("https://ethereum.cn", "_blank").focus();
            }}
            cursor="pointer"
          >
            <Image src="/ecn.png" alt="ecn" width={100} height={95} />
          </Box>
          {data === "none" ? (
            <></>
          ) : (
            <Box display={{ base: "none", lg: "block" }}>
              <Heading
                ml={8}
                fontSize="25px"
                fontWeight="bold"
                alignItems="center"
                color="#333"
                letterSpacing="2px"
              >
                {data.allHomepages[0].title}
              </Heading>

              <Flex alignItems="center">
                <Text
                  fontSize="16px"
                  letterSpacing="2px"
                  ml={8}
                  alignItems="center"
                  lineHeight="21px"
                  color="#6f6666"
                  mt={1}
                >
                  {data.allHomepages[0].organization}
                </Text>

                <Box
                  w="10px"
                  ml={6}
                  mt={2}
                  h="10px"
                  bgColor="#E90000"
                  borderRadius="50%"
                />
                <Text
                  fontSize="14px"
                  ml={1}
                  alignItems="center"
                  lineHeight="21px"
                  color="#000"
                  mt={2}
                  fontWeight="600"
                >
                  Live
                </Text>

                <Amount />
              </Flex>
            </Box>
          )}
        </Flex>

        <Box position="relative">
          <Flex>
            <Icon
              color="#bfbfbf"
              fontSize="1.5rem"
              as={BsFillCollectionPlayFill}
              cursor="pointer"
              mr="2rem"
              onClick={() => router.push("/list")}
            />

            <Icon
              display={{ base: "none", lg: "inline-block" }}
              as={BsBookmarkPlus}
              fontSize="1.5rem"
              color="#bfbfbf"
              cursor="pointer"
              mr="2rem"
              onClick={() => {
                window
                  .open(
                    "https://ethereum.us2.list-manage.com/subscribe/post?u=ab5eff800c44ca67b27f1581f&id=b6319ace8c",
                    "_blank"
                  )
                  .focus();
              }}
            />

            {(!active || !account) && (
              <Box
                as="span"
                display={{ base: "none", lg: "inline-block" }}
                onClick={() => {
                  activate();
                  console.log(account);
                }}
                cursor="pointer"
              >
                Login
              </Box>
            )}


            {active && account && (
              <>
                <Avatar
                  cursor="pointer"
                  colorScheme="orange"
                  display={{ base: "none", lg: "inline-block" }}
                  size="sm"
                  name={account}
                  src={`https://api.multiavatar.com/${account}.png`}
                  onClick={onOpen}
                />

                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      Hello，{account.substr(account.length - 4)}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody fontSize="1.5rem">
                      Claim POAP =&gt;
                      <Box
                        as="span"
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
          </Flex>
        </Box>

        {/* </div> */}
      </Flex>
    </>
  );
};

export default LiveHeader;
