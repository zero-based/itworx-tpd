import * as React from "react";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { MainLayout } from "../components/MainLayout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../urql/createUrqlClient";

const Index: React.FC = () => {
  const [css, theme] = useStyletron();

const Home = () => {
  return (
    <MainLayout>
      <Button onClick={() => console.log("Boilerplate")}>Log Text</Button>
      <p className={css({ color: theme.colors.accent600 })}> Hello!</p>
    </MainLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
