import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaRegImage } from 'react-icons/fa';
import FormItem from "../../common/FormItem";
import { blogCategory } from '../../common/FilterOptions';
import Spinner from '../../common/Spinner';
import { imageUrl } from '../../../redux/api/baseApi';
import { useCreateBlogMutation, useUpdateBlogMutation } from '../../../redux/apiSlices/blogSlice';
import toast from 'react-hot-toast';


const CreateBlog = ({ value, refetch, setValue, setOpen, open }) => {
  const [form] = Form.useForm();
  const [imgUrl, setImgUrl] = useState(null);
  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: updateLoading }] = useUpdateBlogMutation();


  useEffect(() => {
    if (value) {
      form.setFieldsValue(value)
      setImgUrl(`${imageUrl}${value?.image}`)
    }
  }, [value])


  const handleCancel = () => {
    setImgUrl(null);
    setValue(null)
    form.resetFields();
    setOpen(false);
  };

  const onFinish = async (values) => {

    const formData = new FormData();

    Object.keys(values).forEach(key => {
      formData.append(key, values[key])
    })

    if (value) {
      try {
        await updateBlog({ id: value._id, payloadData: formData}).unwrap().then((res) => {
          console.log(res)
          if (res.success == true) {
            refetch();
            handleCancel();
            toast.success(res.message);
          }
        })
      } catch (error) {
        toast.error(error.data?.message || "An error occurred");
      }
    } else {
      try {
        await createBlog(formData).unwrap().then((res) => {
          if (res.success == true) {
            refetch();
            toast.success(res.message);
            setOpen(false)
          }
        })
      } catch (error) {
        if (error.data?.errorMessages && Array.isArray(error.data.errorMessages)) {
          error.data.errorMessages.forEach((err) => {
            toast.error(err.message);
          });
        } else {
          toast.error(error.data?.message || "An error occurred");
        }
      }
    }
  };


  return (
    <Modal
      centered
      open={open || value}
      onCancel={handleCancel}
      width={500}
      footer={null}
    >
      <div className="">
        <h1 className="font-semibold text-[#555555] text-xl mb-2 mt-2">
          {value ? "Update Blog" : "Add Blog"}
        </h1>

        <Form onFinish={onFinish} layout="vertical" form={form}>

          <FormItem name="subject" label="Subject" />

          <Form.Item
            name="image"
            label={<p className="text-[#6D6D6D]">Image</p>}
            rules={[
              {
                required: true,
                validator: () => {
                  if (!imgUrl) {
                    return Promise.reject("Please Upload Image")
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <input
              id="image"
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                form.setFieldsValue({ image: file });
                const imgUrl = URL.createObjectURL(file);
                setImgUrl(imgUrl);
              }}
              style={{ display: "none" }}
            />
            <label htmlFor="image" className="p-3 border block  mb-2 rounded-lg">
              <div className="flex justify-center items-center w-full h-[80px] ">
                {imgUrl ? (
                  <img src={imgUrl} alt="Selected" className="h-[80px] w-full object-contain p-2" />
                ) : (
                  <FaRegImage className="text-5xl" />
                )}
              </div>
            </label>
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
                message: `Please Pick Category`,
              }
            ]}
          >
            <Select className=" rounded  h-[45px]" placeholder="Select Category">
              {blogCategory?.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <FormItem name="url" label="Upload Link" />

          <Form.Item
            name="details"
            label={<p className="text-[#6D6D6D]">Description</p>}
            rules={[
              {
                required: true,
                message: `Please Write Description`,
              }
            ]}
          >
            <Input.TextArea
              placeholder='Write description'
              style={{
                height: 180
              }}
            />
          </Form.Item>

          <Form.Item className="text-center flex items-center justify-center mt-4">
            <button type="submit" className="bg-primary flex items-center justify-center text-white w-[120px] h-[42px] rounded-lg">
              {isLoading || updateLoading ? <Spinner /> : value ? "Update Blog" : "Create Blog"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateBlog;
