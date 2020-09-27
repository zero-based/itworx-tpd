import { BaseProvider } from "baseui";
import App from "next/app";
import React from "react";
import { Provider as StyletronProvider } from "styletron-react";
import { Provider as UrqlProvider } from "urql";

import "../styles/global.css";
import { ItworxTheme } from "../styles/theme";
import { debug, styletron } from "../styletron";
import { urqlClient } from "../urql/urqlClient";
import { AuthProvider } from "../components/providers/AuthProvider";


export default class MainApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <UrqlProvider value={urqlClient}>
        <AuthProvider>
          <StyletronProvider
            value={styletron}
            debug={debug}
            debugAfterHydration
          >
            <BaseProvider theme={ItworxTheme}>
              <Component {...pageProps} />
            </BaseProvider>
          </StyletronProvider>
        </AuthProvider>
      </UrqlProvider>
    );
  }
}
