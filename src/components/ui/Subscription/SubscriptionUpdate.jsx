import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { CiCircleMinus } from 'react-icons/ci';
import { FaCircleCheck } from 'react-icons/fa6';
import { GoPlusCircle } from 'react-icons/go';
import FormItem from '../../common/FormItem';

const SubscriptionUpdate = ({open ,setOpen ,items}) => {  
    const [form] = Form.useForm()     

    useEffect(()=>{
 if(items){
 form.setFieldsValue({title:items?.packageName , price:items?.price , features:items?.description })
 }},[items , form])

    return (
        <div>
            <Modal
                centered
                open={open}
                onCancel={() => {
                    // null;
                    form.resetFields()
                    setOpen(false);
                }}
                width={500}
                footer={false}
            >
                <div className="">
                    <h1
                        className="font-semibold text-[#555555] text-xl"
                        style={{ marginBottom: "10px", marginTop: "8px" }}
                    >
                     {items ? "Add Package" : "Edit Package"}  
                    </h1>
                    <Form  layout="vertical" form={form} className='p-3 '>
                        <div>
                        <FormItem name="subject" label="Subject" />
    <FormItem name="price" label="Price" />
    <FormItem name="credit" label="Credit" /> 
    {/* //calender hobe  */}
    <FormItem name="time" label="Set Time" /> 


                            <p className="text-[#6D6D6D]"> Descriptions</p>
                            <Form.Item
                                style={{ border: "1px solid #E7EBED", borderRadius: 8 }}
                                className='p-2'
                            >
                                <Form.List name={"features"}  >
                                    {
                                        (fields, { add, remove }) => (
                                            <>
                                                {
                                                    fields.map((field, index) => {
                                                        return (
                                                            <Form.Item
                                                                required={false}
                                                                key={index}
                                                                className="w-full"
                                                                style={{ marginBottom: 0 }}
                                                            >
                                                                <div className='flex items-center mb-2 gap-[30px] w-full'>
                                                                    <Form.Item
                                                                        name={field.name}
                                                                        fieldKey={field.fieldKey}
                                                                        validateTrigger={['onChange', 'onBlur']}
                                                                        style={{ marginBottom: 0 }}
                                                                        className='w-full'
                                                                    >
                                                                        <Input
                                                                            style={{
                                                                                width: "100%",
                                                                                height: 40,
                                                                                border: "1px solid #E7EBED",
                                                                                background: "transparent",
                                                                                borderRadius: "none",
                                                                                outline: "none",
                                                                                color: "#415D71",
                                                                            }}
                                                                            placeholder='Enter Package Services'
                                                                            className='roboto-regular text-sm leading-5'
                                                                            prefix={<FaCircleCheck size={20} style={{ marginRight: 5 }} color='#12354E' />}
                                                                        />
                                                                    </Form.Item>
                                                                    <div>
                                                                        {
                                                                            fields.length > 0 ? (
                                                                                <CiCircleMinus
                                                                                    size={30}
                                                                                    className="dynamic lete-button cursor-pointer text-[#D7263D]"
                                                                                    onClick={() => remove(field.name)}
                                                                                />
                                                                            )
                                                                                :
                                                                                null
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Form.Item>
                                                        )
                                                    })
                                                }

                                                <Form.Item
                                                    style={{ width: "100%", margin: 0, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}
                                                >
                                                    <GoPlusCircle
                                                        size={30}
                                                        color='#12354E'
                                                        onClick={() => add()}
                                                    />
                                                </Form.Item>
                                            </>
                                        )
                                    }
                                </Form.List>
                            </Form.Item>

                        </div>


                        <Form.Item className="text-center mt-8">
                            <button type="primary" htmlType="submit" className=' bg-primary text-white w-[120px] h-[42px] rounded-lg'> 
                                Submit
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default SubscriptionUpdate;