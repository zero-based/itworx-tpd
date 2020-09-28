import { Heading, HeadingLevel } from "baseui/heading";

import { useRoleQuery } from "../graphql/types";
import { withAuth } from "../hocs/withAuth";

const Home: React.FC<{}> = () => {
  const [{ data }] = useRoleQuery();

  return (
    <HeadingLevel>
      <Heading>TPD for ({data?.role!})</Heading>
    </HeadingLevel>
  );
};

export default withAuth(Home);
