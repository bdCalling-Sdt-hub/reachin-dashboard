import { ConfigProvider, Input, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { FiEye, FiLock, FiUnlock } from 'react-icons/fi';
import Title from '../../components/common/Title';
import { GoUnlock } from 'react-icons/go';
import RegisterUsersDetails from '../../components/ui/RegisteredUsers/RegisterUsersDetails';
import { useBlockUserMutation, useGetUserQuery, useActiveBulkUserMutation, useBlockBulkUserMutation } from "../../redux/apiSlices/userSlice"
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useCompanyDetailsQuery } from '../../redux/apiSlices/authSlice';

const UserTable = () => {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);
    const [value, setValue] = useState(null)
    const itemsPerPage = 10;
    const [status, setStatus] = useState('');
    const { data: users, refetch } = useGetUserQuery({ status, page, search });
    const [blockUser] = useBlockUserMutation();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [activeBulkUser] = useActiveBulkUserMutation();
    const [blockBulkUser] = useBlockBulkUserMutation();

    const id = new URLSearchParams(useLocation().search).get("id");
    const {data: company} = useCompanyDetailsQuery(id);

    useEffect(()=>{
        if(company?._id && company?.email){
            setValue(company);
        }
    }, [company])




    const handleBlock = async (id) => {
        try {
            await blockUser(id).unwrap().then(({ success, message }) => {
                if (success === true) {
                    toast.success(message);
                    refetch()
                }

            })
        } catch ({ message }) {
            toast.error(message || "Something Wrong");
        }
    }

    const handleBulkBlock = async () => {
        try {
            await blockBulkUser({ ids: selectedRowKeys }).unwrap().then(({ success, message }) => {
                if (success === true) {
                    toast.success(message);
                    refetch()
                }

            })
        } catch ({ message }) {
            toast.error(message || "Something Wrong");
        }
    }

    const handleActiveBlock = async () => {
        try {
            await activeBulkUser({ ids: selectedRowKeys }).unwrap().then(({ success, message }) => {
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
            title: "User Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Company Name",
            dataIndex: "company",
            key: "company",
        },
        {
            title: "Company Site",
            dataIndex: "website",
            key: "website",
        },
        {
            title: "Mobile Number",
            dataIndex: "contact",
            key: "contact",

        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) =>
                <div className=' flex items-center gap-4'>

                    <p className='h-[30px] w-[50px]  bg-[#F9F9F9] rounded flex items-center justify-center' onClick={() => setValue(record)} >
                        <FiEye size={20} color='#2375D0' className={"cursor-pointer"} /> </p>
                    <p className='h-[30px] w-[50px]  bg-[#F9F9F9] rounded flex items-center justify-center' >
                        {
                            record?.status === "Active"
                                ?
                                <FiUnlock onClick={() => handleBlock(record?._id)} size={20} color='#999999' className={"cursor-pointer"} />
                                :
                                <FiLock onClick={() => handleBlock(record?._id)} size={20} color='red' className={"cursor-pointer"} />
                        }
                    </p>

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
        <React.Fragment>
            <div className='flex items-center justify-between mb-4'>
                <Title >Registered User</Title>

                <div className=' flex items-center gap-4 text-gray-500'>
                    <GoUnlock onClick={handleActiveBlock} color='#999999' className='cursor-pointer' size={24} />
                    <FiLock onClick={handleBulkBlock} className='cursor-pointer' color='red' size={24} />
                    <Input
                        style={{
                            width: 400,
                            height: 45,
                            outline: "none",
                            border: "1px solid #d9d9d9",
                            boxShadow: "none"
                        }}
                        placeholder="Search.."
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <Select
                        onChange={(e) => setStatus(e)}
                        placeholder="Filter By Payment Type"
                        style={{
                            width: 210,
                            height: 40,
                            outline: "none",
                            boxShadow: "none"
                        }}
                    >
                        <Select.Option value="">All</Select.Option>
                        <Select.Option value="Active">Active</Select.Option>
                        <Select.Option value="Block">Block</Select.Option>
                    </Select>

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
                    dataSource={users?.users?.map((user) => ({ ...user, key: user._id }))}
                    rowSelection={rowSelection}
                    pagination={{
                        current: parseInt(page),
                        onChange: (page) => setPage(page),
                        total: users?.meta?.total
                    }}
                />
            </ConfigProvider>

            <RegisterUsersDetails value={value} setValue={setValue} />
        </React.Fragment>
    )
}

export default UserTable;