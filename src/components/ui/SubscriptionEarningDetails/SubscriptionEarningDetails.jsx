import React from 'react';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { FiLink, FiPhone } from 'react-icons/fi';
import { IoMailOutline } from 'react-icons/io5';
import { LuUser2 } from 'react-icons/lu';
import {  RiLinkedinFill } from 'react-icons/ri'; 
import { Modal } from 'antd';
import Title from '../../common/Title';

const SubscriptionEarningDetails = ({setOpen , packageData , open}) => { 
    const modalData ={
        userName: "John Doe",
        link: "https://example.com/johndoe",
        phone: "12574541274",
        companyName: "TechCorp",
        email: "john.doe@example.com",
        linkedInLink: "https://linkedin.com/in/johndoe",
    } 
     
 const packageDatas = [
    {
        value:"Trial Plan"
            } ,  
        
            {
        value:"50 USD mo/user"
            } , 
            {
      
        value:"1 User"
            } , 
            {  
        value:"10 Credits/month"
            } , 
            { 
        value:"(Few for first 6 months ie. USD 25)  Payment in advance"
            } , 
            {
        value:"Buying Date: 10 jan, 2024"
            } , 
 ]

  const  usersData = [ 
    {
icons: <HiOutlineBuildingOffice2 size={20} /> ,
value:modalData?.companyName
    } ,  

    {
icons: <FiLink size={20} /> ,
value:modalData?.link
    } , 
    {
icons: <IoMailOutline size={20} /> ,
value:modalData?.email
    } , 
    {
icons: <LuUser2 size={20} /> ,
value:modalData?.userName
    } , 
    {
icons: <FiPhone size={20} /> ,
value:modalData?.phone
    } , 
    {
icons: <RiLinkedinFill size={20} /> ,
value:modalData?.companyName
    } , 

]  
    return (
        <div>
        <Modal     
            centered
            open={open}
            onCancel={() => {
                setOpen(false);
            }}
            width={600}
            footer={false}
        >
    
            <Title className="font-medium text-[20px] mb-3"> Subscription Earning Details</Title> 

            <div>
            {
                    packageDatas?.map((value, index) => <div key={index} className=' border border-[#BABABA] rounded px-5 h-[45px] mb-3  text-[#999999] flex items-center'>
                        <p>{value?.value}</p>
                       
                    </div>)
                }
            </div>
    <p className='text-lg py-3'>User Information</p>
            <div>
                {
                    usersData?.map((value, index) => <div key={index} className='flex items-center gap-2 border border-[#BABABA] rounded px-5 h-[45px] mb-3  text-[#999999]'>
                        <p>{value?.icons}</p>
                        <p>{value?.value}</p>
                        <p></p>
                    </div>)
                }
            </div>
    
    
        </Modal>
    </div>
    );
};

export default SubscriptionEarningDetails;