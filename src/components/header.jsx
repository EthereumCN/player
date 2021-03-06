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
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  TableCaption,
} from "@chakra-ui/react";
import { useWeb3 } from "../utils/helper/web3";
import { BsFillCollectionPlayFill, BsBookmarkPlus } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";
import { useRouter } from "next/router";
import Image from "next/image";

const Header = ({ data }) => {
  // 登录钱包等设置
  const { active, balance, activate, deactivate, account, provider, pending } =
    useWeb3();
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
    <Flex h="75px" px={6} alignItems="center" justifyContent="space-between">
      <Box display={{ base: "block", lg: "none" }} w="2rem" />
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
              fontSize="33px"
              fontWeight="bold"
              alignItems="center"
              color="#333"
            >
              {data.allHomepages[0].title}
            </Heading>

            <Flex alignItems="center">
              <Text
                fontSize="18px"
                ml={8}
                alignItems="center"
                lineHeight="21px"
                color="#6f6666"
                mt={1}
              >
                {data.allHomepages[0].organization}
              </Text>

              <Box
                w="13px"
                ml={6}
                mt={2}
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
            </Flex>
          </Box>
        )}
      </Flex>

      <Box>
        <Icon
          color="#bfbfbf"
          fontSize="1.8rem"
          as={BsFillCollectionPlayFill}
          cursor="pointer"
          mr="2rem"
          onClick={() => router.push("/list")}
        />

        <Icon
          display={{ base: "none", lg: "inline-block" }}
          as={BsBookmarkPlus}
          fontSize="1.8rem"
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
          // <Icon
          //   display={{ base: "none", lg: "inline-block" }}
          //   onClick={activate}
          //   as={BiWallet}
          //   fontSize="1.8rem"
          //   color="#bfbfbf"
          //   cursor="pointer"
          //   mr="2rem"
          // />

          <Box as="span" cursor="pointer" onClick={activate}>
            Login
          </Box>
        )}

        {active && account && (
          <Avatar
            display={{ base: "none", lg: "inline-block" }}
            size="sm"
            // name="Dan Abrahmov"
            name={account}
            src={`https://api.multiavatar.com/${account}.png`}
          />
        )}
      </Box>
      {/* </div> */}
    </Flex>
  );
};

export default Header;
