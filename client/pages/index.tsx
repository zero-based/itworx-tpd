import { Heading, HeadingLevel } from "baseui/heading";

import { MainLayout } from "../components/common/MainLayout";
import { withAuth } from "../hocs/withAuth";
import { useAuth } from "../hooks/useAuth";

const Home: React.FC<{}> = () => {
  const { role } = useAuth();

  return (
    <MainLayout>
      <HeadingLevel>
        <Heading>TPD for ({role})</Heading>
      </HeadingLevel>
    </MainLayout>
  );
};

export default withAuth(Home);
