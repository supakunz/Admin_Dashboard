/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Fragment, useContext, useState } from "react";
import { TransitionChild, Dialog, DialogPanel } from "@headlessui/react";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Button from "@mui/material/Button";
import { getdata, update } from "@/functions/product";
import { ProductContext } from "@/providers/ProductProvider";
import Swal from "sweetalert2";

const EditProduct = ({ editToggle, setEditToggle, product_value }) => {
  const [data, setData] = useState({
    name: product_value.name,
    price: product_value.price,
    detail: product_value.detail,
  });
  const [image, setImage] = useState(false);
  const { setProductData } = useContext(ProductContext);

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
    const formWithImageData = new FormData();
    for (const key in data) {
      formWithImageData.append(key, data[key]);
    }
    // console.log(formWithImageData); //ไม่แสดงเพราะเป็นแบบ multipart/form-data
    //เพิ่มชื่อของไฟล์รูปเดิมส่งไปด้วย
    formWithImageData.append("fileold", product_value.file);
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //**Updata Product Data**
        update(product_value.id, formWithImageData)
          .then((res) => {
            Swal.fire("Saved!", "", "success");
            console.log(res.data.message);
          })
          .catch((err) => {
            Swal.fire("Error!", "", "error");
            console.log(err.response.data.message);
          })
          .finally(() => {
            getdata()
              .then((res) => {
                setProductData(res.data.response);
                setEditToggle(false);
              })
              .catch((err) => console.log(err));
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="relative z-10 focus:outline-none test">
      <Dialog open={editToggle} as="div" onClose={() => setEditToggle(false)}>
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
                      setEditToggle(false);
                    }}
                  >
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-2 w-[80%] mb-8 gap-2">
                  <div className="content-center">
                    <label htmlFor="file-input">
                      <Image
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : `/file/${product_value.file}`
                        }
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
                      <TextField
                        required
                        id="outlined-required"
                        name="name"
                        label="Name"
                        onChange={handleChange}
                        value={data.name}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        name="price"
                        label="Price"
                        onChange={handleChange}
                        value={data.price}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        name="detail"
                        label="Detail"
                        onChange={handleChange}
                        value={data.detail}
                      />
                      <input
                        onChange={handleChange}
                        className="box-border w-full h-[50px] rounded-[4px] pl-[15px] border-solid border-[1px] text-[14px] border-[#c3c3c3] text-[#7b7b7b]"
                        type="file"
                        name="file"
                        id="file-input"
                        hidden
                      />
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

export default EditProduct;