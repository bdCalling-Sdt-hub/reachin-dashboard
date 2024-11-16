import React from 'react';
import { Outlet } from 'react-router-dom';

const Auth = () => {
    return (
        <div
        className="w-full h-[100vh] "
    >
 
 <div className=' w-full ps-[61px] pt-[14px]'> 
    <img src="/logo.svg" alt="" className='w-[140px] h-[66px]' />
 </div> 
 
 <div className='h-[calc(100vh-80px)]'>

            <Outlet />
 </div>

    </div>
    
    );
};

export default Auth;
