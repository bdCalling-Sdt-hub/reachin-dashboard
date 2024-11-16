import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

  const email = new URLSearchParams(location.search).get("email")
  const navigate = useNavigate();

  const onFinish = async(values) => {
        navigate(`/auth/login`);
  };

  return ( 
    <div className=" flex gap-2 justify-center items-center w-full ">

    <div className="w-1/2"> 
<img src="/login.svg" alt="" className="w-full h-[calc(100vh-80px)] object-fill" />
    </div> 

    <div className=" w-1/2 flex items-center justify-center "> 
    <div className="w-2/4  rounded-lg shadow-lg px-[40px] py-[60px]">
    <div className="text-center mb-8">
          <h1 className="text-[25px] font-semibold mb-6">Reset Password</h1>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
        >

            <Form.Item
              name="newPassword" 
              label={ <p
                style={{
                  display: "block",
                  color: "#5C5C5C",
                }}
                htmlFor="email"
                className="font-semibold "
              >
                New Password
              </p>}
              rules={[
                {
                  required: true,
                  message: "Please input your new Password!",
                },
              ]}
              style={{ marginBottom: 0 }}
            >
              <Input.Password
                type="password"
                placeholder="Enter New password"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }} 
                className="mb-6"
              />
            </Form.Item>       
           
            <Form.Item
              style={{ marginBottom: 0 }} 
              label={ <p
                style={{
                  display: "block",
                  color: "#5C5C5C",
                }}
                htmlFor="email"
                className="font-semibold"
              >
                Confirm Password
              </p>}
              name="confirmPassword"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The new password that you entered do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter Confirm password"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }} 
                className="mb-6"
              />
            </Form.Item>
      

            <Form.Item style={{marginBottom: 0}}>
            <Button
              htmlType="submit"
              style={{
                width: '100%',
                height: 45,
                color: "white",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#2375D0",
                marginTop: 20
              }}
            >
             Update
            </Button>
          </Form.Item>


         
        </Form>
    </div>
    </div> 

  </div>

   
  );
};

export default ResetPassword;
