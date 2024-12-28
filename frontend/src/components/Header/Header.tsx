import { Outlet } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div>
      <p>Header</p>

      <Outlet />
    </div>
  );
};

export default Header;
