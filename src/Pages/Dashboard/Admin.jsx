import { Table } from 'antd'
import React, { useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import CreateAdmin from '../../components/ui/Admin/CreateAdmin';
import Title from '../../components/common/Title';
import { useGetAdminQuery } from '../../redux/apiSlices/adminSlice';

const Admin = () => {
    const [open, setOpen] = useState(false);
    const {data: admins} = useGetAdminQuery();


    const columns = [
        {
            title: "Serial No.",
            dataIndex: "index",
            key: "index",
            render: (_, record, index) => <p>{index + 1}</p>
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => <RiDeleteBin5Line size={24} className="text-red-600" />
        },
    ]

    return (
        <div>
            {/* header */}
            <div className='flex items-center justify-between mb-4'>
                <Title className=''>Admins</Title>
                <button className='bg-primary text-white h-10 px-4 rounded-md' onClick={() => { setOpen(true) }}>+ Add Admin</button>
            </div>

            {/* table container */}
            <Table columns={columns} dataSource={admins} pagination={false} />
            <CreateAdmin open={open} setOpen={setOpen} />
        </div>
    )
}

export default Admin