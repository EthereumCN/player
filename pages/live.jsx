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
import React, { useEffect } from "react";
import { BsFillCollectionPlayFill, BsBookmarkPlus } from "react-icons/bs";
// import { BsBookmarkPlus, BsFillPeopleFill } from "react-icons/bs"
import ReactMarkdown from "react-markdown";
import ReactPlayer from "react-player";
import { request } from "../lib/datocms";
import Router from "next/router";
import Image from "next/image";
import LiveHeader from "../src/components/liveHeader";

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

  return (
    <Box as="main" minH="100vh" h="100%" bgColor="#F2F2F2">
      {/* {console.log(data.allHomepages[0].timestamp)} */}
      <Box>
        <LiveHeader data={data} />

        <ReactPlayer
          className="react-player"
          // url={data.allHomepages[0].videoSource}
          url={"https://www.youtube.com/watch?v=ysz5S6PUM-U"}
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
                  as="h1"
                  fontWeight="700"
                  mt="1rem"
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
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Live;
