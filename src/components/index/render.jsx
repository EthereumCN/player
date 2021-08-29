import {
  Box,
  Flex,
  Heading,
  Link,
  Tag,
  Text,
  Icon,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { BsFillCollectionPlayFill, BsBookmarkPlus } from "react-icons/bs";
import { GiAlarmClock } from "react-icons/gi";
import { AiOutlineBell } from "react-icons/ai";
import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Header from "../header";
const gfm = require("remark-gfm");
const rehypeRaw = require("rehype-raw");

const Render = ({ days, hours, minutes, seconds, data }) => {
  return (
    <Box>
      <Header data={"none"} />

      <Flex justifyContent="center" alignItems="center" color="#333">
        {/* <Icon
          color="#707070"
          fontSize="30px"
          as={GiAlarmClock}
          cursor="pointer"
        />{" "} */}
        <Image src="/clock.svg" alt="ecn" width={25} height={25} />
        <Box fontSize={{ base: "23px", sm: "30px" }}>
          &nbsp; {days} 天 {hours}小时 {minutes}分 {seconds}秒
        </Box>
      </Flex>

      <ReactMarkdown
        remarkPlugins={[gfm]}
        rehypePlugins={[rehypeRaw]}
        children={data.eventSummary}
        components={{
          // Map `h1` (`# heading`) to use `h2`s.
          h1: ({ node, ...props }) => (
            <Box
              as="h1"
              fontWeight="700"
              mt="0.5rem"
              fontSize="24px"
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
          img: ({ node, ...props }) => (
            <Box
              as="img"
              fontWeight="bold"
              // minW="910px"
              // minH="457px"
              boxShadow="3px 7px 5px 2px #888"
              w="100%"
              margin="0 auto"
              mt={7}
              zIndex="1"
              bgColor="#fff"
              borderRadius="15px"
              {...props}
            />
          ),
          article: ({ node, ...props }) => (
            <Box px={{ base: "1.5rem" }} pb="2rem">
              <Box
                fontWeight="bold"
                maxW="910px"
                minH="500px"
                w="100%"
                margin="0 auto"
                mt={7}
                zIndex="1"
                // bgColor="#fff"
                borderRadius="15px 15px 15px 15px;"
                {...props}
              />
            </Box>
          ),
          div: ({ node, ...props }) => <Box px="1rem" py="2rem" {...props} />,
          em: ({ node, ...props }) => (
            <Link
              _hover={{ textDecoration: "none" }}
              isExternal
              href="https://ethereum.us2.list-manage.com/subscribe/post?u=ab5eff800c44ca67b27f1581f&amp;id=b6319ace8c"
            >
              <Tag
                bgColor="#F2F3FE"
                cursor="pointer"
                fontSize="14px"
                px="1rem"
                // {...props}
              >
                <Icon color="#18abe3" fontSize="14px" as={AiOutlineBell} />{" "}
                &nbsp; {props.children[0]}
              </Tag>
              {/* <Modals /> */}
            </Link>
          ),
          phone: ({ node, ...props }) => (
            <Link
              display={{ base: "block", lg: "none" }}
              _hover={{ textDecoration: "none" }}
              isExternal
              href="https://ethereum.us2.list-manage.com/subscribe/post?u=ab5eff800c44ca67b27f1581f&amp;id=b6319ace8c"
            >
              <Flex
                alignItems="center"
                justifyContent="center"
                mt="2rem"
                fontSize="14px"
                fontWeight="400"
                cursor="pointer"
              >
                <Image src="/arrow.svg" alt="ecn" width={20} height={20} />
                <Box>&nbsp; Stay tuned</Box>
              </Flex>
            </Link>
          ),
        }}
      />
    </Box>
  );
};

export default Render;
