import React from "react";
import { FaChartGantt, FaUserGroup } from "react-icons/fa6";
import { MdOutlineAttachMoney, MdOutlineSubscriptions } from "react-icons/md";
import UserChart from "../../components/ui/Home/UserChart";
import RevenueChart from "../../components/ui/Home/TotalSearching";
import TotalSubscriptions from "../../components/ui/Home/TotalSubscriptions";
import TotalUser from "../../components/ui/Home/TotalUser";
import TotalSearching from "../../components/ui/Home/TotalSearching";




const Home = ()=>{  

    return (
        <div>

<TotalSubscriptions />
        
<div className="mt-10">
     <TotalUser />
</div>

<div className="mt-10">
    <TotalSearching />
</div>

         
     
        </div>
    );
}

export default Home;