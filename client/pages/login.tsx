/*import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { Store } from "antd/lib/form/interface";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";

import { createUrqlClient } from "../urql/createUrqlClient";
import { useLoginMutation } from "../generated/graphql";
import { mapErrorToField } from "../uitls/mapErrorToField";
import { extractFieldErrors } from "../uitls/extractFieldErrors";

const requiredRule = [{ required: true }];

const Login: React.FC<{}> = ({}) => {
  const [, login] = useLoginMutation();
  const [form] = Form.useForm();
  const router = useRouter();

  const onSubmit = async (values: Store) => {
    const { error } = await login({
      email: values.email,
      password: values.password,
    });
    if (error) {
      var fieldErrors = extractFieldErrors(error);
      var fieldData = mapErrorToField(fieldErrors);
      form.setFields(fieldData);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <Row>
        <Col lg={12} xs={24}>
          <div
            style={{
              backgroundImage: `url('./assets/cover-login.jpg')`,
              minHeight: "100vh",
              backgroundPositionX: "right",
              backgroundPositionY: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </Col>
        <Col
          lg={12}
          xs={24}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
          }}
        >
          <img
            src="/assets/logo-master.png"
            style={{ width: "180px", marginBottom: 32 }}
          />
          <Form
            form={form}
            layout="vertical"
            size="large"
            initialValues={{ email: "", password: "" }}
            onFinish={onSubmit}
            hideRequiredMark
            style={{ width: "80%" }}
          >
            <Form.Item name="email" label="Email" rules={requiredRule}>
              <Input />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={requiredRule}>
              <Input.Password />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ padding: "0 32px", marginTop: 24 }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
*/
