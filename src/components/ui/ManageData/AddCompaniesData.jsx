import React from 'react';
import { LuMoveLeft } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';
import { Form, Button, Input, Select } from 'antd';
import FormItem from '../../common/FormItem';
import { titleOptions } from '../../common/FilterOptions';


const AddCompaniesData = () => { 
    const { id } = useParams();

    // Form submission handler
    const onFinish = (values) => {
      if (id) {
        console.log('Editing Data:', values);
      } else {
        console.log('Adding New Data:', values);
      }
    };
 
    
    return (
        <div className='bg-white p-5 rounded-lg'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <Link to="/companies-data">
              <LuMoveLeft size={24} color='#636363' />
            </Link>
            <p className='font-medium text-[24px] text-primary'>
              {id ? "Edit Companies Data" : "Add Companies Data"}
            </p>
          </div>
          <button className='w-[163px] h-[44px] border border-primary text-primary rounded shadow-sm'>
            Upload Excel File
          </button>
        </div>
  
        {/* Form */}
        <Form layout='vertical' className='px-7' onFinish={onFinish}>
        
         {/* Company Details Section */}
  <p className='font-medium text-[20px] text-primary py-4'>Company Details</p>
  <div className='grid grid-cols-2 gap-x-10'>
    <FormItem name="name" label="Name" />
    <FormItem name="companyIndustry" label="Company Industry" /> 
    <FormItem name="companyType" label="Company Type" />
    <FormItem name="companyName" label="Company Name" />
    <FormItem name="employeeCount" label="EST. Employee Count" />
    <FormItem name="revenue" label="EST. Revenue" />
    <FormItem name="localLocations" label="Local Locations" />
    <FormItem name="hqLocations" label="HQ Locations" /> 
    </div>
    <Form.Item
      name="overview"
      label={<p className='text-[15px] text-[#636363]'>Overview</p>}  
    > 
    <Input.TextArea rows={6} placeholder='Write company details' />
    </Form.Item>
  
  
  <p className=' border-b-2 h-1 w-full border-[#cfcece] pt-0 pb-4'></p> 
  
  {/* Employees by Management Level Section */}
  <p className='font-medium text-[20px] text-primary py-4'>Employees by Management Level</p>
  <div className='grid grid-cols-2 gap-x-10'>
    <FormItem name="openContacts" label="Open Contacts" />
    <FormItem name="nonManager" label="Non-Manager" />
    <FormItem name="manager" label="Manager" />
    <FormItem name="director" label="Director" />
    <FormItem name="cLevel" label="C-Level" />
  </div> 
  
  <p className=' border-b-2 h-1 w-full border-[#cfcece] pt-0 pb-4'></p>
  
  {/* Contact Details Section */}
  <p className='font-medium text-[20px] text-primary py-4'>Contact Details</p>
  <div className='grid grid-cols-2 gap-x-10'>
    <FormItem name="instagram" label="Instagram" />
    <FormItem name="facebook" label="Facebook" />
    <FormItem name="twitter" label="Twitter/X" />
    <FormItem name="linkedin" label="LinkedIn" />
    <FormItem name="youtube" label="YouTube" />
    <FormItem name="website" label="Website Link" />
  </div>
  
          {/* Submit Button */}
          <Form.Item>  
              <div  className=' flex items-center justify-between'> 
              <p className=' text-[14px] text-[#FF7C70]'>kindly  check and confirm all information . </p>
            <button type='submit'  className="mt-4 h-[44px] w-[150px] rounded-md bg-primary text-white ">
              {id ? 'Update Data' : 'Add Data'}
            </button>
  
              </div>
          </Form.Item>
        </Form>
      </div>
    );
};

export default AddCompaniesData;