
import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import Title from '../../components/common/Title';
import { GoQuestion } from 'react-icons/go';
import { RxCross2 } from 'react-icons/rx';
import AddOurStories from '../../components/ui/OurStories/AddOurStories';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useDeleteStoryMutation, useGetStoryQuery } from '../../redux/apiSlices/storySlice';
import { Pagination } from 'antd';

const OurStories = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [page, setPage] = useState(1)
  const {data: story, refetch} = useGetStoryQuery(page);
  const [deleteStory] = useDeleteStoryMutation();

  const handleDeleteAdmin = (id) => {
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
          await deleteStory(id).unwrap().then((response) => {
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
    <div>

      {/* header */}
      <div className='flex items-center justify-between mb-3'>
        <Title className=''>Our Stories</Title>
        <button type='button' onClick={() => setOpen(true)} className='bg-primary text-white h-10 px-4 rounded-md'>+ Add Story</button>
      </div>



      <div className="">
        {story?.story?.map((item, index) => (
          <div key={index} className="flex item justify-between items-start gap-4 py-4">
            <GoQuestion color="#2375D0" size={25} className="mt-3" />
            <div className="flex-1">
              <p className="text-base font-medium rounded-[6px] p-2 flex items-center gap-8 bg-white">
                <span className="flex-1">{item?.subject}</span>
              </p>
              <div className=" rounded-[6px] p-2 mt-4 bg-white">
                <p className="text-[#919191] leading-6">{item?.answer}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CiEdit
                onClick={() => setValue(item)}
                className="text-2xl cursor-pointer text-[#2375D0]"
              />
              <RxCross2
                onClick={() => handleDeleteAdmin(item?._id)}
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
          total={story?.meta?.total}
        />
      </div>

      <AddOurStories value={value} setValue={setValue} setOpen={setOpen} open={open} refetch={refetch} />

    </div>
  );
};

export default OurStories;
