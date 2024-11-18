import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {  TbPackages, TbUserScreen } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { PiUserPlus, PiUsers } from 'react-icons/pi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { GoDatabase } from 'react-icons/go';


const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname; 
    const [selectedKey, setSelectedKey] = useState("");
    const [openKeys, setOpenKeys] = useState([]);
    const navigate = useNavigate();


    const handleLogout=()=>{
        localStorage.removeItem("token")
        navigate("/auth/login")
    }

    const menuItems = [
        {
            key: "/",
            icon: <LuLayoutDashboard size={24} />,
            label: <Link to="/" className='' >Dashboard</Link>
        },
        {
            key: "/registered-users",
            icon: <PiUsers  size={24} />,
            label: <Link to="/registered-users">Registered Users</Link>
        },
         {
            key: "/subscription-earning",
            icon: <TbUserScreen size={24} />,
            label: <Link to="/subscription-earning">Subscription Earning</Link>
        },  
        {
            key: "manageData",
            icon: <GoDatabase size={24} />,
            label: "Manage Data",
            children: [
             
                { 
                    key: "/peoples-data", 
                    label: <Link to="/peoples-data" className="text-[#6B6B6B] hover:text-white">Peoples Data</Link>
                },
                { 
                    key: "/companies-data", 
                    label: <Link to="/companies-data" className="text-white hover:text-white">Companies Data</Link>
                },
            ]
        }, 
        {
            key: "/package-setting",
            icon: <TbPackages size={24} />,
            label: <Link to="/package-setting">Package Setting</Link>
        },  
        {
            key: "subMenuSetting",
            icon: <IoSettingsOutline size={24} />,
            label: "Settings",
            children: [
             
                { 
                    key: "/blogs", 
                    label: <Link to="/blogs" className="text-[#6B6B6B] hover:text-white">Blogs</Link>
                },
                { 
                    key: "/about-us", 
                    label: <Link to="/about-us" className="text-[#6B6B6B] hover:text-white">Our Stories</Link>
                },
                { 
                    key: "/terms-and-conditions", 
                    label: <Link to="/terms-and-conditions" className="text-white hover:text-white">Terms of Use</Link>
                },
                { 
                    key: "/license-terms", 
                    label: <Link to="/license-terms" className="text-white hover:text-white">Terms of License</Link>
                }, 
                {
                    key: "/faq",
                    label: <Link to="/faq" >FAQ</Link>
                }, 
             
            ]
        },

         {
            key: "/admin",
            icon: <PiUserPlus size={24} />,
            label: <Link to="/admin">Make Admin</Link>
        }, 
        {
            key: "/notification",
            icon: <IoNotificationsOutline  size={24} />,
            label: <Link to="/notification" >Notification</Link>
        },

      
      
        {
            key: "/logout",
            icon: <IoIosLogOut size={24} />,
            label: <p onClick={handleLogout}>LogOut</p>
        },
    ];

    useEffect(() => {
        const selectedItem = menuItems.find(item => 
            item.key === path || item.children?.some(sub => sub.key === path)
        );

        if (selectedItem) {
            setSelectedKey(path);

            if (selectedItem.children) {
                setOpenKeys([selectedItem.key]);
            } else {
                const parentItem = menuItems.find(item => 
                    item.children?.some(sub => sub.key === path)
                );
                if (parentItem) {
                    setOpenKeys([parentItem.key]);
                }
            }
        }
    }, [path]);

    const handleOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    return (
        <div className='mt-5'>
            <Link to={"/"} className=' flex items-center justify-center py-4'>
 <img src="/logo.svg" alt="" />
            </Link>
            <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
                style={{ borderRightColor: "transparent", background: "transparent"  }}
                items={menuItems} 
           
            />
        </div>
    )
}

export default Sidebar;
