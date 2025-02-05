import React from 'react';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { FiLink, FiPhone } from 'react-icons/fi';
import { IoMailOutline } from 'react-icons/io5';
import { LuUser } from 'react-icons/lu';
import { RiLinkedinFill } from 'react-icons/ri';
import { Modal } from 'antd';
import Title from '../../common/Title';
import moment from 'moment';

const SubscriptionEarningDetails = ({ value, setValue }) => {

    const packageDatas = [
        {
            value: value?.package?.title
        },

        {
            value: value?.price
        },
        {

            value: "1 User"
        },
        {
            value: value?.package?.credit + "/" + value?.package?.paymentType
        },
        {
            value: value?.package?.description
        },
        {
            value: moment(value?.currentPeriodStart).format("l")
        },
    ]

    const usersData = [
        {
            icons: <HiOutlineBuildingOffice2 size={20} />,
            value: value?.user?.company
        },

        {
            icons: <FiLink size={20} />,
            value: value?.user?.website
        },
        {
            icons: <IoMailOutline size={20} />,
            value: value?.user?.email
        },
        {
            icons: <LuUser size={20} />,
            value: value?.user?.name
        },
        {
            icons: <FiPhone size={20} />,
            value: value?.user?.contact
        },
        {
            icons: <RiLinkedinFill size={20} />,
            value: value?.user?.linkedIn
        }
    ]
    
    return (
        <div>
            <Modal
                centered
                open={value}
                onCancel={() => {
                    setValue(false);
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