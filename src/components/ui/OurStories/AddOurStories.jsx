import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react';
import FormItem from "../../common/FormItem";
import { Year } from '../../common/FilterOptions';
import Spinner from '../../common/Spinner';
import { useCreateStoryMutation, useUpdateStoryMutation } from '../../../redux/apiSlices/storySlice';
import toast from 'react-hot-toast';
import { GrClose } from 'react-icons/gr';

const AddOurStories = ({ value, setValue, setOpen, open, refetch }) => {
  const [form] = Form.useForm();
  const [createStory, { isLoading }] = useCreateStoryMutation();
  const [updateStory, { isLoading: updateLoading }] = useUpdateStoryMutation();

  useEffect(() => {
    if (value) {
      form.setFieldsValue(value)
    }
  }, [value])


  const handleCancel = () => {
    setValue(null)
    setOpen(false);
  };


  const onFinish = async (values) => {

    if (value) {
      try {
        await updateStory({ id: value._id, payloadData: values }).unwrap().then((res) => {
          if (res.success === true) {
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
        await createStory(values).unwrap().then((res) => {
          if (res.success == true) {
            refetch();
            handleCancel();
            toast.success(res.message);
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