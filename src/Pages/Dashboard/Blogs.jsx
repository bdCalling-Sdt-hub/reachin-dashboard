import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import CreateBlog from '../../components/ui/Blogs/CreateBlog';
import Title from '../../components/common/Title';
import { RxCross2 } from 'react-icons/rx';
import { blogCategory } from '../../components/common/FilterOptions';
import { useDeleteBlogMutation, useGetBlogQuery } from '../../redux/apiSlices/blogSlice';
import { Table } from 'antd';
import { imageUrl } from '../../redux/api/baseApi';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';



const Blogs = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const { data: blogs, refetch } = useGetBlogQuery({ category: activeButton, page });
  const [deleteBlog] = useDeleteBlogMutation();
  const [value, setValue] = useState(null);

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
          await deleteBlog(id).unwrap().then((response) => {
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


  const columns = [
    {
      title: "S. No.",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => <p>{index + 1}</p>
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img src={`${imageUrl}${record.image}`} style={{ width: 60, height: 40 }} alt="" />
      )
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Link",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Description",
      dataIndex: "details",
      key: "details",
      render: (_, record) => (
        <p>{record.details.slice(0, 15) + "..."}</p>
      )
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className='flex items-center gap-3'>
          <CiEdit
            onClick={() => {
              setValue(record);
            }}
            className="text-2xl cursor-pointer text-[#2375D0]"
          />
          <RxCross2
            onClick={() => handleDeleteAdmin(record?._id)}
            className="text-2xl cursor-pointer text-red-600"
          />
        </div>
      )
    },
  ]

  return (
    <div>

      {/* header */}
      <div className='flex items-center justify-between mb-3'>
        <Title className=''>Manage Blogs</Title>
        <button onClick={() => setOpen(true)} className='bg-primary text-white h-10 px-4 rounded-md'>+ Add Blog</button>
      </div>

      <div className='  flex items-center justify-center mb-3'>
        <div className=' flex gap-5'>
          <button
            className={`px-6 py-2 border rounded-full ${activeButton === ""
              ? "bg-primary text-white"
              : "bg-white text-gray-800"
              }  transition`}
            onClick={() => setActiveButton("")}
          >
            All
          </button>
          {blogCategory?.map((button, index) => (

            <button
              key={index}
              className={`px-6 py-2 border rounded-full ${activeButton === button
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

      <Table
        style={{ marginTop: 35 }}
        columns={columns}
        dataSource={blogs?.blogs?.map((data, index)=> {return {...data, key: index}})}

        pagination={{
          current: page,
          onChange: (e) => setPage(e),
          total: blogs?.meta?.meta
        }}
      />

      <CreateBlog value={value} refetch={refetch} setValue={setValue} setOpen={setOpen} open={open} />

    </div>
  )
}

export default Blogs