import React from "react";
import App from "next/app";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";

import { ItworxTheme } from "../styles/theme";
import { styletron, debug } from "../styletron";
import "../styles/global.css";

export default class MainApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
        <BaseProvider theme={ItworxTheme}>
          <Component {...pageProps} />
        </BaseProvider>
      </StyletronProvider>
    );
  }
}
