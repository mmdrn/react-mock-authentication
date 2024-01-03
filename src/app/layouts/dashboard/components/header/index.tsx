import { Fragment, memo, useContext, useState } from "react";
import userAvatarIcon from "./../../../../assets/images/user.png";
import germanyIcon from "./../../../../assets/images/germany.png";
import storage from "../../../../services/storage";
import { Link, useNavigate } from "react-router-dom";
import { GlobalThemeContext } from "../../../../App";
import { AuthUserContext } from "../..";

const Header = memo(() => {
  const navigate = useNavigate();
  const globalThemeContext = useContext(GlobalThemeContext);
  const authUserContext = useContext(AuthUserContext);
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const handleCollapseSidebar = (value: "expanded" | "collapsed") => {
    if (globalThemeContext.setTheme) {
      globalThemeContext.setTheme({
        sidebar: value,
      });
    }
  };

  return (
    <header className="py-2 pl-4 pr-6 flex items-center justify-between bg-white border-b border-gray-100 shadow-headerShadow relative z-10">
      <span
        className="cursor-pointer"
        onClick={() => {
          handleCollapseSidebar(
            globalThemeContext.theme.sidebar === "collapsed"
              ? "expanded"
              : "collapsed"
          );
        }}
      >
        <span className="material-symbols-rounded text-4xl text-blue-800">
          &#xe5d2;
        </span>
      </span>

      <div className="flex items-center justify-end">
        <span className="border rounded-full inline-flex items-center justify-center mr-5 h-9 w-9 bg-gray-100 cursor-pointer">
          <span className="material-symbols-rounded text-2xl text-gray-600">
            &#xe7f4;
          </span>
        </span>

        <div className="rounded-full overflow-hidden w-9 h-9 mr-5 cursor-pointer">
          <img
            src={germanyIcon}
            alt="user's avatar"
            className="block w-full h-full"
          />
        </div>

        {/* profile */}
        <div className="ml-auto mr-0 relative">
          <div
            className="flex cursor-pointer py-3"
            onClick={() => setPopupIsOpen(!popupIsOpen)}
          >
            {/* avatar */}
            {authUserContext ? (
              <div className="rounded-full overflow-hidden w-9 h-9">
                <img
                  src={userAvatarIcon}
                  alt="user's avatar"
                  className="block w-full h-full"
                />
              </div>
            ) : (
              <div className="rounded-full overflow-hidden w-9 h-9 bg-gray-300 animate-pulse"></div>
            )}

            {/* username */}
            <p className="leading-9 pl-3 font-normal text-gray-600 flex items-center">
              {authUserContext ? (
                <Fragment>
                  <span>{`${authUserContext?.firstName} ${authUserContext?.lastName}`}</span>
                  <span className="material-symbols-rounded inline-block ml-2">
                    arrow_drop_down
                  </span>
                </Fragment>
              ) : (
                <span className="animate-pulse rounded-md bg-gray-300 h-6 block w-40"></span>
              )}
            </p>
          </div>

          <div
            className={`absolute top-3/4 right-0 w-full bg-white rounded-md shadow-wrapperShadow transition-all overflow-hidden ${
              popupIsOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            {/* signout button */}
            <div
              className="w-full cursor-pointer px-2 py-3 flex items-center justify-start transition-all text-red-700 "
              onClick={() => {
                storage.clear();
                navigate("/signin");
              }}
            >
              <span className="material-symbols-rounded">logout</span>
              <span className="pl-2 text-sm">Signout</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
