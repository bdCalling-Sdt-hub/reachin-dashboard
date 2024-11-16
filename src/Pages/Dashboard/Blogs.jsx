import { Table } from 'antd';
import React, {  useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6'; 
import DetailsBlog from '../../components/ui/Blogs/DetailsBlog';
import CreateBlog from '../../components/ui/Blogs/CreateBlog';
import Title from '../../components/common/Title';
import { GoQuestion } from 'react-icons/go';
import { RxCross2 } from 'react-icons/rx';

const blogsContent = [
  {
    _id: "1",
    question: "What is your return policy?",
    answer: "Our return policy allows returns within 30 days of purchase with a valid receipt. Items must be in their original condition.",
  },
  {
    _id: "2",
    question: "How can I track my order?",
    answer: "You can track your order by using the tracking link sent to your email upon shipment. Alternatively, log in to your account to view the order status.",
  },
  {
    _id: "3",
    question: "Do you offer international shipping?",
    answer: "Yes, we offer international shipping to selected countries. Please check our shipping information page for more details.",
  },
  {
    _id: "4",
    question: "How do I reset my password?",
    answer: "To reset your password, click on 'Forgot Password' on the login page. A password reset link will be sent to your registered email address.",
  },
  {
    _id: "5",
    question: "How do I reset my password?",
    answer: "To reset your password, click on 'Forgot Password' on the login page. A password reset link will be sent to your registered email address.",
  },

];

   

const Blogs = () => { 
    const [openAddModel, setOpenAddModel] = useState(false);
    const [itemForEdit, setItemForEdit] = useState(null);  
    const [activeButton, setActiveButton] = useState(null);

    const buttons = ["All", "Privacy / Data", "Marketing Operation", "Sales Operation", "HR"]; 
 
    return (
        <div>
            
            {/* header */}
            <div className='flex items-center justify-between mb-3'>
                <Title className=''>Manage Blogs</Title>
                <button onClick={()=> setOpenAddModel(true)} className='bg-primary text-white h-10 px-4 rounded-md'>+ Add Blog</button>
            </div> 

            <div className='  flex items-center justify-center mb-3'> 
              <div className=' flex gap-5'>
            {buttons.map((button, index) => (
        <button
          key={index}
          className={`px-6 py-2 border rounded-full ${
            activeButton === button
              ? "bg-primary text-white"
              : "bg-white text-gray-800"
          }  transition`}
          onClick={() => setActiveButton(button)}
        >
          {button}
        </button>
      ))}
              </div>
            </div>

            <div className="  px-4 rounded-md">
        {blogsContent?.map((item, index) => (
          <div key={index} className="flex justify-between items-start gap-4 py-4 px-4 rounded-lg bg-white mb-3">
            <GoQuestion color="#2375D0" size={25} className="mt-3" />
            <div className="flex-1">
              <p className="text-base font-medium rounded-xl py-2 px-4 flex items-center gap-8">
                <span className="flex-1">{item?.question}</span>
              </p>
              <div className=" rounded-xl py-2 px-4 mt-4">
                <p className="text-[#919191] leading-6">{item?.answer}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <CiEdit
                onClick={() => {
                setOpenAddModel(true)
                  setModalData(item);
                }}
                className="text-2xl cursor-pointer text-[#2375D0]"
              />
              <RxCross2
                onClick={() => handleDelete(item?._id)}
                className="text-2xl cursor-pointer text-red-600"
              />
            </div>
          </div>
        ))}
      </div>
          
      <CreateBlog itemForEdit={itemForEdit} setItemForEdit={setItemForEdit} setOpenAddModel={setOpenAddModel} openAddModel={openAddModel} />

        </div>
    )
}

export default Blogs