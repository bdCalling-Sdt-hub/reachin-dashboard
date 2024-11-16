import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 10 },
  { name: 'Mar', value: 15 },
  { name: 'Apr', value: 25 },
  { name: 'May', value: 20 },
  { name: 'Jun', value: 10 },
  { name: 'Jul', value: 15 },
  { name: 'Aug', value: 25 },
  { name: 'Sep', value: 30 },
  { name: 'Oct', value: 20 },
  { name: 'Nov', value: 10 },
  { name: 'Dec', value: 5 },
];

const TotalSubscriptions = () => {
    return (
        <div className="grid grid-cols-12 gap-5 items-center h-[200px]  ">  
        <div className=" col-span-9 w-full bg-white rounded-lg  "> 
                    <p className="text-base font-semibold px-4 py-4 ">Total Subscriptions Statistics</p>  
                    <div>
        <ResponsiveContainer width="100%" height={190}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#bbd4f0" fill="#bbd4f0" />
          </AreaChart>
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
        
        <div className=" grid grid-cols-2 items-center mt-10  ">
            <div className="flex flex-col gap-2 ">
                <p className="text-gray-600">Total Searching</p>
                <p className="text-red-500 text-xl font-semibold">200.10K</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-gray-600">Daily Searching</p>
                <p className="text-gray-900 font-semibold">200</p>
            </div>
   
        </div>
    </div>
            </div>
    );
};

export default TotalSubscriptions;