import { Button, ConfigProvider, Input, Modal, Table } from 'antd'
import React, { useState } from 'react'
import { FiDownload, FiEye, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/common/Title';
import { GoUnlock } from 'react-icons/go';
import RegisterUsersDetails from '../../components/ui/RegisteredUsers/RegisterUsersDetails';


const data = [
    {
      key: "1",
      userName: "John Doe",
      link: "https://example.com/johndoe",
      phone: "12574541274",
      companyName: "TechCorp",
      email: "john.doe@example.com",
      linkedInLink: "https://linkedin.com/in/johndoe",
    },
    {
      key: "2",
      userName: "Jane Smith",
      link: "https://example.com/janesmith",
      phone: "12578965412",
      companyName: "Innovate Solutions",
      email: "jane.smith@example.com",
      linkedInLink: "https://linkedin.com/in/janesmith",
    },
    {
      key: "3",
      userName: "Michael Johnson",
      link: "https://example.com/michaeljohnson",
      phone: "12576325874",
      companyName: "FutureTech",
      email: "michael.johnson@example.com",
      linkedInLink: "https://linkedin.com/in/michaeljohnson",
    },
    {
      key: "4",
      userName: "Emily Davis",
      link: "https://example.com/emilydavis",
      phone: "12574589632",
      companyName: "DesignHub",
      email: "emily.davis@example.com",
      linkedInLink: "https://linkedin.com/in/emilydavis",
    },
    {
      key: "5",
      userName: "Chris Brown",
      link: "https://example.com/chrisbrown",
      phone: "12571459862",
      companyName: "DevWorks",
      email: "chris.brown@example.com",
      linkedInLink: "https://linkedin.com/in/chrisbrown",
    },
    {
      key: "6",
      userName: "Sarah Wilson",
      link: "https://example.com/sarahwilson",
      phone: "12574521587",
      companyName: "MarketMinds",
      email: "sarah.wilson@example.com",
      linkedInLink: "https://linkedin.com/in/sarahwilson",
    },
    {
      key: "7",
      userName: "David Lee",
      link: "https://example.com/davidlee",
      phone: "12574569832",
      companyName: "DataStream",
      email: "david.lee@example.com",
      linkedInLink: "https://linkedin.com/in/davidlee",
    },
    {
      key: "8",
      userName: "Laura Moore",
      link: "https://example.com/lauramoore",
      phone: "12574123658",
      companyName: "EcoSolutions",
      email: "laura.moore@example.com",
      linkedInLink: "https://linkedin.com/in/lauramoore",
    },
    {
      key: "9",
      userName: "James Anderson",
      link: "https://example.com/jamesanderson",
      phone: "12574859612",
      companyName: "BuildPro",
      email: "james.anderson@example.com",
      linkedInLink: "https://linkedin.com/in/jamesanderson",
    },
    {
      key: "10",
      userName: "Olivia Harris",
      link: "https://example.com/oliviaharris",
      phone: "12574369821",
      companyName: "CloudTech",
      email: "olivia.harris@example.com",
      linkedInLink: "https://linkedin.com/in/oliviaharris",
    },
  ];
  


const RegisteredUsers = () => {
    const [search, setSearch] = useState("") 
    const [page, setPage] = useState(1); 
    const [open , setOpen] = useState(false) 
    const [modalData , setModalData] = useState()
    const itemsPerPage = 10; 
    const [selectionType, setSelectionType] = useState('checkbox');
 
 

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
            title: "Company Name",
            dataIndex: "companyName",
            key: "companyName",
        },
        
        {
            title: "Company Number",
            dataIndex: "phone",
            key: "phone",
           
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_,record) => 
            <div className=' flex items-center gap-4'> 
 
 <p className='h-[30px] w-[50px]  bg-[#F9F9F9] rounded flex items-center justify-center' onClick={()=>{setOpen(true) , setModalData(record) }} >   <FiEye size={20} color='#2375D0' className={"cursor-pointer"}/> </p> 

 <p className='h-[30px] w-[50px]  bg-[#F9F9F9] rounded flex items-center justify-center' >   <FiDownload size={20} color='#6FCD53' className={"cursor-pointer"}/> </p> 

 <p className='h-[30px] w-[50px]  bg-[#F9F9F9] rounded flex items-center justify-center' >   <FiLock size={20} color='#999999' className={"cursor-pointer"}/> </p>
              
            </div>
            
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

    
    return (
        <>
            <div className='flex items-center justify-between mb-4'>
                <Title >Registered User</Title> 

                <div className=' flex items-center gap-4 text-gray-500'> 

                <p><FiDownload size={24} /> </p>
                <p><GoUnlock size={24} /> </p>
                <p><FiLock size={24} /> </p>
                <Input
                    style={{
                        width: 400, 
                        height: 45,
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
                            borderRadius: "100%" ,
                            colorPrimary: "white"
                        }
                    },
                    token:{
                        // colorPrimary: "white" 
                    }
                }}
            >
                <Table 
                    columns={columns} 
                    dataSource={data}  
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                      }}
                    pagination={{
                        current: parseInt(page),
                        onChange: (page)=> setPage(page)
                    }}
                />
            </ConfigProvider> 
            <RegisterUsersDetails open={open}  modalData={modalData} setOpen={setOpen} />
        </>
    )
}

export default RegisteredUsers;