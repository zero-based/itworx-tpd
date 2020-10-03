import React, { CSSProperties, ReactNode } from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Label3, Label4 } from "baseui/typography";
import { Loading } from "./Loading";
import { Heading, HeadingLevel } from "baseui/heading";

interface PageLayoutProps {
  title?: string;
  action?: ReactNode;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  contentStyle?: CSSProperties;
}

export const PageLayout: React.FC<PageLayoutProps> = (props) => {
  const [, theme] = useStyletron();

  if (props.loading ?? false) return <Loading />;
  if (props.error ?? false)
    return (
      <Block
        display="flex"
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <Label3 color={theme.colors.primary}>
          {props.errorMessage ?? "Something wrong has happened"}
        </Label3>
      </Block>
    );

  return (
    <Block
      display="flex"
      flexDirection="column"
      paddingLeft={["scale0", "scale500", "scale900", "scale2400"]}
      paddingRight={["scale0", "scale500", "scale900", "scale2400"]}
    >
      {props.title || props.action ? (
        <Block
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="scale800"
        >
          <HeadingLevel>
            <Heading styleLevel={4} margin={0}>
              {props.title ?? null}
            </Heading>
          </HeadingLevel>

          {props.action ?? null}
        </Block>
      ) : null}

      <div style={props.contentStyle}>{props.children}</div>
    </Block>
  );
};
