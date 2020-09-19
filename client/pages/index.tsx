import { withUrqlClient } from "next-urql";
import { Heading, HeadingLevel } from "baseui/heading";

import { MainLayout } from "../components/MainLayout";
import { createUrqlClient } from "../urql/createUrqlClient";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <HeadingLevel>
        <Heading>TPD</Heading>
      </HeadingLevel>
    </MainLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
