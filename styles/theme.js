// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}

// custome breakpoints 
const breakpoints = createBreakpoints({
  sm: "375px",
  md: "760px",
  lg: "1200px",
  xl: "1440px",
  "2xl": "1680px",
  "3xl": "1920px",

})

const theme = extendTheme({ colors, breakpoints })

export default theme