import { memo, type FC, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { HeaderWrapper } from "./style";

interface IProps {
  children?: ReactNode;
}

let headerTitles = [
  {
    title: "TYPE",
    path: "/type",
  },
  {
    title: "WORDS",
    path: "/words",
  },
  {
    title: "ABOUT",
    path: "/about",
  },
];

const AppHeader: FC<IProps> = () => {
  return (
    <HeaderWrapper>
      {headerTitles.map((item, i) => {
        return (
          <div className="header" key={i}>
            <NavLink
              to={item.path}
              className={({ isActive }) => {
                return isActive ? "active" : undefined;
              }}
            >
              {item.title}
            </NavLink>
          </div>
        );
      })}
    </HeaderWrapper>
  );
};

export default memo(AppHeader);
