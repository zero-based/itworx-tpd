import React from "react";
import { styled, useStyletron } from "baseui";
import { Button } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";

import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../uitls/toErrorMap";
import { extractFieldErrors } from "../uitls/extractFieldErrors";
import { createUrqlClient } from "../urql/createUrqlClient";

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
            const { error } = await login(values);
            if (error) {
              var fieldErrors = extractFieldErrors(error);
              var errorMap = toErrorMap(fieldErrors);
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

export default withUrqlClient(createUrqlClient)(Login);
