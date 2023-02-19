import React from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Divider } from "@mui/material";
import CountUp from "../../../components/CountUp";
import { RiBillLine } from "react-icons/Ri";
import { AiOutlinePlus } from "react-icons/Ai";
import { BiUserPlus } from "react-icons/Bi";
import { GiMoneyStack } from "react-icons/Gi";
import { MdImportantDevices } from "react-icons/Md";

const rows = [
  {
    id: 1,
    shoe: "Nike Retro",
    branch: "Nike",
    image: "/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp",
    purchases: 315,
    total: "1.234.456",
  },
  {
    id: 2,
    shoe: "Nike Air",
    branch: "Nike",
    image: "/Images/Nike/AirForce1XUNDEFEATED/AirForce1XUNDEFEATED_1.webp",
    purchases: 142,
    total: "1.234.456",
  },
  {
    id: 3,
    shoe: "Nike Max",
    branch: "Nike",
    image: "/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_1.webp",
    purchases: 125,
    total: "1.234.456",
  },
  {
    id: 4,
    shoe: "Nike Jordan",
    branch: "Nike",
    image: "/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp",
    purchases: 116,
    total: "1.234.456",
  },
  {
    id: 5,
    shoe: "Nike 90",
    branch: "Nike",
    image: "/Images/Nike/AirForce1XUNDEFEATED/AirForce1XUNDEFEATED_1.webp",
    purchases: 111,
    total: "1.234.456",
  },
  {
    id: 6,
    shoe: "Nike",
    branch: "Nike",
    image: "/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_1.webp",
    purchases: 89,
    total: "1.234.456",
  },
  {
    id: 7,
    shoe: "Nike Air Jordan 1 Mid",
    branch: "Nike",
    image: "/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp",
    purchases: 44,
    total: "1.234.456",
  },
  {
    id: 8,
    shoe: "Nike Air Max 97",
    branch: "Nike",
    image: "/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp",
    purchases: 36,
    total: "1.234.456",
  },
  {
    id: 9,
    shoe: "Nike Dunk",
    branch: "Nike",
    image: "/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_1.webp",
    purchases: 5,
    total: "1.234.456",
  },
];

