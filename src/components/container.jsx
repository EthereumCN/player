import { Flex, useColorMode } from "@chakra-ui/react";

export const Container = (props) => {
  return (
    <Flex
      px="10rem"
      direction="column"
      bgColor="#111111"
      {...props}
      maxW="1280px"
    />
  );
};
