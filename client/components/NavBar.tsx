import { Layout, Menu } from "antd";
import { CaretDownOutlined, PlusOutlined } from "@ant-design/icons";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/dist/client/router";

const { SubMenu } = Menu;

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const [{ data }] = useMeQuery();
  const [, logout] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
    logout();
  };

  return (
    <Layout.Header
      style={{
        width: "100%",
        padding: 0,
      }}
    >
      <Menu mode="horizontal" style={{ display: "flex" }}>
        <Menu.Item key="home" onClick={() => router.push("/")}>
          <img src="/assets/logo-master.png" alt="logo" width="100px" />
        </Menu.Item>
        <SubMenu key="talents" title="Talents">
          <Menu.Item key="resources">Resources</Menu.Item>
          <Menu.Item key="releases">Releases</Menu.Item>
        </SubMenu>
        <div id="items-divider" style={{ marginRight: "auto" }}></div>
        <SubMenu key="create" icon={<PlusOutlined />}>
          <Menu.ItemGroup title="Request">
            <Menu.Item key="create:resource">Resource</Menu.Item>
            <Menu.Item key="create:release">Release</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        {!data?.me ? (
          <Menu.Item key="more:status" onClick={() => router.push("/login")}>
            Login
          </Menu.Item>
        ) : (
          <SubMenu key="more" icon={<CaretDownOutlined />}>
            <Menu.Item key="more:account">{data.me?.name}</Menu.Item>
            <Menu.Item key="more:logout" onClick={handleLogout}>
              Logout
            </Menu.Item>
          </SubMenu>
        )}
      </Menu>
    </Layout.Header>
  );
};
