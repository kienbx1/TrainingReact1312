import AdminLayout from "../../../components/layouts/AdminLayout";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const columns = [
  { field: "id", headerName: "ID", width: 90, editable: false },
  {
    field: "name",
    headerName: "Tên sản phẩm",
    width: 250,
    editable: false,
    flex: 1,
  },
  {
    field: "image",
    flex: 1,
    renderHeader: () => <p>Hình ảnh</p>,
    maxWidth: 120,
    editable: false,
    renderCell: (params) => {
      return (
        <img
          className="mix-blend-color-burn p-2 object-cover aspect-auto"
          src={params.value}
        />
      );
    },
  },
  {
    field: "branch",
    headerName: "Thương hiệu",
    width: 200,
    flex: 1,
    editable: false,
  },
  {
    field: "dateImport",
    headerName: "Ngày nhập",
    width: 200,
    flex: 1,
    editable: false,
  },
  {
    field: "price",
    headerName: "Giá",
    type: "number",
    width: 110,
    editable: false,
    flex: 1,
  },

  {
    field: "quantityLeft",
    headerName: "Còn lại",
    type: "number",
    width: 150,
    editable: false,
    flex: 1,
  },
  {
    field: "quantityInput",
    headerName: "Nhập vào",
    type: "number",
    width: 150,
    editable: false,
    flex: 1,
  },
  {
    field: "quantitySold",
    headerName: "Đã bán",
    type: "number",
    width: 150,
    editable: false,
    flex: 1,
  },
];
const data = [
  {
    id: 2,
    name: "Sows",
    branch: "Nike",
    image: "/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp",
    price: 31,
    dateImport: "20-02-2023",

    quantityLeft: 1212,
    quantitySold: 1222,
    quantityInput: 12123,
  },
  {
    id: 10,
    name: "Snow",
    image: "/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp",
    branch: "Nike",
    price: 35,
    dateImport: "20-02-2023",

    quantityInput: 1123,
    quantityLeft: 1232,
    quantitySold: 122,
  },
  {
    id: 14,
    name: "Sáhdk",
    image: "/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp",
    branch: "Nike",
    price: 37,
    dateImport: "20-02-2023",

    quantityLeft: 128765,
    quantitySold: 12522,
    quantityInput: 1235123,
  },
  {
    id: 4,
    name: "sadaas",
    branch: "Converse",
    image:
      "/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/Black/display.jpg",
    price: 31,
    dateImport: "20-02-2023",

    quantityLeft: 123,
    quantitySold: 1513,
    quantityInput: 1251,
  },
  {
    id: 5,
    name: "hảq",
    branch: "Converse",
    image:
      "/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/Black/display.jpg",

    price: 31,
    dateImport: "20-02-2023",

    quantityLeft: 122312,
    quantitySold: 1222,
    quantityInput: 1235123,
  },
  {
    id: 6,
    name: "ghâva",
    branch: "Converse",
    image:
      "/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/Black/display.jpg",
    price: 31,
    dateImport: "20-02-2023",

    quantityLeft: 122312,
    quantitySold: 1222,
    quantityInput: 1235123,
  },
  {
    id: 7,
    name: "ãvvas",
    branch: "Adidas",
    price: 31,
    dateImport: "20-02-2023",

    quantityLeft: 122312,
    quantitySold: 1222,
    quantityInput: 1235123,
    image: "/Images/Adidas/CONTINENTAL 80/display.webp",
  },
  {
    id: 8,
    name: "Ságasows",
    branch: "Adidas",
    price: 31,
    dateImport: "20-02-2023",

    quantityLeft: 122312,
    quantitySold: 1222,
    image: "/Images/Adidas/CONTINENTAL 80/display.webp",
    quantityInput: 1235123,
  },
  {
    id: 9,
    name: "jhfd",
    branch: "Adidas",
    price: 31,
    dateImport: "20-02-2023",
    quantityLeft: 122312,
    quantitySold: 1222,
    image: "/Images/Adidas/CONTINENTAL 80/display.webp",
    quantityInput: 1235123,
  },
];

const Products = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const router = useRouter();

  const EditToolbar = () => {
    const handleOpen = () => setOpen(true);
    return (
      <GridToolbarContainer>
        <Stack spacing={2} direction="row">
          <Link href="/Admin/product/addNewProduct">
            <Button variant="outlined" startIcon={<FaPlus />}>
              Thêm mới
            </Button>
          </Link>
          <Button
            startIcon={<FaTrashAlt />}
            color="error"
            variant="outlined"
            onClick={() => {}}>
            Xoá
          </Button>
        </Stack>
      </GridToolbarContainer>
    );
  };
  return (
    <div className="p-6">
      <p className="text-lg uppercase p-2">Danh sách sản phẩm</p>
      <div>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: EditToolbar }}
            onCellDoubleClick={(ids) => {
              router.push({
                pathname: "/Admin/product/DetailProduct",
                query: { id: ids.id, selectedRows },
              });
            }}
            onSelectionModelChange={(ids) => {
              setSelectedRows(ids);
            }}
          />
        </Box>
      </div>
    </div>
  );
};

Products.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default Products;
