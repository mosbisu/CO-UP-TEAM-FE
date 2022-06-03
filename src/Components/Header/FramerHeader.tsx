import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import HeaderLogo from "../../images/Header/HeaderLogo.png";
import React, { useState } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import { SvgUser } from "../../elements/Icon/SvgUser";
import { ProjectKey } from "../../recoil/RoomID";
import { MDChat } from "../../elements/Icon/mobile/MDChat";
import { MyProfile } from "../../recoil/MyProfile";

// 메인 프로젝트 헤더
const FramerHeader = () => {
  const { pjId } = useRecoilValue(ProjectKey);
  const { profileImage } = useRecoilValue(MyProfile);
  const mainMatch = useMatch("/tool/:id");
  const docMatch = useMatch("/tool/:id/document/*");
  const boardMatch = useMatch("/tool/:id/board");
  return (
    <React.Fragment>
      <nav className="sm:hidden w-full h-16 flex justify-between items-center fixed z-[1000] shadow-md dark:bg-6 px-[23px]">
        <Link to="/">
          <img className="mt-[3px]" width={34} height={36} src={HeaderLogo} alt="Logo" />
        </Link>
        <div className="w-[calc(100%-37rem)] min-w-max flex items-end h-10 space-x-20 text-xl font-medium pl-28 sm:hidden">
          <div className="relative">
            <Link to={`/tool/${pjId}`}>
              <span className="dark:text-white">메인</span>
            </Link>
            {mainMatch && (
              <motion.div
                transition={{ duration: 0.15 }}
                className="w-20 h-1 absolute top-9 -right-[22px] bg-3 rounded-t-2xl sm:hidden"
                layoutId="circle"
              />
            )}
          </div>
          <div className="relative">
            <Link to={`/tool/${pjId}/document`}>
              <span className="dark:text-white">문서</span>
            </Link>
            {docMatch && (
              <motion.div
                transition={{ duration: 0.15 }}
                className="w-20 h-1 absolute top-9 -right-[22px] bg-3 rounded-t-2xl sm:hidden"
                layoutId="circle"
              />
            )}
          </div>
          <div className="relative">
            <Link to={`/tool/${pjId}/board`}>
              <span className="dark:text-white">보드</span>
            </Link>
            {boardMatch && (
              <motion.div
                transition={{ duration: 0.15 }}
                className="w-20 h-1 absolute top-9 -right-[22px] bg-3 rounded-t-2xl sm:hidden"
                layoutId="circle"
              />
            )}
          </div>
        </div>
        <nav className="h-full flex justify-around items-center sm:hidden dark:bg-6">
          <Link
            to={`/tool/${pjId}/chat`}
            className="hidden md:flex mr-3 w-8 h-8 justify-center items-center rounded-full"
          >
            <span className="dark:text-white">
              <MDChat />
            </span>
          </Link>
          <div className="flex justify-between space-x-4 items-center">
            <Link to="/profile" className="sm:hidden">
              {profileImage === "" ? (
                <SvgUser />
              ) : (
                <img
                  className="rounded-full lg:m-1"
                  width={36}
                  height={36}
                  src={profileImage}
                  alt=""
                />
              )}
            </Link>
          </div>
        </nav>
      </nav>
    </React.Fragment>
  );
};

export default FramerHeader;
