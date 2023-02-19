import React, { useState } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";

const data = [
  {
    id: 1,
    account: "aa@gmail.com",
    pass: "1234",
    userName: "Sows",
    address: "Đà Nẵng,Việt Nam",
    phoneNumber: "123567890",
    status: "online",
    isAdmin: false,
  },
  {
    id: 2,
    account: "aa@gmail.com",
    pass: "1234",
    userName: "Sows",
    address: "Đà Nẵng,Việt Nam",
    phoneNumber: "123567890",
    status: "online",
    isAdmin: false,
  },
  {
    id: 3,
    account: "aa@gmail.com",
    pass: "1234",
    userName: "Sows",
    address: "Đà Nẵng,Việt Nam",
    phoneNumber: "123567890",
    status: "online",
    isAdmin: false,
  },
  {
    id: 4,
    account: "aa@gmail.com",
    pass: "1234",
    userName: "Sows",
    address: "Đà Nẵng,Việt Nam",
    phoneNumber: "123567890",
    status: "online",
    isAdmin: false,
  },
  {
    id: 5,
    account: "aa@gmail.com",
    pass: "1234",
    userName: "Sows",
    address: "Đà Nẵng,Việt Nam",
    phoneNumber: "123567890",
    status: "online",
    isAdmin: false,
  },
  {
    id: 6,
    account: "aa@gmail.com",
    pass: "1234",
    userName: "Sows",
    address: "Đà Nẵng,Việt Nam",
    phoneNumber: "123567890",
    status: "online",
    isAdmin: false,
  },
  {
    id: 7,
    account: "aa@gmail.com",
    pass: "1234",
    userName: "Sows",
    address: "Đà Nẵng,Việt Nam",
    phoneNumber: "123567890",
    status: "online",
    isAdmin: false,
  },
  {
    id: 8,
    account: "aa@gmail.com",
    pass: "1234",
    userName: "Sows",
    address: "Đà Nẵng,Việt Nam",
    phoneNumber: "123567890",
    status: "online",
    isAdmin: false,
  },
  {
    id: 9,
    account: "aa@gmail.com",
    pass: "1234",
    userName: "Sows",
    address: "Đà Nẵng,Việt Nam",
    phoneNumber: "123567890",
    status: "online",
    isAdmin: true,
  },
  {
    id: 10,
    account: "aa@gmail.com",
    pass: "1234",
    userName: "Sows",
    address: "Đà Nẵng,Việt Nam",
    phoneNumber: "123567890",
    status: "online",
    isAdmin: true,
  },
];
const tabs = [
  { label: "Người dùng", value: "1" },
  { label: "Người quản trị", value: "2" },
];
const textFields = [
  {
    label: "Tài khoản",
  },
  {
    label: "Mật khẩu",
  },
  {
    label: "Tên người dùng",
  },
  {
    label: "Số điện thoại",
  },
  {
    label: "Địa chỉ",
  },
  {
    label: "Quản trị",
  },
];

const User = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70, editable: false },
    {
      field: "account",
      headerName: "Tài khoản",
      width: 200,
      flex: 1,
      editable: true,
    },
    {
      field: "pass",
      headerName: "Mật khẩu",
      width: 200,
      flex: 1,
      editable: true,
    },
    {
      field: "userName",
      headerName: "Tên người dùng",
      width: 150,
      flex: 1,
      editable: true,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 100,
      flex: 1,
      editable: false,
    },
    {
      field: "phoneNumber",
      headerName: "Số điện thoại",
      width: 150,
      flex: 1,
      editable: true,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 250,
      flex: 1,
      editable: true,
    },
    {
      field: "isAdmin",
      headerName: "Quản trị",
      width: 100,
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Xoá",
      width: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              router.push({
                pathname: "/Admin/user/[id]",
                query: { id: params.id },
              });
              console.log(params.id);
            }}>
            Xem chi tiết
          </Button>
        );
      },
    },
  ];

  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onHandleDelete = (row) => {
    // Gọi API xoá
  };
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    // Gọi api update row
    return updatedRow;
  };
  const EditToolbar = () => {
    const handleOpen = () => setOpen(true);
    return (
      <GridToolbarContainer>
        <Stack spacing={2} direction="row">
          <Button
            startIcon={<FaPlus />}
            color="primary"
            variant="outlined"
            onClick={handleOpen}>
            Thêm mới
          </Button>
          <Button
            startIcon={<FaTrashAlt />}
            color="error"
            variant="outlined"
            onClick={handleOpen}>
            Xoá
          </Button>
        </Stack>
      </GridToolbarContainer>
    );
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box>
            <DialogTitle id="modal-modal-title" variant="h5" component="h2">
              Thêm mới tài khoản
            </DialogTitle>
            <DialogContent>
              <Box
                id="modal-modal-description"
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "100%" },
                }}>
                {textFields.map((textField) => (
                  <TextField
                    key={textField.label}
                    label={textField.label}
                    variant="outlined"
                  />
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Huỷ bỏ
              </Button>
              <Button variant="outlined" color="success">
                Xác nhận
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box sx={{ height: 650, width: "100%" }}>
              <DataGrid
                rows={data.filter((data) => !data.isAdmin)}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                editMode="row"
                processRowUpdate={processRowUpdate}
                experimentalFeatures={{ newEditingApi: true }}
                components={{ Toolbar: EditToolbar }}
                checkboxSelection
              />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box sx={{ height: 650, width: "100%" }}>
              <DataGrid
                rows={data.filter((data) => data.isAdmin)}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                editMode="row"
                processRowUpdate={processRowUpdate}
                experimentalFeatures={{ newEditingApi: true }}
                components={{ Toolbar: EditToolbar }}
                checkboxSelection
              />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};
User.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default User;
