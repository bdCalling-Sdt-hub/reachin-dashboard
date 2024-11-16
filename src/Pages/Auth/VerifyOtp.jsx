import { Button, Form, Typography } from "antd";
import React, { useState } from "react"
import OTPInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";
const { Text } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const email = new URLSearchParams(location.search).get("email")



  const onFinish = async(values) => {
        navigate(`/auth/reset-password?email=${email}`);
  };


  const handleResendEmail = async() => {

  };



  return ( 
      
    <div className=" flex gap-2 justify-center items-center w-full ">

      <div className="w-1/2"> 
<img src="/otp.svg" alt="" className="w-full h-[calc(100vh-80px)] object-fill" />
      </div> 

      <div className=" w-1/2 flex items-center justify-center "> 
      <div className="w-2/4  rounded-lg shadow-lg px-[40px] py-[60px]">
      <div className="text-start mb-6">
          <h1 className="text-[25px] font-semibold mb-6">Verify OTP</h1>
        </div>


        <Form layout="vertical" onFinish={onFinish}>

          <div className="flex items-center justify-center mb-6">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputStyle={{
                height: 50,
                width: 50,
                borderRadius: "8px",
                margin: "16px",
                fontSize: "20px",
                border: "1px solid #2375D0",
                color: "#2B2A2A",
                outline: "none",
                marginBottom: 10
              }}
              renderInput={(props) => <input {...props} />}
            />

          </div>

          <div className="flex items-center justify-between mb-6">
            <Text>Don't received code?</Text>

            <p
              onClick={handleResendEmail}
              className="login-form-forgot"
              style={{ color: "#2375D0", cursor: "pointer" }}
            >
              Resend
            </p>
          </div>

          <Form.Item style={{marginBottom: 0}}>
            <Button
              htmlType="submit"
              style={{
                width: "100%",
                height: 40,
                border: "1px solid #d9d9d9",
                outline: "none",
                boxShadow: "none",
                background: "#2375D0",
                color: "white"
              }}
            >
            Verify
            </Button>
          </Form.Item>
        </Form>
      </div>
      </div> 

    </div>




  );
};

export default VerifyOtp;
