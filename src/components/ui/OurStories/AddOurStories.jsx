import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import FormItem from "../../common/FormItem";
import { Year } from '../../common/FilterOptions';
import Spinner from '../../common/Spinner';
import { useCreateStoryMutation, useUpdateStoryMutation } from '../../../redux/apiSlices/storySlice';
import toast from 'react-hot-toast';
import { GrClose } from 'react-icons/gr';
import { FaRegImage } from 'react-icons/fa';
import { imageUrl } from '../../../redux/api/baseApi';

const AddOurStories = ({ value, setValue, setOpen, open, refetch }) => {
  const [form] = Form.useForm();
  const [imgUrl, setImgUrl] = useState(null);
  const [createStory, { isLoading }] = useCreateStoryMutation();
  const [updateStory, { isLoading: updateLoading }] = useUpdateStoryMutation();

  console.log(imgUrl)

  useEffect(() => {
    if (value) {
      form.setFieldsValue(value)
      setImgUrl(`${imageUrl}${value?.image}`)
    }
  }, [value]);

  const handleCancel = () => {
    setValue(null)
    setOpen(false);
    form.resetFields();
    setImgUrl(null)
  };


  const onFinish = async (values) => {

    const formData = new FormData();
    Object.keys(values).forEach(key => {
      formData.append(key, values[key])
    })


    if (value) {
      try {
        await updateStory({ id: value._id, payloadData: formData }).unwrap().then((res) => {
          if (res.success === true) {
            refetch();
            handleCancel();
            toast.success(res.message);
            form.resetFields();
          }
        })
      } catch (error) {
        toast.error(error.data?.message || "An error occurred");
      }
    } else {
      try {
        await createStory(formData).unwrap().then((res) => {
          if (res.success == true) {
            refetch();
            handleCancel();
            toast.success(res.message);
            form.resetFields();
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
      closeIcon={false}
      footer={null}
      title={<div className="flex items-center justify-between">
        <h1 className=" text-[20px] font-medium">
          {value ? "Update Story" : "Add Story"}
        </h1>
        <GrClose size={18} className="cursor-pointer" onClick={handleCancel} />
      </div>}
    >
      <div className="pt-4">
        <Form onFinish={onFinish} layout="vertical" form={form}>

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



          <FormItem name="subject" label="Subject" />


          <Form.Item
            name="year"
            label="Year"
            rules={[
              {
                required: true,
                message: "Please Pick A Year"
              }
            ]}
          >
            <Select placeholder="Select Year" className=" rounded  h-[45px]" >
              {Year.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>


          <Form.Item
            name="answer"
            label={<p className="text-[#6D6D6D]">Description</p>}
            rules={[
              {
                required: true,
                message: "Please Enter the Description"
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

          <Form.Item className="text-center mt-4">
            <button type="submit" className="bg-primary text-white w-[120px] h-[42px] rounded-lg">
              {isLoading || updateLoading ? <Spinner /> : value ? "Update Blog" : "Create Blog"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddOurStories;