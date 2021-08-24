import { Box } from "@chakra-ui/react";
import React from "react";

const Amount = () => {


    function createMarkup() {
        return {__html: `<a href="https://www.trendcounter.com/" target="_blank"><img src="https://www.trendcounter.com/w/track/a1c419dd7f.png" style="border:0px;" alt="Web Analytics"></a>`};
      }

      

  return (
   <Box id="ceshi" style={{marginTop:"10px",marginLeft:"25px"}}  alignItems="center" dangerouslySetInnerHTML={createMarkup()} />
  );
};

export default Amount;
