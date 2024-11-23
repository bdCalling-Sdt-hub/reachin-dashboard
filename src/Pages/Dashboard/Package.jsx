import React, { useState } from "react";
import { Tabs, Card, Button, Select, Table } from "antd";
import SubscriptionUpdate from '../../components/ui/Subscription/SubscriptionUpdate';
import Title from '../../components/common/Title';
import { useDeletePackageMutation, useGetPackageQuery } from "../../redux/apiSlices/packageSlice";
import { BiEdit } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Package = () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null);
    const [paymentType, setPaymentType] = useState("Monthly");
    const { data: packages, refetch } = useGetPackageQuery(paymentType);
    const [deletePackage] = useDeletePackageMutation();

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
                    await deletePackage(id).unwrap().then((response) => { 
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

    const renderPackages = (packages) => {
        const columns = [
            {
                title: "S.No.",
                dataIndex: "name",
                key: "name",
                render: (_, record, index) => <p>{index + 1}</p>
            },
            {
                title: "Title",
                dataIndex: "title",
                key: "title",
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price",
            },
            {
                title: "Credit",
                dataIndex: "credit",
                key: "credit",
            },
            {
                title: "Duration",
                dataIndex: "duration",
                key: "duration",
            },
            {
                title: "Payment Type",
                dataIndex: "paymentType",
                key: "paymentType",

            },
            {
                title: "Login Limit",
                dataIndex: "loginLimit",
                key: "paymentType",

            },
            {
                title: "Description",
                dataIndex: "description",
                key: "description",
                render: (_, record) => <p>{record?.description?.slice(0, 10) + "..."}</p>
            },
            {
                title: "Actions",
                dataIndex: "actions",
                key: "actions",
                render: (_, record) =>
                    <div className=' flex items-center gap-4'>
                        <BiEdit onClick={()=>setValue(record)} size={24} className="cursor-pointer" />
                        <FaRegTrashCan onClick={()=>handleDelete(record?._id)} size={20} color="red" className="cursor-pointer" />

                    </div>

            },
        ];
        return (
            <React.Fragment>
                <Table
                    columns={columns}
                    dataSource={packages?.map((item) => ({ ...item, key: item._id }))}
                    pagination={false}
                />
            </React.Fragment>
        );
    };

    const tabItems = [
        {
            label: "Monthly",
            key: "Monthly",
            children: renderPackages(packages),
        },
        {
            label: "Annually",
            key: "Yearly",
            children: renderPackages(packages),
        },
    ];


    return (
        <React.Fragment>
            <div className="flex justify-between items-center mb-4">
                <Title>Packages</Title>
                <button
                    type="button"
                    className="bg-primary text-white h-10 px-4 rounded-md"
                    onClick={() => setOpen(true)}
                >
                    + Add Package
                </button>
            </div>

            <div className="p-5 py-2 bg-white rounded-lg">
                <Tabs
                    defaultActiveKey="1"
                    items={tabItems}
                    onChange={(e) => setPaymentType(e)}
                />
            </div>
            <SubscriptionUpdate value={value} setValue={setValue} open={open} setOpen={setOpen} refetch={refetch} />
        </React.Fragment>
    );
};

export default Package;