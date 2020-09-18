import { Layout } from "antd";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      © 2020 ITWorx All rights reserved
    </Layout.Footer>
  );
};
