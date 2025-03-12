import React, { useEffect, useState } from 'react';
import { LuMoveLeft } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';
import { Form, Select } from 'antd';
import { useCreateBulkPeopleMutation, useCreatePeopleMutation, usePeopleDetailsQuery, useUpdatePeopleMutation } from '../../../redux/apiSlices/peopleSlice';
import Spinner from '../../common/Spinner';
import toast from 'react-hot-toast';
import { imageUrl } from '../../../redux/api/baseApi';
import CustomInput from '../../common/Input';
import { FaRegImage } from 'react-icons/fa';
import {
  employeeRanges,
  primaryIndustries,
  regions,
  revenueRanges,
  seniorityLevels,
  sources,
  subIndustries,
  titleOptions,
} from '../../../components/common/FilterOptions';


const AddPeoplesData = () => {
  const [form] = Form.useForm();
  const { id } = useParams();

  // Check if id is a valid string
  const isIdValid = typeof id === 'string' && id.trim().length > 0;
  const { data: people, refetch } = usePeopleDetailsQuery(id, {
    enabled: isIdValid,
  });

  const [updatePeople, { isLoading }] = useUpdatePeopleMutation();
  const [createPeople, { isLoading: createLoading }] = useCreatePeopleMutation();
  const [createBulkPeople] = useCreateBulkPeopleMutation();
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    if (people) {
      form.setFieldsValue(people)
      setImgUrl(people?.image?.startsWith("https") ? people?.image : `${imageUrl}${people?.image}`)
    }
  }, [people, form]);


  const uploadCsvFile = async (csv) => {
    const formData = new FormData();
    if (csv) formData.append("csv", csv);
    try {
      await createBulkPeople(formData).unwrap().then(({ success, message }) => {
        if (success === true) {
          toast.success(message);
          refetch()
        }

      })
    } catch (error) {
      if (error.data?.errorMessages && Array.isArray(error.data.errorMessages)) {
        error.data.errorMessages.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error(error.data?.message || "An error occurred");
      }
    }
  }


  // Form submission handler
  const onFinish = async (values) => {

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key])
    })

    if (people?._id && people?.email) {
      try {
        await updatePeople({ id, updatedData: formData }).unwrap().then(({ success, message }) => {
          if (success === true) {
            toast.success(message);
            refetch()
          }

        })
      } catch ({ message }) {
        toast.error(message || "Something Wrong");
      }
    } else {
      try {
        await createPeople(formData).unwrap().then(({ success, message }) => {
          if (success === true) {
            toast.success(message);
            refetch()
          }

        })
      } catch ({ message }) {
        toast.error(message || "Something Wrong");
      }
    }
  };

  return (
    <div className='bg-white p-5 rounded-lg'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <Link to="/peoples-data">
            <LuMoveLeft size={24} />
          </Link>
          <p className='font-medium text-[24px] text-primary'>
            {id ? "Edit People Data" : "Add People Data"}
          </p>
        </div>

        <input
          onChange={(e) => {
            const file = e.target.files[0];
            uploadCsvFile(file);
          }}
          type="file"
          id="csv"
          className="hidden"
          style={{ display: "none" }}
        />
        <label
          htmlFor="csv"
          className='w-[163px] cursor-pointer h-[44px] flex items-center justify-center border border-primary text-primary rounded shadow-sm'
        >
          Upload CSV File
        </label>
      </div>

      {/* Form */}
      <Form layout='vertical' form={form} onFinish={onFinish}>

        <p className='font-medium text-[20px] text-primary py-4'>Personal Details</p>

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
        <div className='grid grid-cols-2 gap-x-10'>

          <CustomInput name="first_name" label="First Name" />
          <CustomInput name="middle_name" label="Middle Name" />
          <CustomInput name="last_name" label="Last Name" />
          <CustomInput name="salutation" label="Salutation" />
          <CustomInput name="suffix" label="Suffix" />

          <Form.Item
            name="title"
            label={<p className='text-[15px] text-[#636363]'>Title</p>}
          >
            <Select
              placeholder={`Pick Title`}
              style={{
                height: 45,
                outline: "none",
                boxShadow: "none"
              }}
              name="title"
            >

              {titleOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {/* <CustomInput name="title" label="Title" /> */}
          <CustomInput name="email" label="Email" />
          <CustomInput name="function" label="Function" />
          <CustomInput name="phone" label="Phone" />
          <CustomInput name="mobile" label="Mobile" />
          <Form.Item
            name="country"
            label={<p className='text-[15px] text-[#636363]'>Country</p>}
          >
            <Select
              placeholder={`Pick Country`}
              style={{
                height: 45,
                outline: "none",
                boxShadow: "none"
              }}
              name="country"
            >

              {regions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {/* <CustomInput name="country" label="Country" /> */}
          <CustomInput name="city" label="City" />
          <CustomInput name="state" label="State" />
          <CustomInput name="zip_code" label="ZIP Code" />
        </div>

        <p className='font-medium text-[20px] text-primary py-4'>Company Details</p>
        <div className='grid grid-cols-2 gap-x-10'>
          <CustomInput name="company_name" label="Company Name" />
          <CustomInput name="zoom_company_id" label="Zoom Company ID" />
          <CustomInput name="company_linkedin" label="Company LinkedIn" />
          <CustomInput name="company_facebook" label="Company Facebook" />
          <CustomInput name="company_twitter" label="Company Twitter" />
          <CustomInput name="company_overview" label="Company Overview" />
          <CustomInput name="company_country" label="Company Country" />
          <CustomInput name="company_city" label="Company City" />
          <CustomInput name="company_state" label="Company State" />
          <CustomInput name="company_zip_Code" label="Company ZIP Code" />
          <CustomInput name="attribute1" label="Attribute 1" />
          <CustomInput name="attribute2" label="Attribute 2" />
          <CustomInput name="supplement_email" label="Supplement Email" />

          <Form.Item
            name="industry"
            label={<p className='text-[15px] text-[#636363]'>Industry</p>}
          >
            <Select
              placeholder={`Pick Industry`}
              style={{
                height: 45,
                outline: "none",
                boxShadow: "none"
              }}
              name="industry"
            >

              {primaryIndustries.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="sub_industry"
            label={<p className='text-[15px] text-[#636363]'>Sub Industry</p>}
          >
            <Select
              placeholder={`Pick Industry`}
              style={{
                height: 45,
                outline: "none",
                boxShadow: "none"
              }}
              name="sub_industry"
            >

              {subIndustries.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>


          {/* <CustomInput name="industry" label="Industry" /> */}
          {/* <CustomInput name="sub_industry" label="Sub-Industry" /> */}
          {/* <CustomInput name="employee_count" label="Employee Count" /> */}

          <Form.Item
            name="Employee Count"
            label={<p className='text-[15px] text-[#636363]'>Employee Count</p>}
          >
            <Select
              placeholder={`Pick Employee Count`}
              style={{
                height: 45,
                outline: "none",
                boxShadow: "none"
              }}
              name="employee_count"
            >

              {employeeRanges.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>




          <Form.Item
            name="source"
            label={<p className='text-[15px] text-[#636363]'>Sources</p>}
          >
            <Select
              placeholder={`Pick Sources`}
              style={{
                height: 45,
                outline: "none",
                boxShadow: "none"
              }}
              name="source"
            >

              {sources.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* <CustomInput name="source" label="Source" /> */}
          <CustomInput name="accuracy_score" label="Accuracy Score" />
          <CustomInput name="zoom_info_company_profile" label="Zoom Info Company Profile" />
          <CustomInput name="zoom_info_contact" label="Zoom Info Contact" />
          <CustomInput name="website" label="Website" />
          <Form.Item
            name="Revenue"
            label={<p className='text-[15px] text-[#636363]'>Revenue</p>}
          >
            <Select
              placeholder={`Pick Revenue`}
              style={{
                height: 45,
                outline: "none",
                boxShadow: "none"
              }}
            >
              <Select.Option value="1">Option 1</Select.Option>
              <Select.Option value="2">Option 2</Select.Option>
              <Select.Option value="3">Option 3</Select.Option>
            </Select>
          </Form.Item>
          {/* <CustomInput name="revenue" label="Revenue" /> */}
          <CustomInput name="revenue_range" label="Revenue Range" />
          <CustomInput name="linkedin" label="LinkedIn" />
          <CustomInput name="zoom_contact_info" label="Zoom Contact Info" />
          <CustomInput name="hq_phone" label="HQ Phone" />
        </div>

        <p className='font-medium text-[20px] text-primary py-4'>Management Level</p>
        <div className='grid grid-cols-2 gap-x-10'>

        <Form.Item
            name="seniority"
            label={<p className='text-[15px] text-[#636363]'>Seniority</p>}
          >
            <Select
              placeholder={`Pick Seniority`}
              style={{
                height: 45,
                outline: "none",
                boxShadow: "none"
              }}
              name="seniority"
            >

              {seniorityLevels.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* <CustomInput name="seniority" label="Seniority" /> */}
          <CustomInput name="ownership" label="Ownership" />
          <CustomInput name="business_model" label="Business Model" />
          <CustomInput name="hq_location" label="HQ Location" />
          <CustomInput name="open_contact" label="Open Contact" />
          <CustomInput name="non_manager" label="Non-Manager" />
          <CustomInput name="manager" label="Manager" />
          <CustomInput name="director" label="Director" />
          <CustomInput name="c_level" label="C-Level" />
        </div>


        {/* Submit Button */}
        <Form.Item>
          <div className=' flex items-center justify-between'>
            <p className=' text-[14px] text-[#FF7C70]'>kindly  check and confirm all information . </p>
            <button type='submit' className="mt-4 flex items-center justify-center h-[44px] w-[150px] rounded-md bg-primary text-white ">
              {
                isLoading || createLoading ? <Spinner /> : "Add Data"
              }
            </button>

          </div>
        </Form.Item>
      </Form >
    </div >
  );
};

export default AddPeoplesData;
