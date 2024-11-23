import React, { useState } from 'react';
import { ConfigProvider, Pagination } from 'antd';
import Title from '../../components/common/Title';
import { useNotificationQuery, useReadNotificationMutation } from '../../redux/apiSlices/notificationSlice';
import moment from 'moment';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Notifications = () => {
    const [page, setPage] = useState(1);
    const { data: notification, refetch } = useNotificationQuery(page);
    const [readNotification] = useReadNotificationMutation();
    const handleRead = async ()=>{
        try {
            await readNotification().unwrap().then((res)=>{
                if(res.success === true ){
                    toast.success(res.message);
                    refetch();
                }
            })
        } catch (error) {
            toast.error(error?.data?.message)
        }
    }

    return (
        <div>
            <div className='flex items-center justify-between mb-4'>
                <Title className='text-[22px]'>All Notifications</Title>
                <button onClick={handleRead} className='bg-primary text-white h-10 px-4 rounded-md'>Read All</button>
            </div>

            <div className='grid grid-cols-1 gap-5 bg-white p-4 rounded-lg'>
                {
                    notification?.result?.map((notification, index) => {
                        return (
                            <Link key={index} to={`${notification?.link}`}>
                                <div className='border-b-[1px] cursor-pointer pb-2 border-[#d9d9d9] flex items-center gap-3'>
                                    <div className='w-full flex items-center justify-between'>
                                        <p>{notification?.text}</p>
                                        <p style={{ color: "gray", marginTop: "4px" }}>{moment(notification?.createdAt).endOf('day').fromNow()}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>


            <div className='flex items-center justify-center mt-6'>
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
                    <Pagination
                        current={parseInt(page)}
                        total={notification?.meta?.total}
                        onChange={(page) => setPage(page)}
                        showQuickJumper={false}
                        showSizeChanger={false}
                    />
                </ConfigProvider>
            </div>
        </div>
    )
}

export default Notifications