/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type AppProps, type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Nav from "../components/nav";
import { SessionProvider } from "next-auth/react";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ToastContainer />
        <Nav />
        <Component {...pageProps} />;
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
