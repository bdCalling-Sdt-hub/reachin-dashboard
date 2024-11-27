import React, { useState } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6';
import { useDeleteBulkContactMutation, useDeleteContactMutation, useGetContactQuery } from '../../redux/apiSlices/contactSlice';
import { Table } from 'antd';
import toast from 'react-hot-toast';
import moment from 'moment';

const Contact = () => {
    const [page, setPage] = useState(1);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const itemsPerPage = 10;
    const { data, refetch } = useGetContactQuery(page);
    const [deleteContact] = useDeleteContactMutation();
    const [deleteBulkContact] = useDeleteBulkContactMutation();


    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


    const handleDelete = async (id) => {
        try {
            await deleteContact(id).unwrap().then(({ success, message }) => {
                if (success === true) {
                    toast.success(message);
                    refetch()
                }

            })
        } catch ({ message }) {
            toast.error(message || "Something Wrong");
        }
    }


    const handleBulkDelete = async (ids) => {
        try {
            await deleteBulkContact(ids).unwrap().then(({ success, message }) => {
                if (success === true) {
                    toast.success(message);
                    refetch()
                }

            })
        } catch (error) {
            toast.error(error?.data?.message || "Something Wrong");
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
            title: "Question",
            dataIndex: "question",
            key: "question",
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
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Job Title",
            dataIndex: "jobTitle",
            key: "jobTitle",
        },
        {
            title: "Company",
            dataIndex: "company",
            key: "company",
            render: (_, record) =>(
                <p>{"TATA"}</p>
            )

        },
        {
            title: "Date",
            dataIndex: "jobTitle",
            key: "jobTitle",
            render: (_, record) =>(
                <p>{moment(record?.createdAt).format("lll")}</p>
            )
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) =>
                <FaRegTrashCan onClick={() => handleDelete(record?._id)} size={20} color="red" className="cursor-pointer" />

        },
    ];

    
    return (
        <React.Fragment>
            <div className='flex items-center justify-between mb-4'>
                <p>Contacts</p>
                <FaRegTrashCan onClick={()=>handleBulkDelete(selectedRowKeys)} size={20} color="red" className="cursor-pointer" />
            </div>

            <div className='bg-white rounded'>
                <Table
                    columns={columns}
                    rowSelection={rowSelection}
                    dataSource={data?.contacts?.map((contact) => ({ ...contact, key: contact._id }))}
                    pagination={{
                        current: parseInt(page),
                        onChange: (page) => setPage(page),
                        total: data?.meta?.total
                    }}
                />
            </div>
        </React.Fragment>
    )
}

export default Contact