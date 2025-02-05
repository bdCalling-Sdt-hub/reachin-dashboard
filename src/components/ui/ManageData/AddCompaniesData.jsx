import React, { useEffect, useState } from 'react';
import { LuMoveLeft } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';
import { Form } from 'antd';
import CustomInput from '../../common/Input';
import { FaRegImage } from 'react-icons/fa';
import { imageUrl } from '../../../redux/api/baseApi';
import { useCompanyDetailsQuery } from '../../../redux/apiSlices/companySlice';


const AddCompaniesData = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [imgUrl, setImgUrl] = useState(null);

  // Check if id is a valid string
  const isIdValid = typeof id === 'string' && id.trim().length > 0;
  const { data: company } = useCompanyDetailsQuery(id, {
    enabled: isIdValid,
  });

  useEffect(() => {
    if (company) {
      form.setFieldsValue(company)
      setImgUrl(company?.image?.startsWith("https") ? company?.image : `${imageUrl}${company?.image}`)
    }
  }, [company, form]);

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


        <Form.Item
          name="image"
        >
          <input
            id="image"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              form.setFieldsValue({ image: file });
              const imgUrl = URL.createObjectURL(file);
              setImgUrl(imgUrl);
            }}
            style={{ display: "none" }}
          />
          <label htmlFor="image" className="p-3 cursor-pointer mb-2 flex items-center justify-center">
            <div className="flex justify-center items-center w-[120px] h-[120px] border rounded-full">
              {imgUrl ? (
                <img src={imgUrl} alt="Selected" className="h-full rounded-full w-full object-contain" />
              ) : (
                <FaRegImage size={35} />
              )}
            </div>
          </label>
        </Form.Item>

        <CustomInput name="company_name" label="Company Name" />
        <CustomInput name="company_link" label="Company Link" />
        <CustomInput name="phone" label="Phone" />
        <CustomInput name="company_type" label="Company Type" />
        <CustomInput name="employee_total" label="Total Employees" />
        <CustomInput name="employees" label="Employees" />
        <CustomInput name="sales" label="Sales" />
        <CustomInput name="district" label="District" />
        <CustomInput name="industry" label="Industry" />
        <CustomInput name="dunsNumber" label="DUNS Number" />
        <CustomInput name="country" label="Country" />
        <CustomInput name="trade" label="Trade" />

        <CustomInput name="address" label="Address" />
        <CustomInput name="headquarters" label="Headquarters" />
        <CustomInput name="decision_hq" label="Decision HQ" />
        <CustomInput name="corporate_linkage" label="Corporate Linkage" />
        <CustomInput name="business_description" label="Business Description" />
        <CustomInput name="contact" label="Contact" />
        <CustomInput name="title" label="Title" />
        <CustomInput name="company_for_contact" label="Company for Contact" />
        <CustomInput name="corporate_family" label="Corporate Family" />
        <CustomInput name="tier" label="Tier" />
        <CustomInput name="parent" label="Parent Company" />
        <CustomInput name="corporate_company_name" label="Corporate Company Name" />
        <CustomInput name="corporate_decision_hq" label="Corporate Decision HQ" />
        <CustomInput name="corporate_headquarters" label="Corporate Headquarters" />
        <CustomInput name="corporate_subsidary" label="Corporate Subsidiary" />
        <CustomInput name="corporate_branch" label="Corporate Branch" />
        <CustomInput name="corporate_is_decision_hq" label="Corporate is Decision HQ" />
        <CustomInput name="corporate_is_headquarter" label="Corporate is Headquarter" />
        <CustomInput name="corporate_ownership_type" label="Corporate Ownership Type" />
        <CustomInput name="corporate_entity_type" label="Corporate Entity Type" />
        <CustomInput name="corporate_city" label="Corporate City" />
        <CustomInput name="corporate_state" label="Corporate State" />
        <CustomInput name="corporate_country" label="Corporate Country" />
        <CustomInput name="employees_single" label="Single Employees" />
        <CustomInput name="corporate_sales" label="Corporate Sales" />
        <CustomInput name="corporate_hoovers_industry" label="Corporate Hoovers Industry" />
        <CustomInput name="corporate_key_id" label="Corporate Key ID" />
        <CustomInput name="corporate_duns_number" label="Corporate DUNS Number" />
        <CustomInput name="corporate_hoovers_contacts" label="Corporate Hoovers Contacts" />
        <CustomInput name="corporate_direct_marketing_status" label="Corporate Direct Marketing Status" />
        <CustomInput name="image" label="Image" />
        <CustomInput name="total_non_manager" label="Total Non-Manager" />
        <CustomInput name="total_manager" label="Total Manager" />
        <CustomInput name="total_c_level" label="Total C-Level" />
        <CustomInput name="total_open_contact" label="Total Open Contact" />

        <p className='font-medium text-[20px] text-primary py-4'>Contact Details</p>
        <div className='grid grid-cols-2 gap-x-10'>
          <CustomInput name="linkedin" label="LinkedIn" />
          <CustomInput name="twitter" label="Twitter" />
          <CustomInput name="facebook" label="Facebook" />
        </div>

        {/* Submit Button */}
        <Form.Item>
          <div className=' flex items-center justify-between'>
            <p className=' text-[14px] text-[#FF7C70]'>kindly  check and confirm all information . </p>
            <button type='submit' className="mt-4 h-[44px] w-[150px] rounded-md bg-primary text-white ">
              {id ? 'Update Data' : 'Add Data'}
            </button>

          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCompaniesData;