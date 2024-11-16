import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const navigate = useNavigate();


  const onFinish = async(values) => {

        navigate(`/auth/verify-otp?email=${values?.email}`);

  };



  return ( 
    <div className=" flex gap-2 justify-center items-center w-full ">

    <div className="w-1/2"> 
<img src="/login.svg" alt="" className="w-full h-[calc(100vh-80px)] object-fill" />
    </div> 

    <div className=" w-1/2 flex items-center justify-center "> 
    <div className="w-2/4  rounded-lg shadow-lg px-[40px] py-[60px]">
    <div className="">
          <h1 className="text-[25px] font-semibold mb-6">Forgot Password</h1>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          
            <Form.Item
              label={<p>Email</p>}
              name="email"
              id="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email address"
                style={{
                  height: 40,
                  border: "1px solid #d9d9d9",
                  outline: "none",
                  boxShadow: "none"
                }}
              />
            </Form.Item>

          <Form.Item>
            <button
              htmlType="submit" 
              type="submit"
              style={{
                width: '100%',
                height: 45,
                color: "white",
                fontWeight: "400px",
                fontSize: "18px",
           
                marginTop: 20
              }}
              className="flex items-center justify-center bg-primary rounded-lg"
            >
             Send OTP
            </button>
          </Form.Item>
        </Form>
    </div>
    </div> 

  </div>


      
   
  );
};

export default ForgotPassword;
