import { withUrqlClient } from "next-urql";
import { Typography } from "antd";

import { createUrqlClient } from "../urql/createUrqlClient";
import { MainLayout } from "../components/MainLayout";

const { Title } = Typography;

const Home = () => {
  return (
    <MainLayout>
      <Title>TPD</Title>
    </MainLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
