import { memo, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import storage from "../../services/storage";
import logo from "./../../assets/images/logo.png";

const AuthenticationLayout = memo(() => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = storage.get("access_token");
    if (token) {
      navigate("/dashboard/organizations");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="grid grid-cols-1 gap-y-6 w-96 rounded-md shadow-wrapperShadow p-6 bg-white">
        {/* logo */}
        <div className="mt-4 px-8 flex justify-center w-full">
          {/* prettier-ignore */}
          <img src={logo} alt="logo" className="inline-block w-full h-full pb-4" />
        </div>

        <Outlet />
      </div>
    </div>
  );
});

export default AuthenticationLayout;
