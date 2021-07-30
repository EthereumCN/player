import React, { useEffect } from "react";
import Router from 'next/router'

export default function Redir() {
  useEffect(() => {
    Router.push('/live') // redirecting to home page
  }, []);

  return (
    <div>
      <h1>The page will be re-directed in three seconds. Please wait a moment...</h1>
    </div>
  );
}