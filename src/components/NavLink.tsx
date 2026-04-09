import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavLink = ({ className, activeClassName, pendingClassName, to, ...props }) => (
  <RouterNavLink
    to={to}
    className={({ isActive, isPending }) =>
      cn(className, isActive && activeClassName, isPending && pendingClassName)
    }
    {...props}
  />
);

export { NavLink };
