import { Box, Center } from "@chakra-ui/react";
import React from "react";
import Header from "../src/components/header";
const List = ({ data }) => {
  return (
    <Box as="main" minH="100vh" h="100%" bgColor="#F2F2F2">
     <Header data={"none"} />
      <Center fontSize="2xl" mt="2rem">Coming soon</Center>
    </Box>
  );
};

export default List;
