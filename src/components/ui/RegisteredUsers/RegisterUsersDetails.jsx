import { Modal, Table } from 'antd';
import React from 'react';
import Title from '../../common/Title';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { FiLink, FiPhone } from 'react-icons/fi';
import { IoMailOutline } from 'react-icons/io5';
import { LuUser2 } from 'react-icons/lu';
import { RiEdit2Line, RiLinkedinFill } from 'react-icons/ri';
import { useGetSubscriptionQuery } from '../../../redux/apiSlices/userSlice';
import moment from 'moment';

const RegisterUsersDetails = ({ value, setValue }) => {
  const {data: subscription} = useGetSubscriptionQuery(value?._id);


  const usersData = [
    {
      icons: <HiOutlineBuildingOffice2 size={20} />,
      value: value?.company
    },

    {
      icons: <FiLink size={20} />,
      value: value?.website
    },
    {
      icons: <IoMailOutline size={20} />,
      value: value?.email
    },
    {
      icons: <LuUser2 size={20} />,
      value: value?.name
    },
    {
      icons: <FiPhone size={20} />,
      value: value?.contact
    },
    {
      icons: <RiLinkedinFill size={20} />,
      value: value?.linkedIn
    }
  ]

  const columns = [
    {
      title: 'Package Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (_, record)=> <p>{subscription?.price}</p>
    },
    {
      title: 'Credits',
      dataIndex: 'credit',
      key: 'credit',
    },
    {
      title: 'Purchase Date',
      dataIndex: 'currentPeriodStart',
      key: 'currentPeriodStart',
      render: (_, record)=> <p>{moment(record.currentPeriodStart).format("l")}</p>
    },
    {
      title: 'Expired Date',
      dataIndex: 'currentPeriodEnd',
      key: 'currentPeriodEnd',
      render: (_, record)=> <p>{moment(record.currentPeriodEnd).format("l")}</p>
    },
  ];


  return (
    <div>
      <Modal
        centered
        open={value}
        onCancel={() => {
          setValue(null);
        }}
        width={600}
        footer={false}
      >

        <Title className="font-medium text-[20px] mb-3"> Registered User Details</Title>

        <div>
          {
            usersData?.map((value, index) => <div key={index} className='flex items-center gap-2 border border-[#BABABA] rounded px-5 h-[45px] mb-3  text-[#999999]'>
              <p>{value?.icons}</p>
              <p>{value?.value}</p>
              <p></p>
            </div>)
          }
        </div>

        <div className=' flex items-center justify-between my-4'>
          <p className=' font-medium  text-lg '>User Package history </p>
          <button className='flex items-center gap-1 px-2 py-2 border rounded text-[#727070]'> <span> <RiEdit2Line size={18} /> </span> <span>Edit Credits</span> </button>
        </div>
        
        {
          value?.isSubscribed &&
        
          <div className='bg-[#E9F1FA] py-4 px-8 flex items-center mb-4 justify-between rounded'>
            <p className=' flex flex-col items-center gap-2'>
              <span className='text-md'> Monthly Credit Usage  </span>
              <span className='text-lg  text-primary'>{subscription?.remaining}/{subscription?.package?.credit}</span>
            </p>

            <p className=' flex flex-col items-center gap-2'>
              <span className='text-md'> Used  </span>
              <span className='text-lg  text-primary'> {subscription?.package?.credit - subscription?.remaining}</span>
            </p>

            <p className=' flex flex-col gap-2 items-center'>
              <span className='text-md'> Remaining  </span>
              <span className='text-lg  text-primary'>{subscription?.remaining} </span>
            </p>

            <p className=' flex flex-col items-center gap-2'>
              <span className='text-md'> Total  </span>
              <span className='text-lg  text-primary'>{subscription?.package?.credit}</span>
            </p>

          </div>
        }

        <Table
          dataSource={[{...subscription?.package, currentPeriodStart: subscription?.currentPeriodStart, currentPeriodEnd: subscription?.currentPeriodEnd}]}
          columns={columns}
          bordered={false}
          pagination={false}
          style={{ border: 'none' }}
        />

      </Modal>
    </div>
  );
};

export default RegisterUsersDetails;