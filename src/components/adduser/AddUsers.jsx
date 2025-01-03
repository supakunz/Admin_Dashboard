/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Fragment, useContext, useState } from "react";
import { TransitionChild, Dialog, DialogPanel } from "@headlessui/react";
import TextField from "@mui/material/TextField";
import upload_area from "../../assets/upload_area.svg";
import Image from "next/image";
import Button from "@mui/material/Button";
import { ProductContext } from "@/providers/ProductProvider";
import Swal from "sweetalert2";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { signup } from "@/functions/register";
import { getusers } from "@/functions/userdata";

const AddUsers = ({ isOpen, setIsOpen }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });
  const [image, setImage] = useState(false);
  const { setUserData } = useContext(ProductContext);

  const handleChange = (e) => {
    if (e.target.name === "file") {
      //เมื่อมี file เข้ามาจะ set file ใน form data
      setData({ ...data, [e.target.name]: e.target.files[0] });
      setImage(e.target.files[0]);
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    //**ก่อนที่จะส่งต้องส่ง form เป็น multipart/form-data */

    // ** Add Avatar Feature
    // const formWithImageData = new FormData();
    // for (const key in data) {
    //   formWithImageData.append(key, data[key]);
    // }
    // console.log(formWithImageData); //ไม่แสดงเพราะเป็นแบบ multipart/form-data

    Swal.fire({
      title: "Loading...",
      html: "Please wait...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading(null);
      },
    });
    await signup(data)
      .then((res) => {
        console.log(res.data.message);
        setData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        });
        setImage(false);
        setIsOpen(false);
        Swal.close();
        Swal.fire({
          title: "Successfuly!",
          text: "User has been created.",
          icon: "success",
        });
      })
      .catch((err) => {
        const response = err.response.data.message;
        setData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        });
        setImage(false);
        setIsOpen(false);
        Swal.close();
        Swal.fire({
          title: "Something Wrong!",
          text: response,
          icon: "error",
        });
      })
      .finally(() => {
        getusers()
          .then((res) => setUserData(res.data.response))
          .catch((err) => console.log(err));
      });
  };

  return (
    <div className="relative z-10 focus:outline-none test">
      <Dialog open={isOpen} as="div" onClose={() => setIsOpen(false)}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-950/25" />
        </TransitionChild>

        <div className="fixed inset-0 text-slate-700 tablet:left-[15.6rem]">
          <div className="grid min-h-full mx-2 place-items-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="flex flex-col items-center w-full max-w-3xl gap-4 p-4 bg-white border rounded-md shadow-sm border-slate-200">
                <div className="flex justify-end w-full">
                  <button
                    className="p-2 font-medium transition-opacity hover:opacity-60"
                    onClick={() => {
                      setIsOpen(false);
                      setImage(false);
                      setData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        role: "",
                      });
                    }}
                  >
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-[0.8fr_1fr] w-[80%] mb-8 gap-2">
                  <div className="content-center">
                    <label htmlFor="file-input">
                      <Image
                        src={image ? URL.createObjectURL(image) : upload_area}
                        alt="file_image"
                        width={200}
                        height={200}
                        className="object-contain my-[15px] rounded-[10px]"
                      />
                    </label>
                  </div>
                  <div>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5 justify-center"
                      encType="multipart/form-data"
                      // *ต้องกำหนดให้ส่งเป็น multipart/form-data *
                    >
                      <div className="flex gap-4">
                        <TextField
                          required
                          id="outlined-required"
                          name="firstName"
                          label="FirstName"
                          onChange={handleChange}
                          value={data.name}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          name="lastName"
                          label="LastName"
                          onChange={handleChange}
                          value={data.price}
                        />
                      </div>
                      <TextField
                        required
                        id="outlined-required"
                        name="email"
                        type="email"
                        label="Email"
                        onChange={handleChange}
                        value={data.detail}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        name="password"
                        label="Password"
                        onChange={handleChange}
                        value={data.password}
                      />
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Role
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={data.role}
                          name="role"
                          label="Role"
                          onChange={handleChange}
                        >
                          <MenuItem className="font-medium" value={"admin"}>
                            Admin
                          </MenuItem>
                          <MenuItem className="font-medium" value={"user"}>
                            User
                          </MenuItem>
                        </Select>
                      </FormControl>
                      {/* Add Avatar Feature */}
                      {/* <input
                        onChange={handleChange}
                        className="box-border w-full h-[50px] rounded-[4px] pl-[15px] border-solid border-[1px] text-[14px] border-[#c3c3c3] text-[#7b7b7b]"
                        type="file"
                        name="file"
                        id="file-input"
                        hidden
                      /> */}
                      <Button variant="contained" size="large" type="submit">
                        Send
                      </Button>
                    </form>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AddUsers;
