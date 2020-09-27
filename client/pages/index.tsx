import { Heading, HeadingLevel } from "baseui/heading";

import { MainLayout } from "../components/MainLayout";

const Home: React.FC<{}> = () => {
  return (
    <MainLayout>
      <HeadingLevel>
        <Heading>TPD</Heading>
      </HeadingLevel>
    </MainLayout>
  );
};

export default Home;
