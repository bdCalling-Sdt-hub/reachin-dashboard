import { ConfigProvider, Input, Select, Table } from 'antd';
import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import Title from "../../../components/common/Title"; 
import { departmentOptions, industryOptions, managementLevelOptions, titleOptions } from '../../../components/common/FilterOptions';
import { RiEditLine } from 'react-icons/ri';
import { MdOutlineDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const data = [
    { key: '1', sNo: 1239, contactName: 'Serenity', title: 'React JS Developer', address: '365 South Inverness St.', comName: 'Acme Co.', comIndustry: 'Financials' },
    { key: '2', sNo: 1240, contactName: 'Ethan', title: 'UI Designer', address: '78 East Spring St.', comName: 'Design Pro', comIndustry: 'Creative' },
    { key: '3', sNo: 1241, contactName: 'Sophia', title: 'Frontend Engineer', address: '123 West Elm Dr.', comName: 'Tech Innovations', comIndustry: 'Technology' },
    { key: '4', sNo: 1242, contactName: 'Liam', title: 'Backend Developer', address: '456 North Maple Ln.', comName: 'CodeSmith', comIndustry: 'Software' },
    { key: '5', sNo: 1243, contactName: 'Olivia', title: 'Product Manager', address: '789 South Ridge Ave.', comName: 'Agile Solutions', comIndustry: 'Consulting' },
    { key: '6', sNo: 1244, contactName: 'Noah', title: 'Full Stack Developer', address: '12 East Park Blvd.', comName: 'WebWorks', comIndustry: 'E-commerce' },
    { key: '7', sNo: 1245, contactName: 'Ava', title: 'Data Analyst', address: '34 West Cedar St.', comName: 'DataWizards', comIndustry: 'Analytics' },
    { key: '8', sNo: 1246, contactName: 'William', title: 'Project Coordinator', address: '56 North Pine Rd.', comName: 'Streamline Co.', comIndustry: 'Logistics' },
    { key: '9', sNo: 1247, contactName: 'Isabella', title: 'QA Tester', address: '78 South Ocean Dr.', comName: 'Bug Hunters', comIndustry: 'Quality Assurance' },
    { key: '10', sNo: 1248, contactName: 'James', title: 'DevOps Engineer', address: '90 East Sunset Blvd.', comName: 'Cloudify', comIndustry: 'Cloud Computing' },
  ]; 

const PeoplesData = () => { 
    const [search, setSearch] = useState("") 
    const [page, setPage] = useState(1); 
    const itemsPerPage = 10; 
    const [selectionType, setSelectionType] = useState('checkbox');
 const navigate = useNavigate()
 

    const columns = [
        {
            title: "S.No.",
            dataIndex: "name",
            key: "name",
            render: (_,record, index) =><p>{((page - 1) * itemsPerPage) + index + 1}</p>
        },
  { title: 'Contact Name', dataIndex: 'contactName', key: 'contactName' },
  { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Company Name', dataIndex: 'comName', key: 'comName' },
  { title: 'Company Industry', dataIndex: 'comIndustry', key: 'comIndustry' },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_,record) => 
            <div className=' flex items-center gap-4'> 
 
 <p className='h-[30px] w-[50px]  bg-[#F9F9F9] rounded flex items-center justify-center' onClick={()=>handleEdit(record?.key)} >   <RiEditLine size={20} color='#2375D0' className={"cursor-pointer"}/> </p>  

 <p className='h-[30px] w-[50px]  bg-[#F9F9F9] rounded flex items-center justify-center'   >   <FiDownload size={20} color='#6FCD53' className={"cursor-pointer"}/> </p> 

 <p className='h-[30px] w-[50px]  bg-[#F9F9F9] rounded flex items-center justify-center' >   <MdOutlineDelete size={20} color='#999999' className={"cursor-pointer"}/> </p>
              
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


      const handleEdit =(id)=>{
        navigate(`/add-peoples-data/${id}`)
      }

    return (
        <>
        <div className='flex items-center justify-between mb-4'>
            <Title >Peoples Data</Title> 

            <div className=' flex items-center gap-2 text-gray-500'> 

            <p className='cursor-pointer'><FiDownload size={24} /> </p>
            <p className='cursor-pointer'><RiEditLine size={24} /> </p>
            <p className='cursor-pointer'><MdOutlineDelete  size={24} /> </p>
            <Input
                style={{
                    width: 300, 
                    height: 45,
                    outline: "none",
                    border: "1px solid #d9d9d9",
                    boxShadow: "none"
                }}
                placeholder="Search.."
                onChange={(e)=>setSearch(e.target.value)}
            />   

                  {/* Title Select */}
      <Select className=" rounded w-[150px] h-[45px]" defaultValue=" Title">
        {titleOptions.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>  

<Select className=" rounded w-[150px] h-[45px]" defaultValue="Industry">
        {industryOptions.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>

      {/* Management Level Select */}
      <Select className=" rounded w-[170px] h-[45px]" defaultValue=" Management Level">
        {managementLevelOptions.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>

      {/* Departments Select */}
      <Select className=" rounded w-[170px] h-[45px]" defaultValue="Departments & Job Functions">
        {departmentOptions.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>


      <button className='bg-primary text-white h-10 px-4 rounded-md' onClick={()=>{navigate("/add-peoples-data")}}>+ Add Data</button>
            

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
       
    </>
    );
};

export default PeoplesData;