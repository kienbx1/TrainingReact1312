import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";
import { Form } from "formik";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AdminLayout from "../../../../components/layouts/AdminLayout";

const AddNewProduct = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onSubmit = (data) => console.log(data);
  const { register, handleSubmit } = useForm();
  const [imgsSrc, setImgsSrc] = useState([]);
  const onChange = (e) => {
    // for (const file of e.target.files) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     setImgsSrc((imgs) => [...imgs, reader.result]);
    //   };
    //   reader.onerror = () => {
    //     console.log(reader.error);
    //   };
    // }
    console.log("hehe");
  };
  console.log(imgsSrc, imgsSrc.length);
  return (
    <div>
      <form
        className="border border-solid p-2 rounded-lg flex flex-col align-baseline"
        onSubmit={handleSubmit(onSubmit)}>
        <input
          onChange={onChange}
          type="file"
          name="file"
          multiple
          {...register("images")}
        />
        <img className="w-40 h-auto" />
        <input
          className="border border-solid p-2 rounded-lg "
          {...register("name", { required: true, maxLength: 20 })}
        />

        <input className="border border-solid p-2 rounded-lg " type="submit" />
      </form>
    </div>
  );
};
AddNewProduct.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default AddNewProduct;
