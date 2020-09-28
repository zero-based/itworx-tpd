import { Heading, HeadingLevel } from "baseui/heading";

import { MainLayout } from "../components/common/MainLayout";
import { useRoleQuery } from "../graphql/types";
import { withAuth } from "../hocs/withAuth";

const Home: React.FC<{}> = () => {
  const [{ data }] = useRoleQuery();

  return (
    <MainLayout>
      <HeadingLevel>
        <Heading>TPD for ({data?.role!})</Heading>
      </HeadingLevel>
    </MainLayout>
  );
};

export default withAuth(Home);
