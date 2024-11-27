import { ConfigProvider, Input, Select, Table } from 'antd';
import React, { useState } from 'react';
import Title from "../../../components/common/Title";
import { departmentOptions, industryOptions, managementLevelOptions, titleOptions } from '../../../components/common/FilterOptions';
import { RiEditLine } from 'react-icons/ri';
import { MdOutlineDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDeleteBulkPeopleMutation, useDeletePeopleMutation, useGetPeopleQuery } from '../../../redux/apiSlices/peopleSlice';
import toast from 'react-hot-toast';
import { imageUrl } from '../../../redux/api/baseApi';

const PeoplesData = () => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
  const { data, refetch } = useGetPeopleQuery({ page, search });
  const [deletePeople] = useDeletePeopleMutation();
  const [deleteBulkPeople] = useDeleteBulkPeopleMutation();

  const handleDelete = async (id) => {
    try {
      await deletePeople(id).unwrap().then(({ success, message }) => {
        if (success === true) {
          toast.success(message);
          refetch()
        }

      })
    } catch ({ message }) {
      toast.error(message || "Something Wrong");
    }
  }

  const handleDeleteBulkPeople = async () => {
    try {
      await deleteBulkPeople({ ids: selectedRowKeys }).unwrap().then(({ success, message }) => {
        if (success === true) {
          toast.success(message);
          refetch()
        }

      })
    } catch ({ message }) {
      toast.error(message || "Something Wrong");
    }
  }

  const columns = [
    {
      title: "S.No.",
      dataIndex: "name",
      key: "name",
      render: (_, record, index) => <p>{((page - 1) * itemsPerPage) + index + 1}</p>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => <div className='flex items-center gap-2'>
        <img
          src={record?.image.startsWith("https") ? record?.image : `${imageUrl}${record?.image}`}
          style={{ width: 40, height: 40 }} alt=""
        />
        <p>{record?.name}</p>
      </div>
    },
    { title: 'Designation', dataIndex: 'designation', key: 'designation' },
    { title: 'Company Name', dataIndex: 'companyName', key: 'companyName' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Headquarter Location', dataIndex: 'hqLocation', key: 'hqLocation' },
    { title: 'Industry', dataIndex: 'industry', key: 'industry' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Mobile', dataIndex: 'mobile', key: 'mobile' },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) =>
        <div className=' flex items-center gap-4'>
          <RiEditLine onClick={() => navigate(`/add-peoples-data/${record?._id}`)} size={24} color='#d9d9d9' className={"cursor-pointer"} />
          <MdOutlineDelete onClick={() => handleDelete(record?._id)} size={24} color='red' className={"cursor-pointer"} />
        </div>

    },
  ];


  const rowSelection = {
    selectedRowKeys,
    onChange: (e) => {
      setSelectedRowKeys(e);
    }
  };




  return (
    <>
      <div className='flex items-center justify-between mb-4'>
        <Title >Peoples Data</Title>

        <div className=' flex items-center gap-2 text-gray-500'>

          <RiEditLine size={24} color='#d9d9d9' className={"cursor-pointer"} />
          <MdOutlineDelete onClick={handleDeleteBulkPeople} size={24} color='red' className={"cursor-pointer"} />
          <Input
            style={{
              width: 300,
              height: 45,
              outline: "none",
              border: "1px solid #d9d9d9",
              boxShadow: "none"
            }}
            placeholder="Search.."
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Title Select */}
          <Select className=" rounded w-[150px] h-[45px]" defaultValue=" Title">
            {titleOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>

          <Select className=" rounded w-[150px] h-[45px]" defaultValue="Industry">
            {industryOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>

          {/* Management Level Select */}
          <Select className=" rounded w-[170px] h-[45px]" defaultValue=" Management Level">
            {managementLevelOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>

          {/* Departments Select */}
          <Select className=" rounded w-[170px] h-[45px]" defaultValue="Departments & Job Functions">
            {departmentOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>


          <button type='button' className='bg-primary text-white h-10 px-4 rounded-md' onClick={() => { navigate("/add-peoples-data") }}>+ Add Data</button>


        </div>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: "#2375D0",
              borderRadius: "100%",
              colorPrimary: "white"
            }
          }
        }}
      >
        <Table
          columns={columns}
          dataSource={data?.peoples?.map((people) => ({ ...people, key: people._id }))}
          rowSelection={rowSelection}
          pagination={{
            current: parseInt(page),
            onChange: (page) => setPage(page)
          }}
        />
      </ConfigProvider>

    </>
  );
};

export default PeoplesData;