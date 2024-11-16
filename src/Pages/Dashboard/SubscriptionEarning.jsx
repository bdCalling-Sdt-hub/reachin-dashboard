import React, { useState } from 'react';
import Title from '../../components/common/Title';
import { ConfigProvider, Input, Table } from 'antd';
import { FiEye } from 'react-icons/fi';
import SubscriptionEarningDetails from '../../components/ui/SubscriptionEarningDetails/SubscriptionEarningDetails';
 
const data = [
    {
      userName: "John Doe",
      email: "john.doe@example.com",
      packageType: "Basic",
      subscriptionName: "Monthly Plan",
      price: 9.99,
    },
    {
      userName: "Jane Smith",
      email: "jane.smith@example.com",
      packageType: "Premium",
      subscriptionName: "Yearly Plan",
      price: 99.99,
    },
    {
      userName: "Alice Johnson",
      email: "alice.johnson@example.com",
      packageType: "Standard",
      subscriptionName: "Quarterly Plan",
      price: 29.99,
    },
    {
      userName: "Bob Brown",
      email: "bob.brown@example.com",
      packageType: "Basic",
      subscriptionName: "Monthly Plan",
      price: 9.99,
    },
    {
      userName: "Charlie Green",
      email: "charlie.green@example.com",
      packageType: "Standard",
      subscriptionName: "Yearly Plan",
      price: 59.99,
    },
    {
      userName: "Diana Prince",
      email: "diana.prince@example.com",
      packageType: "Premium",
      subscriptionName: "Monthly Plan",
      price: 19.99,
    },
    {
      userName: "Ethan Hunt",
      email: "ethan.hunt@example.com",
      packageType: "Basic",
      subscriptionName: "Quarterly Plan",
      price: 19.99,
    },
    {
      userName: "Fiona Carter",
      email: "fiona.carter@example.com",
      packageType: "Standard",
      subscriptionName: "Monthly Plan",
      price: 14.99,
    },
    {
      userName: "George Wilson",
      email: "george.wilson@example.com",
      packageType: "Premium",
      subscriptionName: "Yearly Plan",
      price: 199.99,
    },
    {
      userName: "Hannah Adams",
      email: "hannah.adams@example.com",
      packageType: "Standard",
      subscriptionName: "Monthly Plan",
      price: 14.99,
    },
  ];
  

const SubscriptionEarning = () => { 

    const [search, setSearch] = useState("") 
    const [page, setPage] = useState(1); 
    const [open , setOpen] =useState(false) 
    const [packageData , setPackageData] = useState()
    const itemsPerPage = 10;

    const columns = [
        {
            title: "S.No.",
            dataIndex: "name",
            key: "name",
            render: (_,record, index) =><p>{((page - 1) * itemsPerPage) + index + 1}</p>
        },
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },       
        {
            title: "Package Type",
            dataIndex: "packageType",
            key: "packageType",
           
        }, 
        {
            title: "Subscriptions Name",
            dataIndex: "subscriptionName",
            key: "subscriptionName",
           
        }, 
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
           
        }, 
       { title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: (_,record) => 
<p className='h-[30px] w-[50px]  bg-[#F9F9F9] rounded flex items-center justify-center' onClick={()=>{setOpen(true) , setPackageData(record) }} >   <FiEye size={20} color='#2375D0' className={"cursor-pointer"}/> </p> 
}
   
    ];

    return (
        <div>
           <div className='flex items-center justify-between mb-4'>
                <Title >Subscription Earning</Title> 

                <div className=' flex  items-center gap-5'> 

                <Input
                    style={{
                        width: 300, 
                        height: 40,
                        outline: "none",
                        border: "1px solid #d9d9d9",
                        boxShadow: "none"
                    }}
                    placeholder="Search.."
                    onChange={(e)=>setSearch(e.target.value)}
                /> 

<select className="  border rounded w-[130px] h-[45px]" defaultValue="All">
                <option value="All">All</option>
                <option value="Block">Block</option>
                <option value="UnBlock">UnBlock</option>
            </select> 
                </div>
            </div>

            <ConfigProvider
                theme={{
                    components: {
                        Pagination: {
                            itemActiveBg: "#2375D0",
                            borderRadius: "100%"
                        }
                    },
                    token:{
                        colorPrimary: "white"
                    }
                }}
            >
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    pagination={{
                        current: parseInt(page),
                        onChange: (page)=> setPage(page)
                    }}
                />
            </ConfigProvider> 
            <SubscriptionEarningDetails packageData={packageData} setOpen={setOpen} open={open} />
        </div>
    );
};

export default SubscriptionEarning;