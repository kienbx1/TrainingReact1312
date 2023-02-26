import React, { useEffect, useState } from "react";
import { FaHome, FaUser, FaHandHoldingUsd } from "react-icons/fa";
import { GiConverseShoe } from "react-icons/gi";
import { useRouter } from "next/router";
import Popover from "@mui/material/Popover";
import { Button, Typography } from "@mui/material";
import { resetState } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useCookies from "universal-cookie";

const menu = [
  {
    path: "/Admin/home",
    des: "Trang chủ",
    icon: <FaHome className="mr-2 text-red-500" />,
    color: "gray-400",
    txtColor: "text-red-500",
  },
  {
    path: "/Admin/user/users",
    des: "Người dùng",
    icon: <FaUser className="mr-2 text-yellow-500" />,
    txtColor: "text-yellow-500",
    expand: ["Admin", "User"],
  },
  {
    path: "/Admin/statistical",
    des: "Thống kê",
    icon: <FaHandHoldingUsd className="mr-2 text-green-500" />,
    txtColor: "text-green-500",
  },
  {
    path: "/Admin/product/Products",
    des: "Sản phẩm",
    icon: <GiConverseShoe className="mr-2 text-blue-500" />,
    txtColor: "text-blue-900",
  },
];

const cookies = new useCookies();

const SideBar = () => {
  const [collapse, setCollapse] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [displayImg, setDisplayImg] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleCollapse = () => {
    setCollapse((collapse) => !collapse);
  };
  // setDisplayImg(user.profilePicUrl);
  //   setDisplayName(user.name);
  // useEffect(() => {

  //   console.log(user);
  // }, []);
  const dispatch = useDispatch();
  const handleLogout = () => {
    // dispatch(resetState());
    cookies.remove("token");
    console.log("logout");
  };
  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        <Button
          onClick={() => {
            router.push({
              pathname: "/",
            });
          }}
          variant="text"
          sx={{ p: 1, width: "100%" }}>
          Quay về trang chủ
        </Button>
        <Button
          variant="text"
          onClick={handleLogout}
          sx={{ p: 1, width: "100%", background: "#00000" }}>
          Đăng xuất
        </Button>
      </Popover>
      <div className="sticky top-0 md:flex flex-col justify-between w-52 h-screen bg-white shadow-2xl mr-2 hidden">
        <div className="flex flex-col p-3">
          <div
            className="h-fit flex flex-row items-center bg-blue-200 mb-4 justify-evenly"
            onClick={handleClick}>
            <img
              className="rounded-full md:rounded-none w-16 h-auto md:w-16 p-1 sm:p-0"
              src={user.profilePicUrl}
            />
            <p className="text-sm font-medium text-black hidden md:block">
              {user.name}
            </p>
          </div>
          {menu.map((data) => (
            <button
              key={data?.path}
              onClick={() => {
                router.push({
                  pathname: data?.path,
                });
              }}
              className={`flex flex-row ${data?.txtColor} hover:bg-red-100 rounded-lg w-full h-10 cursor-pointer p-2 items-center active:bg-red-100`}>
              {data?.icon}
              {data?.des}
            </button>
          ))}
        </div>
        <button
          onClick={handleCollapse}
          className={`hover:bg-blue-400 w-full h-16  flex flex-col justify-around items-center ${
            collapse ? "bg-blue-300" : "bg-blue-500"
          }`}></button>
      </div>
      <div className="sticky top-0 flex flex-row justify-between w-full h-auto bg-white shadow-2xl mr-2 md:hidden z-10">
        <div className="flex flex-row-reverse w-full justify-between p-3 bg-slate-100">
          <div
            className="h-16 w-fit flex flex-col items-center mb-4"
            onClick={handleClick}>
            <img
              className="rounded-full md:rounded-none w-16 h-auto"
              src={displayImg}
            />
            <p className="text-sm font-medium text-black hidden md:block">
              {displayName}
            </p>
          </div>
          <div className="flex flex-row">
            {menu.map((data) => (
              <button
                key={data?.path}
                onClick={() => {
                  router.push({
                    pathname: data?.path,
                  });
                }}
                className={`flex flex-col ${data?.txtColor} hover:bg-red-100 rounded-lg w-full h-full cursor-pointer justify-evenly align-middle items-center active:bg-red-100`}>
                {data?.icon}
                {data?.des}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
