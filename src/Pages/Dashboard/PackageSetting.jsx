import React, { useState } from "react";
import { Tabs, Card, Button, Select } from "antd";

const { TabPane } = Tabs;
const { Option } = Select;
import SubscriptionUpdate from '../../components/ui/Subscription/SubscriptionUpdate';
import Title from '../../components/common/Title'; 

const plans = [
  {
    name: "Trial Plan",
    price: "50 USD",
    credits: "10 Credits/month",
    description: "Few for first 6 months i.e. USD 25\nPayment in advance",
  },
  {
    name: "Plus Plan",
    price: "135 USD",
    credits: "10 Credits/month",
  },
  {
    name: "Premium Plan",
    price: "200 USD",
    credits: "10 Credits/month",
  },
  {
    name: "Basic Plan",
    price: "30 USD",
    credits: "5 Credits/month",
    description: "Ideal for individuals or small teams.",
  },
  {
    name: "Pro Plan",
    price: "100 USD",
    credits: "20 Credits/month",
    description: "Best value for growing teams.",
  },
  {
    name: "Enterprise Plan",
    price: "500 USD",
    credits: "Unlimited Credits/month",
    description: "Tailored for enterprises with advanced needs.",
  },
];
 

const PackageSetting = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState();

  return (
    <div >
    <div className="flex justify-between items-center mb-4">
      <Title >Packages</Title> 
      <button className='bg-primary text-white h-10 px-4 rounded-md' onClick={()=>setOpen(true)}>+ Add Package</button>

    </div>

<div className="p-5 py-2 bg-white rounded-lg ">
    <Tabs defaultActiveKey="1">  

      {/* monthly  */}
      <TabPane tab="Monthly" key="1">
        <div className="grid grid-cols-3 gap-5">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className="shadow-md bg-[#F8F9FD] rounded-xl w-[370px] h-[330px] relative"
              style={{ textAlign: "center" }}
            > 
            <div className="flex items-center justify-center">
              <div className="text-center"> 
                <p className=" font-semibold text-[18px]">{plan?.name}</p>
                <p className="text-lg font-medium py-2 text-[#6B6B6B]">{plan.price} mo/user</p>
                <Select defaultValue="1 User" className="my-2 w-[100px] h-[40px] rounded-full bg-[#D9E8FB]" style={{ backgroundColor:""}}>
                  <Option value="1">1 User</Option>
                  <Option value="5">5 Users</Option>
                  <Option value="10">10 Users</Option>
                </Select>
                {plan.description && (
                  <p className="text-sm text-[#6B6B6B] whitespace-pre-wrap py-2 leading-6">
                    {plan.description}
                  </p>
                )}
                <p className="text-[#6B6B6B] py-3">{plan.credits}</p>
              </div>
              <div className=" mt-4 absolute bottom-4"> 
                <div className="flex items-center justify-center gap-2"> 

                <Button type="primary" icon={<i className="fas fa-edit" />}  onClick={()=>{setOpen(true) , setItems(plan)}}>
                  Edit
                </Button>
                <Button danger icon={<i className="fas fa-trash" />}>
                  Delete
                </Button>
                </div>
              </div>
            </div>
            </Card>
          ))}
        </div>
      </TabPane> 

      {/* Annually  */}
      <TabPane tab="Annually" key="2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
            <Card
              key={index}
              className="shadow-md bg-[#F8F9FD] rounded-xl w-[370px] h-[330px] relative"
              style={{ textAlign: "center" }}
            > 
            <div className="flex items-center justify-center">
              <div className="text-center"> 
                <p className=" font-semibold text-[18px]">{plan?.name}</p>
                <p className="text-lg font-medium py-2 text-[#6B6B6B]">{plan.price} mo/user</p>
                <Select defaultValue="1 User" className="my-2 w-[100px] h-[40px] rounded-full bg-[#D9E8FB]" style={{ backgroundColor:""}}>
                  <Option value="1">1 User</Option>
                  <Option value="5">5 Users</Option>
                  <Option value="10">10 Users</Option>
                </Select>
                {plan.description && (
                  <p className="text-sm text-[#6B6B6B] whitespace-pre-wrap py-2 leading-6">
                    {plan.description}
                  </p>
                )}
                <p className="text-[#6B6B6B] py-3">{plan.credits}</p>
              </div>
              <div className=" mt-4 absolute bottom-4"> 
                <div className="flex items-center justify-center gap-2"> 

                <Button type="primary" icon={<i className="fas fa-edit" />}  onClick={()=>{setOpen(true) , setItems(plan)}}>
                  Edit
                </Button>
                <Button danger icon={<i className="fas fa-trash" />}>
                  Delete
                </Button>
                </div>
              </div>
            </div>
            </Card>
          ))}
        </div>
      </TabPane>
    </Tabs>
</div> 
<SubscriptionUpdate open={open} setOpen={setOpen} items={items} />
  </div>
  );
};

export default PackageSetting;
