import React, { useEffect, useState } from "react";
import { FaHome, FaUser, FaHandHoldingUsd } from "react-icons/fa";
import { GiConverseShoe } from "react-icons/gi";
import { useRouter } from "next/router";
import Popover from "@mui/material/Popover";
import {
  alertTitleClasses,
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { resetState } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useCookies from "universal-cookie";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { BsFillMenuAppFill, BsFillMenuButtonWideFill } from "react-icons/Bs";
const menu = [
  {
    path: "/Admin/home",
    des: "Trang chủ",
    icon: <FaHome size={30} className="mr-2 text-red-500" />,
    color: "gray-400",
    txtColor: "text-red-500",
  },
  {
    path: "/Admin/user/users",
    des: "Người dùng",
    icon: <FaUser size={30} className="mr-2 text-yellow-500" />,
    txtColor: "text-yellow-500",
    expand: ["Admin", "User"],
  },
  {
    path: "/Admin/statistical",
    des: "Thống kê",
    icon: <FaHandHoldingUsd size={30} className="mr-2 text-green-500" />,
    txtColor: "text-green-500",
  },
  {
    path: "/Admin/product/Products",
    des: "Sản phẩm",
    icon: <GiConverseShoe size={30} className="mr-2 text-blue-500" />,
    txtColor: "text-blue-900",
  },
];
const drawerWidth = 200;
const cookies = new useCookies();
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideBar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar style={{ background: "#2E3B55" }} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}>
            <BsFillMenuButtonWideFill/>
          </IconButton>
          <Typography className="uppercase" variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className="flex flex-row-reverse justify-between" style={{ background: "#2E3B55" }}>
          <BsFillMenuAppFill
            size={25}
            className="text-white cursor-pointer"
            onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <BsFillMenuAppFill />
            ) : (
              <BsFillMenuAppFill />
            )}
          </BsFillMenuAppFill>
          <Typography className="uppercase text-white" variant="h6" noWrap component="div">Admin page</Typography>

        </DrawerHeader>
        <Divider />
        <List>
          {menu.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  router.push(`${text.path}`);
                  setTitle(text.des);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  primary={text.des}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
};

export default SideBar;
