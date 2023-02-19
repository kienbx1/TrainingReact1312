import AdminLayout from "../../../components/layouts/AdminLayout";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [selectedRows, setSelectedRows] = useState();
  const router = useRouter();
  const [inf, setInf] = useState([]);
  const columns = [
    {
      field: "name",
      headerName: "Tên sản phẩm",
      width: 200,
      editable: true,
    },
    {
      field: "images",
      renderHeader: () => <p>Hình ảnh</p>,
      width: 200,
      editable: false,
      renderCell: (params) => {
        return <img className="w-[84px]" src={params.row.images[0]} />;
      },
    },
    {
      field: "brand",
      headerName: "Thương hiệu",
      width: 200,
      flex: 1,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Ngày nhập",
      width: 250,
      flex: 1,
      editable: false,
      renderCell: (params) => {
        const date = params.row.createdAt.slice(0, 10);
        return <p className="font-serif">{date}</p>;
      },
    },
    {
      field: "priceInput",
      headerName: "Giá nhập",
      type: "number",
      width: 110,
      editable: true,
      flex: 1,
    },
    {
      field: "discount",
      headerName: "Giảm giá",
      type: "number",
      width: 110,
      editable: true,
      flex: 1,
    },
    {
      field: "priceSell",
      headerName: "Giá bán",
      type: "number",
      width: 110,
      editable: true,
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Nhập vào",
      type: "number",
      width: 150,
      editable: true,
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
    {
      field: "quantityLeft",
      headerName: "Còn lại",
      type: "number",
      width: 150,
      editable: false,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              router.push({
                pathname: "/Admin/product/[id]",
                query: { id: params.rowNode.id },
              });
            }}>
            Xem chi tiết
          </Button>
        );
      },
    },
  ];
  // Toast
  const messageSuccess = (res) => {
    toast.success(res?.data?.msg);
  };
  const messageError = (value) => {
    toast.error(value);
  };
  const EditToolbar = () => {
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
            onClick={onHandleDel}>
            Xoá
          </Button>
        </Stack>
      </GridToolbarContainer>
    );
  };
  // Get all data
  useEffect(() => {
    axios({
      url: "/api/products/",
      method: "GET",
    }).then((res) => {
      setInf(res?.data?.products);
      console.log(res.data.products);
    });
  }, []);

  // Update product
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow };
    const field = {
      name: newRow.name,
      createdAt: newRow.createdAt,
      quantity: newRow.quantity,
      priceSell: newRow.priceSell,
      discount: newRow.discount,
      priceInput: newRow.priceInput,
    };
    setSelectedRows(newRow._id);
    // Gọi api update row
    axios({
      url: `/api/products/${selectedRows}`,
      method: "PUT",
      data: field,
    })
      .then((res) => {
        if (res) messageSuccess(res);
      })
      .catch((error) => {
        const err = error?.response?.data?.msg;
        if (error) {
          messageError(err);
        }
      });
    return updatedRow;
  };
  // Delete products
  const onHandleDel = () => {
    axios({ url: `/api/products/${selectedRows}`, method: "DELETE" })
      .then((res) => {
        if (res) messageSuccess(res);
      })
      .catch((error) => {
        const err = error?.response?.data?.msg;
        if (error) {
          messageError(err);
        }
      });
  };
  return (
    <div className="p-6 mt-10">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <p className="text-lg uppercase p-2">Danh sách sản phẩm</p>
      <div>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={inf}
            getRowId={(row) => row._id}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            editMode="row"
            processRowUpdate={processRowUpdate}
            disableSelectionOnClick
            components={{ Toolbar: EditToolbar }}
            experimentalFeatures={{ newEditingApi: true }}
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
