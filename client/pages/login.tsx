import React from "react";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";

import { InputField } from "../components/InputField";
import { useLoginMutation } from "../graphql/types";
import { toErrorMap } from "../utils/toErrorMap";

const Login: React.FC<{}> = ({}) => {
  const [css] = useStyletron();
  const [, login] = useLoginMutation();
  const router = useRouter();

  return (
    <FlexGrid flexGridColumnCount={[1, 1, 2, 2]}>
      <FlexGridItem>
        <div
          className={css({
            backgroundImage: `url('./assets/cover-login.jpg')`,
            minHeight: "100vh",
            backgroundPositionX: "right",
            backgroundPositionY: "center",
            backgroundSize: "cover",
          })}
        />
      </FlexGridItem>
      <FlexGridItem display="flex">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);
            const errors = response.data?.login?.errors;
            if (errors) {
              var errorMap = toErrorMap(errors);
              setErrors(errorMap);
            } else {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form
              style={{
                margin: "auto",
                width: "70%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "32px 0",
              }}
            >
              <img
                src="/assets/logo-master.png"
                className={css({ width: "180px", marginBottom: "32px" })}
              />
              <InputField name="email" label="Email" required />
              <InputField
                name="password"
                label="Password"
                type="password"
                required
              />
              <Button
                type="submit"
                isLoading={isSubmitting}
                $style={{ marginTop: "24px" }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </FlexGridItem>
    </FlexGrid>
  );
};

export default Login;
