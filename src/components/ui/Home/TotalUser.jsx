import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetUserStatisticQuery } from '../../../redux/apiSlices/homeSlice';

const TotalUser = () => {
  const {data: user} = useGetUserStatisticQuery();
  return (
    <div className="grid grid-cols-12 gap-5 items-center h-[220px] mt-16 ">
      <div className=" col-span-9 w-full bg-white rounded-lg  ">
        <p className="text-base font-semibold px-4 py-4 ">Total Users Statistics</p>
        <div style={{ height: '210px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={user?.months}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="user" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="subscription" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>



      {/* summary section  */}
      <div className="col-span-3 bg-white rounded-lg p-4 h-full ">
        <div className='flex items-center justify-between'>
          <p className="text-lg font-semibold text-[#555555]">Total Subscriptions</p>
          {/* <select className="mt-2  border rounded w-[130px] h-[45px]">
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select> */}
        </div>

        <div className=" grid grid-cols-2 gap-6 mt-4">
          <div className="flex flex-col gap-2">
            <p className="text-gray-600">Total users</p>
            <p className="text-red-500 text-xl font-semibold">{user?.totalUser}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-600">Total Daily users</p>
            <p className="text-gray-900 font-semibold">{user?.todayUser[0]?.subscribeUser ? user?.todayUser[0]?.subscribeUser : 0} </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-600">Regd. users</p>
            <p className="text-blue-500 text-xl font-semibold">40.80K</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-600">Daily Subs users</p>
            <p className="text-gray-900 font-semibold">{user?.todaySubscribeUser[0]?.subscribeUser ? user?.todaySubscribeUser[0]?.subscribeUser : 0} </p>
          </div>
        </div>
      </div>
    </div>


  );
};

export default TotalUser;