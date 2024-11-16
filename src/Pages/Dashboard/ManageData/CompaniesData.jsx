import { ConfigProvider, Input, Select, Table } from 'antd';
import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import Title from "../../../components/common/Title"; 
import { departmentOptions, industryOptions, managementLevelOptions, titleOptions } from '../../../components/common/FilterOptions';
import { RiEditLine } from 'react-icons/ri';
import { MdOutlineDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'; 


const data = [
    { id: 1, companyName: "TechWave Solutions", cityCountry: "New York, USA", industry: "IT Services", companyType: "Private" },
    { id: 2, companyName: "GreenLeaf Corp.", cityCountry: "Toronto, Canada", industry: "Agriculture", companyType: "Public" },
    { id: 3, companyName: "FinSure Group", cityCountry: "London, UK", industry: "Finance", companyType: "Private" },
    { id: 4, companyName: "HealthFirst Inc.", cityCountry: "Sydney, Australia", industry: "Healthcare", companyType: "Public" },
    { id: 5, companyName: "EduSpark Pvt Ltd.", cityCountry: "Mumbai, India", industry: "Education", companyType: "Private" },
    { id: 6, companyName: "BlueOcean Shipping", cityCountry: "Hamburg, Germany", industry: "Logistics", companyType: "Public" },
    { id: 7, companyName: "EcoBuild Materials", cityCountry: "Cape Town, South Africa", industry: "Construction", companyType: "Private" },
    { id: 8, companyName: "StyleSense Retail", cityCountry: "Paris, France", industry: "Retail", companyType: "Public" },
    { id: 9, companyName: "SkyNet Comms", cityCountry: "Tokyo, Japan", industry: "Telecommunications", companyType: "Private" },
    { id: 10, companyName: "SolarX Energy", cityCountry: "San Francisco, USA", industry: "Renewable Energy", companyType: "Public" },
  ]; 

const CompaniesData = () => { 
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
          {
                title: "Company Name",
                dataIndex: "companyName",
                key: "companyName",
              },
              {
                title: "City/Country",
                dataIndex: "cityCountry",
                key: "cityCountry",
              },
              {
                title: "Industry",
                dataIndex: "industry",
                key: "industry",
              },
              {
                title: "Company Type",
                dataIndex: "companyType",
                key: "companyType",
              },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_,record) => 
            <div className=' flex items-center gap-4'> 
 
 <p className='h-[30px] w-[50px]  bg-[#F9F9F9] rounded flex items-center justify-center' onClick={()=>handleEdit(record?.id)} >   <RiEditLine size={20} color='#2375D0' className={"cursor-pointer"}/> </p>  

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
        navigate(`/add-companies-data/${id}`)
      }
    return (
        <>
        <div className='flex items-center justify-between mb-4'>
            <Title >Companies Data</Title> 

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
      <Select className=" rounded w-[150px] h-[45px]" defaultValue="Departments & Job Functions">
        {departmentOptions.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>

      <button className='bg-primary text-white h-10 px-4 rounded-md' onClick={()=>{navigate("/add-companies-data")}}>+ Add Data</button>
            

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

export default CompaniesData;