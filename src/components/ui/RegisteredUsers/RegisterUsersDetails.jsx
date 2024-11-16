import { Modal, Table } from 'antd';
import React from 'react';
import Title from '../../common/Title';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { FiLink, FiPhone } from 'react-icons/fi';
import { IoMailOutline } from 'react-icons/io5';
import { LuUser2 } from 'react-icons/lu';
import { RiEdit2Line, RiLinkedinFill } from 'react-icons/ri';

const RegisterUsersDetails = ({open ,setOpen , modalData}) => {   
    const data = [
        {
          key: '1',
          packageName: 'Basic Plan',
          price: '$10',
          credits: '100',
          date: '2024-11-15',
        },
        {
          key: '2',
          packageName: 'Pro Plan',
          price: '$20',
          credits: '200',
          date: '2024-11-16',
        },
        {
          key: '3',
          packageName: 'Premium Plan',
          price: '$30',
          credits: '300',
          date: '2024-11-17',
        },
      ];
      

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

    const columns = [
        {
          title: 'Package Name',
          dataIndex: 'packageName',
          key: 'packageName',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Credits',
          dataIndex: 'credits',
          key: 'credits',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
      ]; 


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

       <Title className="font-medium text-[20px] mb-3"> Registered User Details</Title> 

       <div> 
 {
    usersData?.map((value , index ) =><div key={index} className='flex items-center gap-2 border border-[#BABABA] rounded px-5 h-[45px] mb-3  text-[#999999]'> 
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
        
        <div className='bg-[#E9F1FA] py-4 px-8 flex items-center mb-4 justify-between rounded'>
            <p className=' flex flex-col items-center gap-2'> 
                <span className='text-md'> Monthly Credit Usage  </span> 
                <span className='text-lg  text-primary'>999/1000 </span>
            </p>
    
            <p className=' flex flex-col items-center gap-2'> 
                <span className='text-md'> Used  </span> 
                <span className='text-lg  text-primary'>5000 </span>
            </p>
    
            <p className=' flex flex-col gap-2 items-center'> 
                <span className='text-md'> Remaining  </span> 
                <span className='text-lg  text-primary'>1</span>
            </p>
    
            <p className=' flex flex-col items-center gap-2'> 
                <span className='text-md'> Total  </span> 
                <span className='text-lg  text-primary'>5000 </span>
            </p>
    
        </div> 

        <Table
      dataSource={data}
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