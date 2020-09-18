import { Layout } from "antd";

import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <NavBar />
      <Layout.Content style={{ padding: 48 }}>
        {children}
      </Layout.Content>
      <Footer />
    </Layout>
  );
};
