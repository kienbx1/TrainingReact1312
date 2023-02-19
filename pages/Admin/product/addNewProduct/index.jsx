import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../components/layouts/AdminLayout";
import { useRouter } from "next/router";

const AddNewProduct = () => {
  const [preview, setPreview] = useState([]);
  const router = useRouter();
  const fileobj = [];
  const changedHandler = (event) => {
    const files = event.target.files;
    fileobj.push(files);
    let reader;
    for (let i = 0; i < fileobj[0].length; i++) {
      reader = new FileReader();
      reader.readAsDataURL(fileobj[0][i]);
      reader.onload = (event) => {
        preview.push(event.target.result);
        setPreview([...new Set(preview)]);
      };
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);
    const formObject = Object.fromEntries(data.entries());
    console.log(formObject);
  };
  useEffect(() => {}, [preview]);
  const delData = () => {
    setPreview([]);
    // setName('')
    console.log("hehe");
  };

  return (
    <div className="bg-slate-100 p-3 flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="p-10 rounded-lg flex flex-col justify-around w-full h-auto">
        <input
          type="file"
          name="file"
          accept="image/*"
          multiple
          onChange={changedHandler}
        />
        <div className="grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto gap-3">
          {(preview || []).map((url, index) => (
            <img
              className="rounded-lg"
              src={url}
              alt="Image Preview"
              key={index}
              onClick={() => {
                const del = preview.filter((item) => item !== url);
                setPreview(del);
                console.log(preview);
              }}
            />
          ))}
        </div>
        <label className=" mt-5">
          <span className="block text-sm font-medium text-slate-700">
            Tên sản phẩm
          </span>
          <input
            className="border border-black mb-2 p-2 rounded-lg sm:w-[75%] md:w-[100%]"
            placeholder="Tên sản phẩm"
          />
        </label>
        <label>
          <span className="block text-sm font-medium text-slate-700">
            Tên thương hiệu
          </span>
          <select className="border border-black mb-2 p-2 rounded-lg w-[100%]">
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Converse">Converse</option>
          </select>
        </label>
        <label>
          <span className="block text-sm font-medium text-slate-700">
            Giá nhập
          </span>
          <input
            placeholder="Giá nhập"
            className="border border-black mb-2 p-2 rounded-lg w-[100%]"
          />
        </label>
        <label>
          <span className="block text-sm font-medium text-slate-700">
            Giá bán
          </span>
          <input
            placeholder="Giá bán"
            className="border border-black mb-2 p-2 rounded-lg w-[100%]"
          />
        </label>
        <label>
          <span className="block text-sm font-medium text-slate-700">
            % giảm giá
          </span>
          <input
            type="number"
            placeholder="% giảm giá"
            className="border border-black mb-2 p-2 rounded-lg w-[100%]"
          />
        </label>
        <label>
          <span className="block text-sm font-medium text-slate-700">
            Số lượng nhập
          </span>
          <input
            type="number"
            placeholder="Số lượng nhập"
            className="border border-black mb-2 p-2 rounded-lg w-[100%]"
          />
        </label>
        <div className="flex flex-row-reverse justify-items-end">
          <input
            className="border border-separate mb-2 p-2 rounded-lg md:w-32 lg:w-64 bg-green-500 cursor-pointer hover:bg-green-600 hover:scale-105 font-bold text-white"
            value="Thêm mới"
            type="submit"
          />
          <input
            className="border border-separate mb-2 p-2 rounded-lg md:w-32 lg:w-64 bg-red-500 cursor-pointer hover:bg-red-600 hover:scale-105 font-bold text-white"
            type="submit"
            value="Huỷ"
            onClick={() => {
              delData();
              router.back();
            }}
          />
        </div>
      </form>
    </div>
  );
};
AddNewProduct.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default AddNewProduct;