const data = [
  { name: "Jan", Nike: 4100, Adidas: 400, Converse: 2400 },
  { name: "Feb", Nike: 4100, Adidas: 532, Converse: 2400 },
  { name: "Mar", Nike: 3400, Adidas: 2400, Converse: 5125 },
  { name: "Apr", Nike: 415, Adidas: 3400, Converse: 2400 },
  { name: "May", Nike: 400, Adidas: 540, Converse: 3537 },
  { name: "Jun", Nike: 3400, Adidas: 1400, Converse: 2400 },
  { name: "Jul", Nike: 1231, Adidas: 125, Converse: 2400 },
  { name: "Aug", Nike: 400, Adidas: 2400, Converse: 2400 },
  { name: "Sep", Nike: 400, Adidas: 1500, Converse: 3400 },
  { name: "Oct", Nike: 3400, Adidas: 2400, Converse: 2400 },
  { name: "Nov", Nike: 400, Adidas: 4547, Converse: 2362 },
  { name: "Dec", Nike: 400, Adidas: 2400, Converse: 2400 },
];
const dataPie = [
  { name: "Nike", value: 400 },
  { name: "Adidas", value: 300 },
  { name: "Converse", value: 300 },
];
const COLORS = ["#0088FE", "#00C49F", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Home = () => {
  const columns = [
    {
      field: "id",
      renderHeader: () => <p className="font-bold">ID</p>,
      headerClassName: "super-app-theme--header",
      width: 50,
      flex: 1,
    },
    {
      field: "shoe",
      headerClassName: "super-app-theme--header",
      width: 200,
      editable: false,
      flex: 1,
      renderHeader: () => <p className="font-bold">Tên giày</p>,
    },
    {
      field: "branch",
      renderHeader: () => <p className="font-bold">Thương hiệu</p>,
      headerClassName: "super-app-theme--header",
      maxWidth: 160,
      editable: false,
      flex: 1,
    },
    {
      field: "image",
      renderHeader: () => <p className="font-bold">Hình ảnh</p>,
      headerClassName: "super-app-theme--header",
      maxWidth: 160,
      editable: false,
      renderCell: (params) => {
        return <img src={params.value} />;
      },
    },
    {
      field: "purchases",
      renderHeader: () => <p className="font-bold">Lượt mua</p>,
      headerClassName: "super-app-theme--header",
      type: "number",
      width: 160,
      flex: 1,
      editable: false,
    },
    {
      field: "total",
      renderHeader: () => <p className="font-bold">Tổng tiền</p>,
      headerClassName: "super-app-theme--header",
      width: 200,
      flex: 1,
      editable: false,
      renderCell: (params) => {
        return <span>{params.value} VND</span>;
      },
    },
  ];

  return (
    <div className="bg-slate-100 mt-10">
      <div className="grid grid-cols-2 gap-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 justify-center">
        <div className="mt-14 bg-white sm:w-40 ml-3 md:w-[70%] lg:w-[90%] h-44 rounded-2xl relative drop-shadow-lg">
          <div className="flex flex-row">
            <div className=" bg-black w-16 h-16 ml-4 rounded-lg -mt-3 text-white drop-shadow-lg flex flex-col justify-around items-center">
              <RiBillLine size={40} />
            </div>
            <div className="mt-2 right-6 absolute flex flex-col items-end">
              <p className="font-thin  md:text-lg text-base text-gray-400">
                Đơn hàng mới
              </p>
              <p className="font-bold text-3xl text-black">
                <CountUp end={291} />
              </p>
            </div>
          </div>
          <div>
            <Divider className="text-black mt-7" variant="middle" />
            <div className="flex flex-row items-center bottom-0 mt-14 ml-3">
              <AiOutlinePlus className="text-xl text-green-600" size={20} />
              <p className="text-xl text-green-600">
                <CountUp end={50} />
              </p>
              <p className="text-base font-thin text-gray-400 ml-1">
                So với tuần trước
              </p>
            </div>
          </div>
        </div>
        <div className="mt-14 bg-white sm:w-40 ml-3 md:w-[70%] lg:w-[90%] h-44 rounded-2xl relative drop-shadow-lg">
          <div className="flex flex-row">
            <div className=" bg-blue-500 w-16 h-16 ml-4 rounded-lg -mt-3 text-white drop-shadow-lg flex flex-col justify-around items-center">
              <BiUserPlus size={40} />
            </div>
            <div className="mt-2 right-6 absolute flex flex-col items-end">
              <p className="font-thin  md:text-lg text-base text-gray-400">
                Khách hàng mới
              </p>
              <p className="font-bold text-3xl text-blue-500">
                <CountUp end={351} />
              </p>
            </div>
          </div>
          <div>
            <Divider className="text-black mt-7" variant="middle" />
            <div className="flex flex-row items-center bottom-0 mt-14 ml-3">
              <AiOutlinePlus className="text-xl text-green-600" size={20} />
              <p className="text-xl text-green-600">
                <CountUp end={70} />
              </p>
              <p className="text-base font-thin text-gray-400 ml-1">
                So với hôm qua
              </p>
            </div>
          </div>
        </div>
        <div className="mt-14 bg-white sm:w-40 ml-3 md:w-[70%] lg:w-[90%] h-44 rounded-2xl relative drop-shadow-lg">
          <div className="flex flex-row">
            <div className=" bg-green-500 w-16 h-16 ml-4 rounded-lg -mt-3 text-white drop-shadow-lg flex flex-col justify-around items-center">
              <GiMoneyStack size={40} />
            </div>
            <div className="mt-2 right-6 absolute flex flex-col items-end">
              <p className="font-thin  md:text-lg text-base text-gray-400">
                Doanh thu
              </p>
              <p className="font-bold text-3xl text-green-500">
                <CountUp end={514000} />
              </p>
            </div>
          </div>
          <div>
            <Divider className="text-black mt-7" variant="middle" />
            <div className="flex flex-row items-center bottom-0 mt-14 ml-3">
              <AiOutlinePlus className="text-xl text-green-600" size={20} />
              <p className="text-xl text-green-600">
                <CountUp end={30} />
              </p>
              <p className="md:text-base text-base font-thin text-gray-400 ml-1">
                % So với tháng trước
              </p>
            </div>
          </div>
        </div>
        <div className="mt-14 bg-white sm:w-40 ml-3 md:w-[70%] lg:w-[90%] h-44 rounded-2xl relative drop-shadow-lg">
          <div className="flex flex-row">
            <div className=" bg-red-500 w-16 h-16 ml-4 rounded-lg -mt-3 text-white drop-shadow-lg flex flex-col justify-around items-center">
              <MdImportantDevices size={40} />
            </div>
            <div className="mt-2 right-6 absolute flex flex-col items-end">
              <p className="font-thin  md:text-lg text-base text-gray-400">
                Lượt truy cập
              </p>
              <p className="font-bold text-3xl text-red-500">
                <CountUp end={2163} />
              </p>
            </div>
          </div>
          <div>
            <Divider className="text-black mt-7" variant="middle" />
            <div className="flex flex-row items-center bottom-0 mt-14 ml-3">
              <AiOutlinePlus className="text-xl text-green-600" size={20} />
              <p className="text-xl text-green-600">
                <CountUp end={130} />
              </p>
              <p className=" text-base font-thin text-gray-400 ml-1">
                So với tháng trước
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:flex sm:flex-col lg:flex-row md:justify-evenly drop-shadow-lg">
        <div className="flex flex-col mt-10 border p-8 bg-white rounded-lg w-72 md:w-full lg:w-[50%]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width="100%"
              height={400}
              data={data}
              margin={{
                top: 10,
              }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Nike"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="Adidas"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="Converse"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
          <Divider className="text-black mt-7" variant="middle" />
          <p className="text-xl font-bold mt-3">
            Thống kê doanh thu theo tháng
          </p>
          <p className="text-xl font-thin text-gray-500">
            <span className="font-bold">(+15%)</span> Doanh số hôm nay
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mt-10 border-2 p-8 m-2 flex flex-col drop-shadow-sm bg-white rounded-lg">
            <div>
              <p className="sm:text-xl lg:text-2xl">Thu nhập :</p>
            </div>
            <hr />
            <PieChart width={200} height={300}>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <div>
              <ul className="flex flex-col md:flex-row justify-between list-disc">
                <li className="text-[#0088FE]">Nike</li>
                <li className="text-[#00C49F]">Adidas</li>
                <li className="text-[#FF8042]">Converse</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-2 p-8 m-2 flex flex-col bg-white rounded-lg">
            <div>
              <p className="sm:text-xl lg:text-2xl">Chi phí :</p>
            </div>
            <hr />
            <PieChart width={200} height={300}>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <div>
              <ul className="flex flex-col md:flex-row justify-between list-disc">
                <li className="text-[#0088FE]">Nike</li>
                <li className="text-[#00C49F]">Adidas</li>
                <li className="text-[#FF8042]">Converse</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 m-4 bg-slate-50 rounded-lg justify-around items-center flex flex-col drop-shadow-lg">
        <Box
          sx={{
            height: 700,
            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "rgb(135,206,250)",
            },
          }}>
          <DataGrid
            getRowHeight={() => "auto"}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default Home;
