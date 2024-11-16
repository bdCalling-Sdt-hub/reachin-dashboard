import { ConfigProvider, Tabs } from 'antd';
import React from 'react';
import UserProfile from './UserProfile';
import ChangePassword from './ChangePassword';
import Title from '../../../components/common/Title';

const AdminProfile = () => {

  const items = [
    {
      key: "1",
      label: "Edit Profile",
      children: <UserProfile />,
    },
    {
      key: "2",
      label: "Change Password ",
      children: <ChangePassword />,
    },
  ];

  return (
    <div>
 <Title className="mb-4">Profile</Title>
      <div

        className=" bg-white p-5 px-10 rounded-xl "
      >
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                itemActiveColor: "#2375D0",
                itemSelectedColor: "#2375D0",
                inkBarColor: "#2375D0",
                itemHoverColor: "#2375D0"
              },
            },
          }}
        >

          <Tabs defaultActiveKey="1" items={items} />
        </ConfigProvider>
      </div>

    </div>
  );
};

export default AdminProfile;