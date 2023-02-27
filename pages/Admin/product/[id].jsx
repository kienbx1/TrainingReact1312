import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { useRouter } from "next/router";
import { MdOutlineCancel } from "react-icons/Md";
const rows = {
  id: 1,
  shoe: "Air Jordan XXXVII SP",
  branch: "Nike",
  image: "/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp",
  purchases: 35,
  total: "1.234.456",
};

const datas = [
  {
    id:"1",
    avatar: "/Images/banner_forget.webp",
    name: "Sows",
    purchases: 5,
    total: "9,000,000",
  },
  {
    id:"2",
    avatar: "/Images/Avatar/avatar11.jpg",
    name: "Adria",
    purchases: 5,
    total: "4,211,000",
  },
  {
    id:"3",
    avatar: "/Images/Avatar/avatar12.jpg",
    name: "Adrian",
    purchases: 4,
    total: "1,654,000",
  },
  {
    id:"4",
    avatar: "/Images/Avatar/avatar13.jpg",
    name: "Nokki",
    purchases: 2,
    total: "6,500,000",
  },
  {
    id:"5",
    avatar: "/Images/Avatar/avatar11.jpg",
    name: "Loi",
    purchases: 6,
    total: "4,211,000",
  },
  {
    id:"6",
    avatar: "/Images/Avatar/avatar12.jpg",
    name: "Tana",
    purchases: 2,
    total: "5,515,000",
  },
  {
    id:"7",
    avatar: "/Images/Avatar/avatar13.jpg",
    name: "Bloop",
    purchases: 1,
    total: "2,271,000",
  },
  {
    id:"8",
    avatar: "/Images/Avatar/avatar11.jpg",
    name: "Hiaguain",
    purchases: 3,
    total: "9,000,000",
  },
  {
    id:"9",
    avatar: "/Images/Avatar/avatar12.jpg",
    name: "Yaru",
    purchases: 3,
    total: "4,599,000",
  },
];

const DetailProduct = () => {
  const router = useRouter();
  const [dataUser, setDataUser] = useState([]);
  const userID = router.query;
  //Gọi api tìm kiếm theo idproduct
  return (
    <div className="flex flex-col items-start mt-10 p-6 bg-slate-100">
      <div className="rounded-sm bg-white w-full border-black p-2 flex flex-row justify-between">
        <div>
          <div className="flex flex-row items-center p-2">
            <img
              src={rows.image}
              alt="Avatar"
              className="w-24 rounded-full m-2"
            />
            <p className="uppercase flex flex-row font-bold text-3xl">
              <span>{rows.shoe}</span>
            </p>
          </div>
          <div className="flex flex-col">
            <p className="m-2 text-xl font-medium">
              Thương hiệu : <span>{rows.branch}</span>
            </p>
            <p className="m-2 text-xl font-medium">
              Số lượng đặt : <span>{rows.purchases}</span>
            </p>
            <p className="m-2 text-xl font-medium">
              Tổng tiền : <span>{rows.total} VND</span>
            </p>
          </div>
        </div>
        <div>
          <button className="text-red-400" onClick={() => router.back()}>
            <MdOutlineCancel size={50} />
          </button>
        </div>
      </div>
      {datas.map((data) => (
        <div className="rounded-lg mt-2 bg-white w-full border-black p-2 flex flex-row justify-between items-center">
          <div className="flex flex-row items-center p-2">
            <img className="w-28 rounded-lg" src={data.avatar} />
            <div className="flex flex-col ml-2">
              <p className="uppercase text-xl font-bold m-2">{data.name}</p>
              <p className="uppercase text-lg m-2">
                Số lượng đã đặt: <span>{data.purchases}</span>
              </p>
              <p className="uppercase text-lg m-2">
                Tổng tiền : <span>{data.total} VND</span>
              </p>
             
            </div>
          </div>
          <div>
            <button onClick={()=>{ router.push({
                pathname: "/Admin/user/[id]",
                query: { id: data.id },
              });
            }} className="bg-blue-400 cursor-pointer text-white p-3 rounded-lg ml-1 uppercase">
              Xem chi tiết
            </button> 
          </div>
        </div>
      ))}
    </div>
  );
};
DetailProduct.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default DetailProduct;
