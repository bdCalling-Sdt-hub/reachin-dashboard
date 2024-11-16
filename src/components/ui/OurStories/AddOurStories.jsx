import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { FaRegImage } from 'react-icons/fa';
import FormItem from "../../common/FormItem";
import { titleOptions, Year } from '../../common/FilterOptions';
import JoditEditor from 'jodit-react';

const AddOurStories = ({ itemForEdit, setItemForEdit, openAddModel, setOpenAddModel }) => { 
    const [form] = Form.useForm();
    const [imgFile, setImgFile] = useState(null);
    const [imgUrl, setImgUrl] = useState(null); 
    const editor = useRef(null)
    const [content, setContent] = useState('');
  
    useEffect(() => {
      if (itemForEdit) {
        form.setFieldsValue({ title: itemForEdit?.name, description: itemForEdit?.description })
        setImgUrl(itemForEdit?.image)
      }
    }, [itemForEdit])
  
  
    const handleCancel = () => {
      setImgFile(null);
      setImgUrl(null);
      setItemForEdit(null)
      form.resetFields();
      setOpenAddModel(false);
    };
  
    const handleChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImgFile(file);
        setImgUrl(URL.createObjectURL(file));
      }
    };
  
    const onFinish = (values) => {
      console.log(values);
      // Handle form submission logic here
    }; 
  
    return (
        <Modal
        centered
        open={openAddModel}
        onCancel={handleCancel}
        width={500}
        footer={null}
      >
        <div className="">
          <h1 className="font-semibold text-[#555555] text-xl mb-2 mt-2">
            {itemForEdit ? "Update Story" : "Add Story"}
          </h1>
          <Form onFinish={onFinish} layout="vertical" form={form}>
            <FormItem name="Subject" label="subject" />

  
            <Form.Item name="Year" label="Year"  >
              <Select className=" rounded  h-[45px]" defaultValue="2024">
                {Year.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>  
  
  
            <Form.Item name="description" label={<p className="text-[#6D6D6D]">Description</p>}>
            <JoditEditor
          ref={editor}
          value={content} 
          config={{
            height: 280, 
          }}
            onChange={newContent => { setContent(newContent) }}
        /> 
            </Form.Item>
  
            <Form.Item className="text-center mt-4">
              <button type="primary" htmlType="submit" className="bg-primary text-white w-[120px] h-[42px] rounded-lg">
                Submit
              </button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
};

export default AddOurStories;