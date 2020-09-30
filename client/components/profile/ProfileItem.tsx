import React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Label2, Label4 } from "baseui/typography";

interface ProfileItemProps {
  title: string;
  value: string;
}

export const ProfileItem: React.FC<ProfileItemProps> = (props) => {
  const [css, theme] = useStyletron();

  return (
    <Block display="flex" flexDirection="column" margin="32px 0">
      <Label4 color={theme.colors.accent}>{props.title}</Label4>
      <Label2>{props.value}</Label2>
    </Block>
  );
};
