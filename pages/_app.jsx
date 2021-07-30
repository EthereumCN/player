import { ChakraProvider, Box, Flex } from "@chakra-ui/react";

// web3 state
import { Web3ContextProvider } from "../src/utils/helper/web3";
// components
// import { Container } from "../src/components/common/container";

// css
import { theme } from "../styles/theme";

function App({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Web3ContextProvider>
        {/* <Container minH="100vh" minW="1200px" margin="0 auto"> */}
        <Component {...pageProps} />
        {/* </Container> */}
      </Web3ContextProvider>
    </ChakraProvider>
  );
}

export default App;
