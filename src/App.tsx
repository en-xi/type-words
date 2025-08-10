import { memo, type FC, type ReactNode } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

interface IProps {
  children?: ReactNode;
}

const App: FC<IProps> = () => {
  return useRoutes(routes);
};

export default memo(App);
