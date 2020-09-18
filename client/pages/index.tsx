import { withUrqlClient } from "next-urql";
import { Button, Col, Typography } from "antd";
import { useRouter } from "next/dist/client/router";

import { createUrqlClient } from "../urql/createUrqlClient";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

const { Title } = Typography;
const Home = () => {
  const [{ data }] = useMeQuery();
  const [, logout] = useLogoutMutation();
  const router = useRouter();

  return (
    <div style={{ padding: 100, textAlign: "center" }}>
      {!data?.me ? (
        <Title>NOT LOGGED IN</Title>
      ) : (
        <Col>
          <Title level={3}>Hello,</Title>
          <Title>{data.me.name}</Title>
          <Button
            onClick={() => {
              router.push("/login");
              logout();
            }}
          >
            Logout
          </Button>
        </Col>
      )}
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
