import { Spinner } from "baseui/spinner";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";

export const Loading: React.FC<{}> = () => {
  const [, theme] = useStyletron();
  return (
    <Block margin="auto">
      <Spinner color={theme.colors.primary} />
    </Block>
  );
};
