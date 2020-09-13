import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useMeQuery } from "../generated/graphql";

const Home = () => {
  const [{ data }] = useMeQuery();

  const content = { marginTop: "100px" };

  return (
    <div style={content}>
      <div className="text-center mb-5">
        Hello,
        <br />
        {data?.me.email}
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
