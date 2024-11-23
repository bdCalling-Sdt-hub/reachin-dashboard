import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useGetSubscriptionStatisticQuery } from '../../../redux/apiSlices/homeSlice';

const TotalSubscriptions = () => {
  const {data: subscriptions} = useGetSubscriptionStatisticQuery();
  return (
    <div className="grid grid-cols-12 gap-5 items-center h-[200px]  ">
      <div className=" col-span-9 w-full bg-white rounded-lg  ">
        <p className="text-base font-semibold px-4 py-4 ">Total Subscriptions Statistics</p>
        <div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart
              data={subscriptions?.months}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="subscription" stroke="#bbd4f0" fill="#bbd4f0" />
            </AreaChart>
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

        <div className=" grid grid-cols-2 items-center mt-10  ">
          <div className="flex flex-col gap-2 ">
            <p className="text-gray-600">Total Subscription</p>
            <p className="text-red-500 text-xl font-semibold">{subscriptions?.totalIncome}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-600">Daily Subscription</p>
            <p className="text-gray-900 font-semibold">{subscriptions?.todayIncome}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TotalSubscriptions;