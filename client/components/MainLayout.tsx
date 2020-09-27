import { useStyletron } from "baseui";

import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <NavBar />
      <main
        className={css({
          flex: 1,
          padding: "32px",
          display: "flex",
          flexDirection: "column",
        })}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
