import Head from "next/head";
import Image from "next/image";
import { request } from "../lib/datocms";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Render from "../src/components/index/render";
import Redir from "../src/components/redir";

const HOMEPAGE_QUERY = `query MyQuery {
  allHomepages(orderBy: _createdAt_DESC, first: "1") {
    title
    timestamp
    eventSummary(markdown: true)
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

export default function Home({ data }) {
  const calculateTimeLeft = () => {
    const difference =
      +Number(data.allHomepages[0].timestamp) - +new Date().getTime();

    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <>
      {timerComponents.length ? (
        <Box as="main" minH="100vh" h="100%" bgColor="#F2F2F2">
          <Render
            days={timeLeft.days}
            hours={timeLeft.hours}
            minutes={timeLeft.minutes}
            seconds={timeLeft.seconds}
            data={data.allHomepages[0]}
          />
        </Box>
      ) : (
        <Redir />
      )}
    </>
  );
}
