import { Box, Center } from "@chakra-ui/react";
import React from "react";
import Header from "../src/components/header";
import Amount from '../src/components/amount';

const List = ({ data }) => {
  return (
    <Box as="main" minH="100vh" h="100%" bgColor="#F2F2F2">
      <Header data={"none"} />
      <Center fontSize="2xl" mt="2rem">
        Coming soon
      </Center>
    <Amount/>
    </Box>
  );
};

export default List;
