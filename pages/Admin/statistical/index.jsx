import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90, editable: false },
  {
    field: "productName",
    headerName: "Tên sản phẩm",
    width: 250,
    editable: false,
  },
  {
    field: "userName",
    headerName: "Tên người mua",
    width: 250,
    editable: false,
  },
  {
    field: "Status",
    headerName: "Trạng thái",
    width: 150,
    renderCell: (params) => {
      switch (params.row.status) {
        case "Đang chờ":
          return (
            <select className="p-3 rounded-sm bg-yellow-400">
              <option defaultValue disabled>
                Đang chờ
              </option>
              <option className="bg-green" value="Đã xác nhận">
                Xác nhận
              </option>
              <option className="bg-red" value="Đã huỷ">
                Huỷ đơn
              </option>
            </select>
          );
        case "Đã xác nhận":
          return (
            <div className="bg-green-400 p-3 text-white rounded-sm">
              Đã xác nhận
            </div>
          );
        case "Đã huỷ":
          return (
            <div className="bg-red-400 p-3 text-white rounded-sm">Đã huỷ</div>
          );
      }
    },
  },
  {
    field: "amount",
    headerName: "Số lượng",
    width: 110,
    editable: false,
  },
  {
    field: "price",
    headerName: "Tổng tiền",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    type: "number",
    width: 250,
    editable: false,
  },
];
const data = [
  {
    id: 2,
    productName: "Nike",
    userName: "Sows",
    amount: 2,
    price: 32000,
    address: "Đà Nẵng,Việt Nam",
    status: "Đang chờ",
  },
  {
    id: 3,
    productName: "Nike",
    userName: "Sows",
    amount: 2,
    price: 32000,
    address: "Đà Nẵng,Việt Nam",
    status: "Đã huỷ",
  },
  {
    id: 4,
    productName: "Nike",
    userName: "Sows",
    amount: 2,
    price: 32000,
    address: "Đà Nẵng,Việt Nam",
    status: "Đã xác nhận",
  },
  {
    id: 5,
    productName: "Nike",
    userName: "Sows",
    amount: 2,
    price: 32000,
    address: "Đà Nẵng,Việt Nam",
    status: "Đã huỷ",
  },
  {
    id: 1,
    productName: "Nike",
    userName: "Sows",
    amount: 2,
    price: 32000,
    address: "Đà Nẵng,Việt Nam",
    status: "Đang chờ",
  },
];

const Statistical = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box
        component="form"
        mt={2}
        sx={{ width: "100%", height: "500px", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Chờ xác nhận" value="1" />
              <Tab label="Đã xác nhận" value="2" />
              <Tab label="Đã huỷ" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box sx={{ height: 600, width: "100%" }}>
              <DataGrid
                rows={data.filter((data) => data.status === "Đang chờ")}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={data.filter((data) => data.status === "Đã xác nhận")}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={data.filter((data) => data.status === "Đã huỷ")}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};
Statistical.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default Statistical;
