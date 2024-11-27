import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { GrClose } from "react-icons/gr";
import toast from "react-hot-toast";
import Spinner from "../../common/Spinner";
import { useCreateFaqMutation, useUpdateFaqMutation } from "../../../redux/apiSlices/faqSlice";


const FaqModal = ({ setModalData, modalData, refetch, openAddModel, setOpenAddModel }) => {
  const [form] = Form.useForm();
  const [createFaq, { isLoading }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: updateLoading }] = useUpdateFaqMutation();

  useEffect(() => {
    if (modalData) {
      form.setFieldsValue({ question: modalData?.question, answer: modalData?.answer })
    }
  }, [modalData])

  const onFinish = async (values) => {

    if (modalData?._id) {
      try {
        await updateFaq({ id: modalData._id, payloadData: values }).unwrap().then((res) => {
          if (res.success == true) {
            refetch();
            setOpenAddModel(false)
            setModalData(null)
            toast.success(res.message);
          }
        })
      } catch (error) {
        toast.error(error.data?.message || "An error occurred");
      }
    } else {
      try {
        await createFaq(values).unwrap().then((res) => {
          if (res.success == true) {
            refetch();
            setOpenAddModel(false)
            setModalData(null)
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
      title={<div className="flex items-center justify-between">
        <h1 className=" text-[20px] font-medium">
          {modalData ? "Update FAQ" : "Add FAQ"}
        </h1>
        <GrClose size={18} className="cursor-pointer" onClick={() => {
          setOpenAddModel(false)
          setModalData(null)
          form.resetFields()
        }} />
      </div>}
      open={openAddModel}
      closeIcon={false}
      onCancel={() => {
        setOpenAddModel(false)
        setModalData(null)
        form.resetFields()
      }}
      width={500}
      footer={false}
    >
      <div className=" pt-2">

        <Form onFinish={onFinish} form={form} layout="vertical">

          <Form.Item
            name="question"
            label="Question"
            rules={[
              {
                required: true,
                message: "Please Enter the Question"
              }
            ]}
          >
            <Input
              placeholder="Enter Question"
              style={{
                border: "1px solid #E0E4EC",
                padding: "10px",
                height: "42px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
              }}

            />
          </Form.Item>
          <Form.Item
            name="answer"
            label="Answer"
            rules={[
              {
                required: true,
                message: "Please Enter the Answer"
              }
            ]}
          >


            <Input.TextArea
              placeholder="Enter answer"
              style={{
                border: "1px solid #E0E4EC",
                padding: "10px",
                height: "152px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
                resize: "none",
              }}
            />
          </Form.Item>
          <Form.Item className=" text-end">
            <button type="submit" className="bg-primary text-white w-[120px] h-[42px] rounded-lg">
              {isLoading || updateLoading ? <Spinner /> : "Submit"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default FaqModal;