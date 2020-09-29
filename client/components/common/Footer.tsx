import { useStyletron } from "baseui";
import { Label3 } from "baseui/typography";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const [css, theme] = useStyletron();

  return (
    <footer
      className={css({
        padding: "24px 32px",
        backgroundColor: theme.colors.mono1000,
      })}
    >
      <Label3 color="white"> © 2020 ITWorx All rights reserved</Label3>
    </footer>
  );
};
