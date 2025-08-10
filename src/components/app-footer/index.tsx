import { GithubOutlined } from "@ant-design/icons";
import { memo, type FC, type ReactNode } from "react";
import { FooterWrapper } from "./style";

interface IProps {
  children?: ReactNode;
}

const AppFooter: FC<IProps> = () => {
  return (
    <FooterWrapper className="flex-center">
      <a href="https://github.com/en-xi/keyboard-words" target="_blank">
        <GithubOutlined />
      </a>
    </FooterWrapper>
  );
};

export default memo(AppFooter);
