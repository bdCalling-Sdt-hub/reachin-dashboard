import React, { useEffect, useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import {  Form, Input } from "antd";
import { useUser } from '../../../provider/User';
import { useProfileQuery, useUpdateProfileMutation } from '../../../redux/apiSlices/authSlice';
import toast from 'react-hot-toast';
import { imageUrl } from '../../../redux/api/baseApi';
import Spinner from '../../../components/common/Spinner';

const UserProfile = () => {
    const [form] = Form.useForm();
    const { user } = useUser();
    const [image, setImage] = useState();
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const { refetch } = useProfileQuery();

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
            setImage(user?.profile?.startsWith("https") ? user?.profile : `${imageUrl}${user?.profile}`)
        }
    }, [user, form]);

    const handleSubmit = async (values) => {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        try {
            await updateProfile(formData).unwrap()
            .then(result => {
                if (result.success === true) {
                    toast.success(result.message);
                    refetch();
                }
            });
        } catch (error) {
            toast.error(error.data.message);
        }
    };
    

    return (
        <div className="lg:grid lg:grid-rows-2 gap-y-0">
            {/* Profile Image */}
            <div className="flex justify-center">
                <input
                    onChange={(e) => {
                        const file = e.target.files[0];
                        form.setFieldsValue({ image: file });
                        const imgUrl = URL.createObjectURL(file);
                        setImage(imgUrl);
                    }}
                    type="file"
                    id="img"
                    className="hidden"
                />
                <label
                    htmlFor="img"
                    className="relative w-48 h-48 cursor-pointer rounded-full border border-primary bg-white bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <div
                        className="absolute bottom-1 right-1 w-12 h-12 rounded-full border-2 border-primary bg-gray-100 flex items-center justify-center"
                    >
                        <MdOutlineAddPhotoAlternate size={22} className="text-primary" />
                    </div>
                </label>
            </div>

            {/* Form */}
            <div className="flex justify-center items-center">
                <Form
                    name="normal_login"
                    layout="vertical"
                    className="w-3/4"
                    onFinish={handleSubmit}
                    form={form}
                >
                    <Form.Item name="image"></Form.Item>

                    <div className="grid lg:grid-cols-2 gap-x-8 gap-y-7">
                        <Form.Item
                            name="name"
                            label={<p className="block">Full Name</p>}
                            className="mb-0"
                        >
                            <Input
                                placeholder="Enter Your Full Name"
                                className="border border-gray-300 h-[45px] bg-white rounded-lg"
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label={<p className="block">Email</p>}
                            className="mb-0"
                        >
                            <Input
                                type="text"
                                placeholder="Enter Email"
                                className="border border-gray-300 h-[45px] bg-white rounded-lg"
                            />
                        </Form.Item>

                        <Form.Item
                            name="contact"
                            label={<p>Contact Number</p>}
                            className="mb-0"
                        >
                            <Input
                                type="text"
                                placeholder="Enter Phone Number"
                                className="border border-gray-300 h-[45px] bg-white rounded-lg"
                            />
                        </Form.Item>

                        <Form.Item
                            name="location"
                            label={<p className="block">Location</p>}
                            className="mb-0"
                        >
                            <Input
                                placeholder="Enter Location"
                                className="border border-gray-300 h-[45px] bg-white rounded-lg"
                            />
                        </Form.Item>
                    </div>

                    <div className="text-end mt-6">
                        <Form.Item>
                            <button
                                type="submit"
                                className="bg-primary text-white w-36 h-[45px] rounded-lg"
                            >
                                {isLoading ? < Spinner /> : "Update"}
                            </button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default UserProfile;
