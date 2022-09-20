import "../styles/globals.css";
// import { SessionProvider } from "next-auth/react";
import React from "react";
function MyApp({ Component, pageProps, session }) {
  return (
    <>
      {/* <SessionProvider session={session}> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
