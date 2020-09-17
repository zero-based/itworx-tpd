import { createUrqlClient } from "../urql/createUrqlClient";
import { useLoginMutation } from "../generated/graphql";

import React from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Form
      name="basic"
      initialValues={{ email: "", password: "" }}
      onFinish={async (values) => {
        const response = await login({
          email: values.email,
          password: values.password,
        });
        if (response.data == null) {
          console.log("[ERROR] ", response.error?.message);
        } else {
          router.push("/");
        }
      }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item style={{ textAlign: "center" }}>
        <Button
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
