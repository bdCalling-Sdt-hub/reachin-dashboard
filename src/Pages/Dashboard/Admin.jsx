import { Table } from 'antd'
import React, { useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import CreateAdmin from '../../components/ui/Admin/CreateAdmin';
import Title from '../../components/common/Title';
import { useDeleteAdminMutation, useGetAdminQuery } from '../../redux/apiSlices/adminSlice';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const Admin = () => {
    const [open, setOpen] = useState(false);
    const { data: admins, refetch } = useGetAdminQuery();
    const [deleteAdmin] = useDeleteAdminMutation();

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
                    await deleteAdmin(id).unwrap().then((response) => { 
                        if(response.success === true){
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
            render: (_, record) => <RiDeleteBin5Line onClick={() => handleDeleteAdmin(record._id)} size={24} className="text-red-600 cursor-pointer" />
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