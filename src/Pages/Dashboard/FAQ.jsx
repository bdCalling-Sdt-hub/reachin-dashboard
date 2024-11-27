import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { GoQuestion } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import FaqModal from '../../components/ui/FAQ/FaqModal';
import Title from '../../components/common/Title';
import { useDeleteFaqMutation, useGetFaqQuery } from '../../redux/apiSlices/faqSlice';
import { Pagination } from 'antd';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';


const FAQ = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [page, setPage] = useState(1);
  const {data: faqs, refetch} = useGetFaqQuery(page);
  const [deleteFaq] = useDeleteFaqMutation();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2375D0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteFaq(id).unwrap().then((response) => {
            console.log(response)
            if (response.success === true) {
              refetch();
              toast.success(response.message);
            }
          })
        } catch (error) {
          toast.error(error.data.message)
        }
      }
    });
  }


  return (
    <div className="">
      <div className=" mb-4 flex justify-between items-center w-full">
      <Title className=''>Frequently Asked Questions</Title>
        <button
          type='button'
          onClick={() => setOpenAddModel(true)}
          className="flex items-center gap-1 px-4 py-2 text-white bg-[#2375D0] rounded hover:bg-[#006d80] transition-colors"
        >
          <FaPlus />
          Add FAQ
        </button>
      </div>

      <div className="rounded-md">

        {faqs?.faqs?.map((item, index) => (

          <div key={index} className="flex justify-between items-start gap-4 p-3 rounded-lg bg-white mb-3">
            <GoQuestion color="#2375D0" size={25} className="mt-3" />
            <div className="flex-1">
              <p className="text-base font-medium rounded-xl py-2 flex items-center gap-8">
                <span className="flex-1">{item?.question}</span>
              </p>
              <div className=" rounded-xl py-2">
                <p className="text-[#919191] leading-6">{item?.answer}</p>
              </div>
            </div>


            <div className="flex items-center gap-2 pt-2">
              <CiEdit
                onClick={() => {
                  setOpenAddModel(true);
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

      <div className='flex items-center justify-center mt-6'>
        <Pagination
          current={page}
          onChange={(e)=>{
            setPage(e)
          }}
          total={faqs?.meta?.total}
        />
      </div>

      <FaqModal
        setOpenAddModel={setOpenAddModel}
        openAddModel={openAddModel}
        modalData={modalData}
        setModalData={setModalData}
        refetch={refetch}

      />
    </div>
  );
};

export default FAQ;
