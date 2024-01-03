import {
  Fragment,
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { Outlet, useNavigate } from "react-router-dom";
import storage from "../../services/storage";
import { GlobalThemeContext } from "../../App";
import { useQuery } from "@tanstack/react-query";
import AuthService from "../../../api/services/auth-service";
import { toast } from "react-toastify";
import { AuthUser } from "../../../api/interfaces/i-auth-service/types";
import { ErrorBoundary } from "react-error-boundary";

export const AuthUserContext = createContext<AuthUser | null>(null);

const DashboardLayout = memo(() => {
  const navigate = useNavigate();
  const globalThemeContext = useContext(GlobalThemeContext);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const navItems = useMemo(() => {
    return [
      {
        route: "/dashboard",
        label: "Dashboard",
        iconCode: "&#xe88a;",
        end: true,
      },
      {
        route: "/dashboard/products",
        label: "Products",
        iconCode: "&#xf1d0",
        end: false,
      },
    ];
  }, []);

  useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const service = AuthService.getInstance();

      const user = await service.getAuthUser();
      if (user) {
        setAuthUser(user);
        return user;
      }

      toast("An error occured while fetching auth user.", {
        type: "error",
      });
      return null;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const token = storage.get("access_token");
    if (!token) {
      storage.clear();
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <Fragment>
      <AuthUserContext.Provider value={authUser}>
        {/* sidebar */}
        <Sidebar
          navItems={navItems}
          sidebarStatus={globalThemeContext.theme.sidebar}
        />

        {/* wrapper */}
        <div
          className={`${
            globalThemeContext.theme.sidebar === "expanded"
              ? "w-wrapper"
              : globalThemeContext.theme.sidebar === "collapsed"
              ? "w-wrapperFull"
              : ""
          } transition-all duration-300 h-full mr-0 ml-auto`}
        >
          {/* header */}
          <Header />

          {/* content wrapper */}
          <div className="w-full grid grid-cols-1 gap-6 p-6">
            <ErrorBoundary
              fallback={
                <div className="text-center py-20 flex flex-col justify-center items-center text-red-900">
                  <span className="material-symbols-rounded text-6xl">
                    &#xe000;
                  </span>
                  <p className="mt-1 font-light">
                    An error occured.
                    <br />
                    Please reload page or signin again.
                  </p>
                </div>
              }
            >
              <Outlet />
            </ErrorBoundary>
          </div>
        </div>
      </AuthUserContext.Provider>
    </Fragment>
  );
});

export default DashboardLayout;
