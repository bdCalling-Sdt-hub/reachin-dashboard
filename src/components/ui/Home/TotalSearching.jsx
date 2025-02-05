import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useGetSearchStatisticQuery } from '../../../redux/apiSlices/homeSlice';

const data = [
  { name: 'Jan', value: 10 },
  { name: 'Feb', value: 8 },
  { name: 'Mar', value: 16 },
  { name: 'Apr', value: 25 },
  { name: 'May', value: 25 },
  { name: 'Jun', value: 10 },
  { name: 'Jul', value: 18 },
  { name: 'Aug', value: 27 },
  { name: 'Sep', value: 32 },
  { name: 'Oct', value: 20 },
  { name: 'Nov', value: 10 },
  { name: 'Dec', value: 5 },
];

const TotalSearching = () => {
  const {data: searching} = useGetSearchStatisticQuery();
  console.log(searching)

  return (
    <div className="grid grid-cols-12 gap-5 items-center h-[200px] mt-16 ">
      <div className=" col-span-9 w-full bg-white rounded-lg  ">
        <p className="text-base font-semibold px-4 py-4 ">Total Searching Statistics</p>
        <div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart
              data={searching?.visitorsArray}
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
              <Bar dataKey="total" fill="#2375D0" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>



      {/* summary section  */}
      <div className="col-span-3 bg-white rounded-lg p-4 h-full ">
        <p className="text-lg font-semibold text-[#555555]">Total Searching</p>

        <div className=" grid grid-cols-2 items-center mt-10  ">
          <div className="flex flex-col gap-2 ">
            <p className="text-gray-600">Total Searching</p>
            <p className="text-red-500 text-xl font-semibold">{searching?.totalSearching} </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-600">Daily Searching</p>
            <p className="text-gray-900 font-semibold">{searching?.dailySearching}</p>
          </div>

        </div>
      </div>
    </div>

  );
};

export default TotalSearching;
