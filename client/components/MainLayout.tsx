import * as React from "react";
import { Footer } from "./Footer";
import NavBar from "./NavBar";

interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
