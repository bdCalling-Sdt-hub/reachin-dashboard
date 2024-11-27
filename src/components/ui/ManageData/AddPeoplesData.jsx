import React, { useEffect, useState } from 'react';
import { LuMoveLeft } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';
import { Form, Button, Input, Select } from 'antd';
import FormItem from '../../common/FormItem';
import { titleOptions } from '../../common/FilterOptions';
import { useCreateBulkPeopleMutation, useCreatePeopleMutation, usePeopleDetailsQuery, useUpdatePeopleMutation } from '../../../redux/apiSlices/peopleSlice';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import Spinner from '../../common/Spinner';
import toast from 'react-hot-toast';
import { imageUrl } from '../../../redux/api/baseApi';


const AddPeoplesData = () => {
  const [form] = Form.useForm();
  const { id } = useParams();

  // Check if id is a valid string
  const isIdValid = typeof id === 'string' && id.trim().length > 0;
  const { data: people, refetch } = usePeopleDetailsQuery(id, {
    enabled: isIdValid, // Only call the API if id is valid
  });

  const [updatePeople, { isLoading }] = useUpdatePeopleMutation();
  const [createPeople, { isLoading: createLoading }] = useCreatePeopleMutation();
  const [createBulkPeople] = useCreateBulkPeopleMutation();
  const [image, setImage] = useState();

  useEffect(() => {
    if (people) {
      form.setFieldsValue(people)
      setImage(people?.image?.startsWith("https") ? people?.image : `${imageUrl}${people?.image}`)
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
        {/* Personal Section */}
        <p className='font-medium text-[20px] text-primary py-4'>Personal</p>
        <Form.Item name="image" style={{ marginBottom: 0, padding: 0, minHeight: 0 }} />
        <div className="flex justify-center items-start w-full mb-10">
          <input
            onChange={(e) => {
              const file = e.target.files[0];
              form.setFieldsValue({ image: file });
              const imgUrl = URL.createObjectURL(file);
              setImage(imgUrl);
            }}
            type="file"
            id="img"
            className="hidden"
            style={{ display: "none" }}
          />
          <label
            htmlFor="img"
            className="relative w-[150px] h-[150px] cursor-pointer rounded-full border border-primary bg-white bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div
              className="absolute bottom-1 right-1 w-10 h-10 rounded-full border-2 border-primary bg-gray-100 flex items-center justify-center"
            >
              <MdOutlineAddPhotoAlternate size={22} className="text-primary" />
            </div>
          </label>
        </div>


        <div className='grid grid-cols-2 gap-x-10'>
          <FormItem name="name" label="Contact Name" />

          <Form.Item name="designation" label="Occupation/Title"  >
            <Select className=" rounded  h-[45px]">
              {titleOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <FormItem name="location" label="Location" />
          <FormItem name="email" label="Email" />
          <FormItem name="hqPhone" label="HQ Phone" />
          <FormItem name="lineNumber" label="Direct Line" />
          <FormItem name="mobile" label="Mobile Number" />
          <FormItem name="website" label="Website" />
        </div>
        <p className=' border-b-2 h-1 w-full border-[#cfcece] pt-0 pb-4'></p>
        {/* Company Details Section */}
        <p className='font-medium text-[20px] text-primary py-4'>Company Details</p>
        <div className='grid grid-cols-2 gap-x-10'>
          <FormItem name="companyName" label="Company Name" />
          <FormItem name="industry" label="Industry" />
          <FormItem name="totalEmployee" label="EST. Employee Count" />
          <FormItem name="revenue" label="EST. Revenue" />
          <FormItem name="location" label="Local Locations" />
          <FormItem name="hqLocation" label="HQ Locations" />
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
          <FormItem name="openContact" label="Open Contacts" />
          <FormItem name="nonManager" label="Non-Manager" />
          <FormItem name="manager" label="Manager" />
          <FormItem name="directorCount" label="Director" />
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
      </Form>
    </div>
  );
};

export default AddPeoplesData;
