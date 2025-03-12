import { ConfigProvider, Input, Select, Table } from 'antd';
import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import Title from '../../../components/common/Title';
import { RiEditLine } from 'react-icons/ri';
import { MdOutlineDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import CompanyFilter from './CompanyFilter';
import { useGetCompanyQuery } from '../../../redux/apiSlices/companySlice';
import { useSelector } from 'react-redux';

const CompaniesData = () => {
      const [page, setPage] = useState(1);
      const itemsPerPage = 10;
      const [selectionType, setSelectionType] = useState('checkbox');
      const navigate = useNavigate();
      const { searchQuery, companyType, sales, subIndustry, numberOfEmployees, country } = useSelector(
            (state) => state.companyFilter,
      );

      const { data: companyData } = useGetCompanyQuery([
            {
                  name: 'page',
                  value: page,
            },
            {
                  name: 'search',
                  value: searchQuery,
            },
            {
                  name: 'company_type',
                  value: companyType,
            },
            {
                  name: 'sales',
                  value: sales,
            },
            {
                  name: 'industry',
                  value: subIndustry,
            },
            {
                  name: 'employee_total',
                  value: numberOfEmployees,
            },
            {
                  name: 'country',
                  value: country,
            },
      ]);

      const columns = [
            {
                  title: 'S.No.',
                  dataIndex: 'name',
                  key: 'name',
                  render: (_, record, index) => <p>{(page - 1) * itemsPerPage + index + 1}</p>,
            },
            {
                  title: 'Company Name',
                  dataIndex: 'company_name',
                  key: 'company_name',
            },
            {
                  title: 'City/Country',
                  dataIndex: 'country',
                  key: 'country',
            },
            {
                  title: 'Industry',
                  dataIndex: 'industry',
                  key: 'industry',
            },
            {
                  title: 'Company Type',
                  dataIndex: 'company_type',
                  key: 'company_type',
            },
            {
                  title: 'Actions',
                  dataIndex: 'actions',
                  key: 'actions',
                  render: (_, record) => (
                        <div className=" flex items-center gap-4">
                              <p
                                    className="h-[30px] w-[50px]  bg-[#F9F9F9] rounded flex items-center justify-center"
                                    onClick={() => handleEdit(record?._id)}
                              >
                                    {' '}
                                    <RiEditLine size={20} color="#2375D0" className={'cursor-pointer'} />{' '}
                              </p>

                              <p className="h-[30px] w-[50px]  bg-[#F9F9F9] rounded flex items-center justify-center">
                                    {' '}
                                    <FiDownload size={20} color="#6FCD53" className={'cursor-pointer'} />{' '}
                              </p>

                              <p className="h-[30px] w-[50px]  bg-[#F9F9F9] rounded flex items-center justify-center">
                                    {' '}
                                    <MdOutlineDelete size={20} color="#999999" className={'cursor-pointer'} />{' '}
                              </p>
                        </div>
                  ),
            },
      ];

      const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                  console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: (record) => ({
                  disabled: record.name === 'Disabled User',
                  // Column configuration not to be checked
                  name: record.name,
            }),
      };

      const handleEdit = (id) => {
            navigate(`/add-companies-data/${id}`);
      };
      return (
            <>
                  <Title>Companies Data</Title>
                  <div className=" mb-4 flex items-center justify-between">
                        

                        <div className="flex my-3 items-center gap-2 text-gray-500">
                              <p className="cursor-pointer">
                                    <FiDownload size={24} />{' '}
                              </p>
                              <p className="cursor-pointer">
                                    <RiEditLine size={24} />{' '}
                              </p>
                              <p className="cursor-pointer">
                                    <MdOutlineDelete size={24} />{' '}
                              </p>
                        </div>

                        <div className='flex items-center gap-6'>
                              <CompanyFilter />

                              <button
                                    className="bg-primary text-white h-10 px-4  mt-2 rounded-md"
                                    onClick={() => {
                                          navigate('/add-companies-data');
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
                              token: {
                                    // colorPrimary: "white"
                              },
                        }}
                  >
                        <Table
                              columns={columns}
                              dataSource={companyData?.companies}
                              rowSelection={{
                                    type: selectionType,
                                    ...rowSelection,
                              }}
                              pagination={{
                                    current: parseInt(page),
                                    onChange: (page) => setPage(page),
                              }}
                        />
                  </ConfigProvider>
            </>
      );
};

export default CompaniesData;
