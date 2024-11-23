import { Form, Input, Modal } from 'antd';
import React from 'react';
import { useCreateAdminMutation, useGetAdminQuery } from '../../../redux/apiSlices/adminSlice';
import Spinner from '../../common/Spinner';
import toast from 'react-hot-toast';

const CreateAdmin = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const { refetch } = useGetAdminQuery();

  const handleClose = async (values) => {
    values.role = "ADMIN"

    try {
      await createAdmin(values).unwrap()
        .then(result => {
          if (result.success === true) {
            toast.success(result.message);
            refetch();
            setOpen(false);
            form.resetFields();
          }
        });
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Modal
      centered
      title={<p className='text-xl'>Add Admin</p>}
      open={open}
      onCancel={() => setOpen(false)}
      width={500}
      footer={null}
    >
      <div className="mt-8">

        <Form form={form} onFinish={handleClose} layout='vertical'>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the admin's name" }]}
            className="text-[#6D6D6D] py-1"
          >
            <Input className="w-full border outline-none px-3 py-[10px]" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the admin's email" }]}
            className="text-[#6D6D6D] py-1"
          >
            <Input className="w-full border outline-none px-3 py-[10px]" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
            className="text-[#6D6D6D] py-1"
          >
            <Input.Password className="w-full border outline-none px-3 py-[10px]" />
          </Form.Item>

          <Form.Item className="text-center mt-6 w-full flex items-center justify-center">
            <button
              type="submit"
              className="bg-primary flex items-center justify-center text-white w-40 h-11 rounded-lg"
            >
              {isLoading ? <Spinner /> : "Create"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateAdmin;
