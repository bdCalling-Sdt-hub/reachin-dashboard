import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', totalUsers: 10000, regdUsers: 4000 },
  { name: 'Feb', totalUsers: 20000, regdUsers: 8000 },
  { name: 'Mar', totalUsers: 30000, regdUsers: 12000 },
  { name: 'Apr', totalUsers: 50000, regdUsers: 20000 },
  { name: 'May', totalUsers: 60000, regdUsers: 25000 },
  { name: 'Jun', totalUsers: 50000, regdUsers: 22000 },
  { name: 'Jul', totalUsers: 70000, regdUsers: 30000 },
  { name: 'Aug', totalUsers: 80000, regdUsers: 35000 },
  { name: 'Sep', totalUsers: 85000, regdUsers: 40000 },
  { name: 'Oct', totalUsers: 75000, regdUsers: 30000 },
  { name: 'Nov', totalUsers: 50000, regdUsers: 20000 },
  { name: 'Dec', totalUsers: 30000, regdUsers: 15000 },
];
 
const TotalUser = () => {
    return (
      <div className="grid grid-cols-12 gap-5 items-center h-[220px] mt-16 ">  
        <div className=" col-span-9 w-full bg-white rounded-lg  "> 
                    <p className="text-base font-semibold px-4 py-4 ">Total Users Statistics</p>  
                    <div style={{ height: '210px' }}>
  <ResponsiveContainer width="100%" height="100%">
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="totalUsers" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="regdUsers" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
</div>
                    </div> 
         


         {/* summary section  */}
                    <div className="col-span-3 bg-white rounded-lg p-4 h-full ">
        <div className='flex items-center justify-between'>
            <p className="text-lg font-semibold text-[#555555]">Total Subscriptions</p>
            <select className="mt-2  border rounded w-[130px] h-[45px]">
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
            </select>
        </div>
        
        <div className=" grid grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col gap-2">
                <p className="text-gray-600">Total users</p>
                <p className="text-red-500 text-xl font-semibold">200.10K</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-gray-600">Total Daily users</p>
                <p className="text-gray-900 font-semibold">200</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-gray-600">Regd. users</p>
                <p className="text-blue-500 text-xl font-semibold">40.80K</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-gray-600">Daily Regd. users</p>
                <p className="text-gray-900 font-semibold">41</p>
            </div>
        </div>
    </div>
            </div> 

     
    );
};

export default TotalUser;