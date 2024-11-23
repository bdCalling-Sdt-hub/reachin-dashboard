import React, { useEffect, useState } from 'react';
import Title from '../../components/common/Title';
import { ConfigProvider, Input, Select, Table } from 'antd';
import { FiEye } from 'react-icons/fi';
import SubscriptionEarningDetails from '../../components/ui/SubscriptionEarningDetails/SubscriptionEarningDetails';
import { useCompanySubscriptionDetailsQuery, useGetSubscriptionsQuery } from '../../redux/apiSlices/subscriptionSlice';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

const SubscriptionEarning = () => {

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1);
  const [value, setValue] = useState(null);
  const [paymentType, setPaymentType] = useState("")
  const { data: subscription } = useGetSubscriptionsQuery({ search, page, paymentType });
  const itemsPerPage = 10;

  const id = new URLSearchParams(useLocation().search).get("id");
  const { data: details } = useCompanySubscriptionDetailsQuery(id);

  useEffect(() => {
    if (details?._id && details?.email) {
      setValue(details);
    }
  }, [details])


  const columns = [
    {
      title: "S.No.",
      dataIndex: "name",
      key: "name",
      render: (_, record, index) => <p>{((page - 1) * itemsPerPage) + index + 1}</p>
    },
    {
      title: "User Name",
      dataIndex: "user.name",
      key: "user.name",
      render: (_, record, index) => <p>{record?.user?.name}</p>
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record, index) => <p>{record?.user?.email}</p>
    },
    {
      title: "Package Type",
      dataIndex: "packageType",
      key: "packageType",
      render: (_, record, index) => <p>{record?.package?.paymentType}</p>
    },
    {
      title: "Subscriptions Name",
      dataIndex: "subscriptionName",
      key: "subscriptionName",
      render: (_, record, index) => <p>{record?.package?.title}</p>
    },
    {
      title: "Purchase Date",
      dataIndex: "currentPeriodStart",
      key: "currentPeriodStart",
      render: (_, record, index) => <p>{moment(record?.currentPeriodStart).format("l")}</p>
    },
    {
      title: "Expired Date",
      dataIndex: "currentPeriodEnd",
      key: "currentPeriodEnd",
      render: (_, record, index) => <p>{moment(record?.currentPeriodEnd).format("l")}</p>
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",

    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) =>
        <p
          className='h-[30px] w-[50px]  bg-[#F9F9F9] rounded flex items-center justify-center'
          onClick={() => setValue(record)}
        >
          <FiEye size={20} color='#2375D0' className={"cursor-pointer"} />
        </p>
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
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            onChange={(e) => setPaymentType(e)}
            placeholder="Filter By Payment Type"
            style={{
              width: 210,
              height: 40,
              outline: "none",
              boxShadow: "none"
            }}
          >
            <Select.Option value="">All</Select.Option>
            <Select.Option value="Monthly">Monthly</Select.Option>
            <Select.Option value="Yearly">Yearly</Select.Option>
          </Select>

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
          token: {
            colorPrimary: "white"
          }
        }}
      >
        <Table
          columns={columns}
          dataSource={subscription?.data}
          pagination={{
            current: parseInt(page),
            onChange: (page) => setPage(page),
            total: subscription?.meta?.total
          }}
        />
      </ConfigProvider>
      <SubscriptionEarningDetails value={value} setValue={setValue} />
    </div>
  );
};

export default SubscriptionEarning;