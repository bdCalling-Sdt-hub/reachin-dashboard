import { Button, Form, Typography } from "antd";
import React, { useState } from "react"
import OTPInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";
import { useForgotPasswordMutation, useOtpVerifyMutation } from "../../redux/apiSlices/authSlice";
import Spinner from "../../components/common/Spinner";
import toast from "react-hot-toast";
const { Text } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const email = new URLSearchParams(location.search).get("email");
  const [otpVerify, {isLoading}] = useOtpVerifyMutation();
  const [forgotPassword] = useForgotPasswordMutation();

  const onFinish = async (values) => {
    // navigate(`/auth/reset-password?email=${email}`);
  };

  const handleVerify = async () => {
    try {
      await otpVerify({email: email, oneTimeCode: Number(otp)}).unwrap().then((res)=>{
        if(res.success === true){
          toast.success(res.message);
        }
      })
    } catch (error) {
      toast.error(error.data.message)
    }
  };
  
  const handleResendEmail = async () => {
    try {
      await forgotPassword({email: email}).unwrap().then((res)=>{
        if(res.success === true){
          toast.success(res.message);
        }
      })
    } catch (error) {
      toast.error(error.data.message)
    }
  };


  return (

    <div className=" flex gap-2 justify-center items-center w-full ">

      <div className="w-1/2">
        <img src="/otp.svg" alt="" className="w-full h-[calc(100vh-80px)] object-fill" />
      </div>

      <div className=" w-1/2 flex items-center justify-center ">
        <div className="w-[60%] shadow-md rounded-md p-6">
          <h1 className="text-[25px] text-center font-semibold mb-4">Verify Your OTP</h1>
          <p className="text-center w-[80%] mx-auto">We sent a reset link to <span className="font-semibold">{email} </span>
            enter 6 digit code that mentioned in the email</p>

          <Form className="mt-4" layout="vertical" onFinish={handleVerify}>

            <div className="flex items-center justify-center mb-6">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
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

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                htmlType="submit"
                style={{
                  width: "100%",
                  height: 48,
                  border: "1px solid #d9d9d9",
                  outline: "none",
                  boxShadow: "none",
                  background: "#2375D0",
                  color: "white"
                }}

                className="flex items-center justify-center"
              >
                {isLoading? <Spinner/> : "Verify"}
              </Button>
            </Form.Item>
          </Form>


        </div>
      </div>

    </div>




  );
};

export default VerifyOtp;
