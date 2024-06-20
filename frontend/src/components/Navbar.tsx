// Composant/Navbar.tsx
import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUser, logout } from "../features/auth/authSlice";
import logo from "../assets/argentBankLogo.webp";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {user ? (
          <>
            <NavLink className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {user.firstName}
            </NavLink>

            <NavLink to='/' className="main-nav-item" onClick={handleLogout}>
               <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </>
        ) : (
          <NavLink className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
