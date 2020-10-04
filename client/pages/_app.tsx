import React from "react";
import App from "next/app";
import Head from "next/head";
import { BaseProvider } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Provider as UrqlProvider } from "urql";

import "../styles/global.css";
import { ItworxTheme } from "../styles/theme";
import { debug, styletron } from "../styletron";
import { urqlClient } from "../urql/urqlClient";

export default class MainApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <UrqlProvider value={urqlClient}>
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
          <BaseProvider theme={ItworxTheme}>
            <Head>
              <title>ITWorx | TPD</title>
            </Head>
            <Component {...pageProps} />
          </BaseProvider>
        </StyletronProvider>
      </UrqlProvider>
    );
  }
}
