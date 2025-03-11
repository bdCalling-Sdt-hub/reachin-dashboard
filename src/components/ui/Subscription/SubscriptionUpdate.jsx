import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react';
import FormItem from '../../common/FormItem';
import { CgClose } from 'react-icons/cg';
import toast from 'react-hot-toast';
import { useCreatePackageMutation, useUpdatePackageMutation } from '../../../redux/apiSlices/packageSlice';
import Spinner from '../../common/Spinner';

const SubscriptionUpdate = ({ open, setOpen, setValue, value, refetch }) => {
    const [form] = Form.useForm();
    const [ createPackage, { isLoading } ] = useCreatePackageMutation();
    const [ updatePackage, { isLoading: updateLoading } ] = useUpdatePackageMutation();

    useEffect(() => {
        if (value) {
            form.setFieldsValue(value)
        }
    }, [value, form]);


    const handleSubmit = async (values)=>{

        if(value?._id && value?.price){
            try {
                await updatePackage({id: value?._id,  payloadData: values}).unwrap().then((res)=>{
                    if(res.success){
                        toast.success(res.message)
                        refetch();
                        setValue(false)
                    }
                })
            } catch (error) {
                toast.error(error?.data?.message)
            }
        }else{
            try {
                await createPackage(values).unwrap().then((res)=>{
                    if(res.success){
                        toast.success(res.message)
                        refetch();
                        setOpen(false)
                    }
                })
            } catch (error) {
                toast.error(error?.data?.message)
            }
        }

        

    }

    return (
        <div>
            <Modal
                centered
                title={
                    <div className='flex items-center justify-between'>
                        <p className='text-xl'>{value ? "Edit Package" : "Add Package"} </p>
                        <CgClose
                            className='cursor-pointer'
                            onClick={() => {
                                form.resetFields();
                                setOpen(false);
                                setValue(null)
                            }}
                            size={20}
                        />
                    </div>
                }
                open={open || value}
                onCancel={() => {
                    form.resetFields();
                    setOpen(false);
                    setValue(null);
                }}
                closeIcon={false}
                width={500}
                footer={false}
            >
                <Form onFinish={handleSubmit} layout="vertical" form={form} className='mt-6'>
                    <FormItem name="title" label="Title" />
                    <Form.Item
                        name="price"
                        label={<p className='text-[15px] text-[#636363]'>Price</p>}
                        rules={[
                            {
                                required: true,
                                message: `Please Enter Package Price`,
                            }
                        ]}
                        getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            const isNumber = /^\d+$/.test(inputValue);
                            return isNumber ? parseInt(inputValue) : 0;
                        }}
                    >
                        <Input
                            placeholder={`Write Package Price`}
                            style={{
                                height: 45,
                                border: "1px solid #d9d9d9",
                                outline: "none",
                                boxShadow: "none"
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="credit"
                        label={<p className='text-[15px] text-[#636363]'>Credit</p>}
                        rules={[
                            {
                                required: true,
                                message: `Please Enter Package Credit`,
                            }
                        ]}
                        getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            const isNumber = /^\d+$/.test(inputValue);
                            return isNumber ? parseInt(inputValue) : 0;
                        }}
                    >
                        <Input
                            placeholder={`Write Package Credit`}
                            style={{
                                height: 45,
                                border: "1px solid #d9d9d9",
                                outline: "none",
                                boxShadow: "none"
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="duration"
                        label={<p className='text-[15px] text-[#636363]'>Duration</p>}
                        rules={[
                            {
                                required: true,
                                message: `Please Select Package Duration`,
                            }
                        ]}
                    >
                        <Select
                            style={{
                                height: 45,
                                outline: "none",
                                boxShadow: "none"
                            }}
                            placeholder="Select Package Duration"
                        >
                            <Select.Option value="1 month">1 Month</Select.Option>
                            <Select.Option value="3 months">3 Months</Select.Option>
                            <Select.Option value="6 months">6 Months</Select.Option>
                            <Select.Option value="1 year">1 Year</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="paymentType"
                        label={<p className='text-[15px] text-[#636363]'>Payment Type</p>}
                        rules={[
                            {
                                required: true,
                                message: `Please Select Package Payment Type`,
                            }
                        ]}
                    >
                        <Select
                            style={{
                                height: 45,
                                outline: "none",
                                boxShadow: "none"
                            }}
                            placeholder="Select Package Payment Type"
                        >
                            <Select.Option value="Monthly">Monthly</Select.Option>
                            <Select.Option value="Yearly">Yearly</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label={<p className='text-[15px] text-[#636363]'>Description</p>}
                        rules={[
                            {
                                required: true,
                                message: `Please Enter Description`,
                            }
                        ]}
                    >
                        <Input.TextArea
                            placeholder={`Write Package Description`}
                            style={{
                                height: 120,
                                border: "1px solid #d9d9d9",
                                outline: "none",
                                boxShadow: "none"
                            }}
                        />
                    </Form.Item>

                    <Form.Item className="flex items-center justify-center mt-8">
                        <button type="submit" className='flex items-center justify-center bg-primary text-white w-[120px] h-[42px] rounded-lg'>
                            { isLoading  || updateLoading ? <Spinner/> : "Submit" }
                        </button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SubscriptionUpdate;