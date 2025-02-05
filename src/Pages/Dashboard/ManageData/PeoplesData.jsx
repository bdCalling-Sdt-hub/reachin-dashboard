import { ConfigProvider, Input, Select, Table } from 'antd';
import React, { useState } from 'react';
import Title from '../../../components/common/Title';

import { RiEditLine } from 'react-icons/ri';
import { MdOutlineDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
      useDeleteBulkPeopleMutation,
      useDeletePeopleMutation,
      useGetPeopleQuery,
} from '../../../redux/apiSlices/peopleSlice';
import toast from 'react-hot-toast';
import { imageUrl } from '../../../redux/api/baseApi';
import PeopleFilter from './PeopleFilter';
import { useSelector } from 'react-redux';

const PeoplesData = () => {
      const [page, setPage] = useState(1);
      const itemsPerPage = 10;
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const navigate = useNavigate();
      const [deletePeople] = useDeletePeopleMutation();
      const [deleteBulkPeople] = useDeleteBulkPeopleMutation();

      const {
            search,
            title,
            primaryIndustry,
            subIndustry,
            seniorityLevel,
            numberOfEmployees,
            source,
            revenue,
            country,
      } = useSelector((state) => state.peopleFilter);

      const { data, refetch } = useGetPeopleQuery([
            { name: 'page', value: page },
            {
                  name: 'search',
                  value: search,
            },
            {
                  name: 'title',
                  value: title,
            },
            {
                  name: 'industry',
                  value: primaryIndustry,
            },
            {
                  name: 'sub_industry',
                  value: subIndustry,
            },
            {
                  name: 'seniority',
                  value: seniorityLevel,
            },
            {
                  name: 'employee_count',
                  value: numberOfEmployees,
            },
            {
                  name: 'source',
                  value: source,
            },
            {
                  name: 'revenue_range',
                  value: revenue,
            },
            {
                  name: 'country',
                  value: country,
            },
      ]);

      const handleDelete = async (id) => {
            try {
                  await deletePeople(id)
                        .unwrap()
                        .then(({ success, message }) => {
                              if (success === true) {
                                    toast.success(message);
                                    refetch();
                              }
                        });
            } catch ({ message }) {
                  toast.error(message || 'Something Wrong');
            }
      };

      const handleDeleteBulkPeople = async () => {
            try {
                  await deleteBulkPeople({ ids: selectedRowKeys })
                        .unwrap()
                        .then(({ success, message }) => {
                              if (success === true) {
                                    toast.success(message);
                                    refetch();
                              }
                        });
            } catch ({ message }) {
                  toast.error(message || 'Something Wrong');
            }
      };

      const columns = [
            {
                  title: 'S.No.',
                  dataIndex: 'name',
                  key: 'name',
                  render: (_, record, index) => <p>{(page - 1) * itemsPerPage + index + 1}</p>,
            },
            {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: (_, record) => (
                        <div className="flex items-center gap-2">
                              <img
                                    src={
                                          record?.image.startsWith('https')
                                                ? record?.image
                                                : `${imageUrl}${record?.image}`
                                    }
                                    style={{ width: 40, height: 40 }}
                                    alt=""
                              />
                              <p>{record?.first_name + ' ' + record?.last_name}</p>
                        </div>
                  ),
            },
            { title: 'Designation', dataIndex: 'title', key: 'title' },
            { title: 'Company Name', dataIndex: 'company_name', key: 'company_name' },
            { title: 'Location', dataIndex: 'country', key: 'country' },
            { title: 'Headquarter Location', dataIndex: 'hq_location', key: 'hq_location' },
            { title: 'Industry', dataIndex: 'industry', key: 'industry' },
            { title: 'Email', dataIndex: 'email', key: 'email' },
            { title: 'Mobile', dataIndex: 'mobile', key: 'mobile' },
            {
                  title: 'Actions',
                  dataIndex: 'actions',
                  key: 'actions',
                  render: (_, record) => (
                        <div className=" flex items-center gap-4">
                              <RiEditLine
                                    onClick={() => navigate(`/add-peoples-data/${record?._id}`)}
                                    size={24}
                                    color="#d9d9d9"
                                    className={'cursor-pointer'}
                              />
                              <MdOutlineDelete
                                    onClick={() => handleDelete(record?._id)}
                                    size={24}
                                    color="red"
                                    className={'cursor-pointer'}
                              />
                        </div>
                  ),
            },
      ];

      const rowSelection = {
            selectedRowKeys,
            onChange: (e) => {
                  setSelectedRowKeys(e);
            },
      };

      return (
            <>
                  <div className="">
                        <Title>Peoples Data</Title>

                        <div className="mt-4 flex flex-wrap items-center gap-2 text-gray-500">
                              <RiEditLine size={24} color="#d9d9d9" className={'cursor-pointer'} />
                              <MdOutlineDelete
                                    onClick={handleDeleteBulkPeople}
                                    size={24}
                                    color="red"
                                    className={'cursor-pointer'}
                              />
                              <PeopleFilter />

                              <button
                                    type="button"
                                    className="bg-primary text-white h-10 px-4 rounded-md"
                                    onClick={() => {
                                          navigate('/add-peoples-data');
                                    }}
                              >
                                    + Add Data
                              </button>
                        </div>
                  </div>

                  <ConfigProvider
                        theme={{
                              components: {
                                    Pagination: {
                                          itemActiveBg: '#2375D0',
                                          borderRadius: '100%',
                                          colorPrimary: 'white',
                                    },
                              },
                        }}
                  >
                        <Table
                              columns={columns}
                              dataSource={data?.peoples?.map((people) => ({ ...people, key: people._id }))}
                              rowSelection={rowSelection}
                              pagination={{
                                    current: parseInt(page),
                                    onChange: (page) => setPage(page),
                              }}
                        />
                  </ConfigProvider>
            </>
      );
};

export default PeoplesData;
