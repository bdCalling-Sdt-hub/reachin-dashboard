import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import FormItem from "../../components/common/FormItem";
// import Cookies from "js-cookie"; 


const Login = () => {
  const navigate = useNavigate()


  const onFinish = async(values) => {

          navigate("/")
          // Cookies.set('token', token, { expires: 7 }) 
   
  };

  return (
  
    <div className=" flex gap-2 justify-center items-center w-full ">

      <div className="w-1/2"> 
<img src="/login.svg" alt="" className="w-full h-[calc(100vh-80px)] object-fill" />
      </div> 

      <div className=" w-1/2 flex items-center justify-center "> 
      <div className="w-2/4  rounded-lg shadow-lg px-[40px] py-[60px]">
      <div className="text-start mb-8">
          <h1 className="text-[25px] font-semibold ">Sign In</h1>
        </div>
        <Form
          onFinish={onFinish}
          layout="vertical"
        >

          <FormItem name={"email"} label={"Email"} />

            <Form.Item
              name="password"
              label={<p>Password</p>}
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter your password"
                style={{
                  height: 40,
                  border: "1px solid #d9d9d9",
                  outline: "none",
                  boxShadow: "none"
                }}
              />
            </Form.Item>

            <div className="flex items-center justify-between">
              <Form.Item style={{marginBottom: 0}} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a
                className="login-form-forgot text-primary font-semibold"
                href="/auth/forgot-password"
              >
                Forgot password
              </a>
          </div>

          <Form.Item style={{marginBottom: 0}}>
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
              {/* {isLoading? < Spinner/> : "Sign in"} */} Sign in
            </button>
          </Form.Item>

          
        </Form>
      </div>
      </div> 

    </div>
      
    
  );
};

export default Login;
