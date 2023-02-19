import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { useRouter } from "next/router";
import { MdOutlineCancel } from "react-icons/Md";
const datas = {
  id: 1,
  account: "aa@gmail.com",
  pass: "1234",
  userName: "Sows",
  address: "Đà Nẵng,Việt Nam",
  phoneNumber: "123567890",
  status: "online",
  isAdmin: false,
  joinDate: "20-2-2023",
};

const detailUser = () => {
  const router = useRouter();
  const [dataUser, setDataUser] = useState([]);
  const userID = router.query;
  //Gọi api tìm kiếm theo tên user
  return (
    <div className="flex flex-col items-start p-6 bg-slate-100">
      <div className="rounded-sm bg-white w-full border-black p-2 flex flex-row justify-between">
        <div>
          <div className="flex flex-row items-center p-2">
            <img
              src="/Images/banner_forget.webp"
              alt="Avatar"
              className="w-24 rounded-full m-2"
            />
            <p className="uppercase flex flex-row font-bold text-3xl">
              <span>{datas.userName}</span>
            </p>
          </div>
          <div className="flex flex-col">
            <p className="m-2 text-xl font-medium">
              Địa chỉ : <span>{datas.address}</span>
            </p>
            <p className="m-2 text-xl font-medium">
              Số điện thoại : <span>{datas.phoneNumber}</span>
            </p>
            <p className="m-2 text-xl font-medium">
              Ngày tạo tài khoản : <span>{datas.joinDate}</span>
            </p>
          </div>
        </div>
        <div>
          <button className="text-red-400" onClick={() => router.back()}>
            <MdOutlineCancel size={50} />
          </button>
        </div>
      </div>
      <div className="rounded-sm mt-2 bg-white w-full border-black p-2 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center p-2">
          <img
            className="w-28 rounded-sm"
            src="/Images/Nike/AirForce1XUNDEFEATED/AirForce1XUNDEFEATED_1.webp"
          />
          <div className="flex flex-col ml-2">
            <p className="uppercase text-xl m-2">Air Force 1X UNDEFEATED</p>
            <p className="uppercase text-lg m-2">
              Số lượng : <span>2</span>
            </p>
            <p className="uppercase text-lg m-2">
              Thành tiền : <span>2.000.000 VND</span>
            </p>
            <p className="uppercase text-lg m-2">
              Ngày tạo đơn : <span>20-2-2022</span>
            </p>
          </div>
        </div>
        <div>
          <span className="bg-green-400 text-white p-2 rounded-lg ml-1 uppercase">
            Đã giao
          </span>
        </div>
      </div>
      <div className="rounded-sm mt-2 bg-white w-full border-black p-2 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center p-2">
          <img
            className="w-28 rounded-sm"
            src="/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_1.webp"
          />
          <div className="flex flex-col ml-2">
            <p className="uppercase text-xl m-2">Air Jordan7 RetroSe 1</p>
            <p className="uppercase text-lg m-2">
              Số lượng : <span>2</span>
            </p>
            <p className="uppercase text-lg m-2">
              Thành tiền : <span>4.000.000 VND</span>
            </p>
            <p className="uppercase text-lg m-2">
              Ngày tạo đơn : <span>25-2-2022</span>
            </p>
          </div>
        </div>
        <div>
          <span className="bg-green-400 text-white p-2 rounded-lg ml-1 uppercase">
            Đã giao
          </span>
        </div>
      </div>
      <div className="rounded-sm mt-2 bg-white w-full border-black p-2 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center p-2">
          <img
            className="w-28 rounded-sm"
            src="/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp"
          />
          <div className="flex flex-col ml-2">
            <p className="uppercase text-xl m-2">Air Jordan XXXVIISP 1</p>
            <p className="uppercase text-lg m-2">
              Số lượng : <span>1</span>
            </p>
            <p className="uppercase text-lg m-2">
              Thành tiền : <span>3.000.000 VND</span>
            </p>
            <p className="uppercase text-lg m-2">
              Ngày tạo đơn : <span>02-03-2022</span>
            </p>
          </div>
        </div>
        <div>
          <span className="bg-green-400 text-white p-2 rounded-lg ml-1 uppercase">
            Đã giao
          </span>
        </div>
      </div>
      <div className="rounded-sm mt-2 bg-white w-full border-black p-2 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center p-2">
          <img
            className="w-28 rounded-sm"
            src="/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/White/display.jpg"
          />
          <div className="flex flex-col ml-2">
            <p className="uppercase text-xl m-2">
              Chuck Taylor All Star Lugged 2.0
            </p>
            <p className="uppercase text-lg m-2">
              Số lượng : <span>4</span>
            </p>
            <p className="uppercase text-lg m-2">
              Thành tiền : <span>14.000.000 VND</span>
            </p>
            <p className="uppercase text-lg m-2">
              Ngày tạo đơn : <span>15-03-2022</span>
            </p>
          </div>
        </div>
        <div>
          <span className="bg-red-400 text-white p-2 rounded-lg ml-1 uppercase">
            Đã huỷ
          </span>
        </div>
      </div>
      <div className="rounded-sm mt-2 bg-white w-full border-black p-2 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center p-2">
          <img
            className="w-28 rounded-sm"
            src="/Images/Converse/Converse x DRKSHDW TURBOWPN High Top/display.jpg"
          />
          <div className="flex flex-col ml-2">
            <p className="uppercase text-xl m-2">Converse x DRKSHDW TURBOWPN</p>
            <p className="uppercase text-lg m-2">
              Số lượng : <span>1</span>
            </p>
            <p className="uppercase text-lg m-2">
              Thành tiền : <span>1.300.000 VND</span>
            </p>
            <p className="uppercase text-lg m-2">
              Ngày tạo đơn : <span>02-04-2022</span>
            </p>
          </div>
        </div>
        <div>
          <span className="bg-red-400 text-white p-2 rounded-lg ml-1 uppercase">
            Đã huỷ
          </span>
        </div>
      </div>
    </div>
  );
};
detailUser.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default detailUser;
