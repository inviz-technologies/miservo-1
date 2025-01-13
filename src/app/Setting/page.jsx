"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "@root/src/components/Navbar/page";
import Icon from "@root/src/components/Icon";
import CustomTextField from "@root/src/components/CustomTextField";
import Loader from "@root/src/components/Loader";
import { pencil } from "@root/icons";
import { GET } from "@root/src/lib/jax";







const GeneralComp = () => {
  return (
    <div className="">
      <div className="flex justify-between py-3">
        <h2 className="text-2xl font-bold">General Overview</h2>
        <Link href="/" className="flex gap-2 py-3">
          Edit Details <Icon src={pencil} className="w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-3">
          <CustomTextField
            label="First Name"
            placeholder="Francisco"
            classs="!bg-gray-200"
          />
        </div>
        <div className="col-span-3">
          <CustomTextField
            label="Last Name"
            placeholder="Javier"
            classs="!bg-gray-200"
          />
        </div>
        <div className="col-span-3">
          <CustomTextField
            label="Phone"
            placeholder="+123-746-7890"
            classs="!bg-gray-200"
          />
        </div>
        <div className="col-span-3">
          <CustomTextField
            label="Phone"
            placeholder="+123-746-7890"
            classs="!bg-gray-200"
          />
        </div>
        <div className="col-span-3">
          <CustomTextField
            label="Birthday"
            placeholder="12-12-2020"
            classs="!bg-gray-200"
          />
        </div>
        <div className="col-span-3">
          <CustomTextField
            label="Gender"
            placeholder="male"
            classs="!bg-gray-200"
          />
        </div>
        <div className="col-span-2">
          <CustomTextField
            label="City"
            placeholder="USA"
            classs="!bg-gray-200"
          />
        </div>
        <div className="col-span-2">
          <CustomTextField
            label="State"
            placeholder="12345"
            classs="!bg-gray-200"
          />
        </div>
        <div className="col-span-2">
          <CustomTextField
            label="Zip"
            placeholder="12345"
            classs="!bg-gray-200"
          />
        </div>
        <div className="col-span-3">
          <CustomTextField
            label="Martial Status"
            placeholder="Single"
            classs="!bg-gray-200"
          />
        </div>
        <div className="col-span-10">
          <CustomTextField
            label="Address"
            placeholder="xyz Street"
            classs="!bg-gray-200"
          />
        </div>
        <div className="col-span-10">
          <CustomTextField
            label="Address#2"
            placeholder="xyz Street"
            classs="!bg-gray-200"
          />
        </div>
      </div>
    </div>
  )
}

const CheckIn = () => {
  const [dropDownData, setDropDownData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAssignedTo, setSelectedAssignedTo] = useState("");
  const [checkInDuration, setCheckInDuration] = useState("");

  const savedData =
    typeof window !== "undefined"
      ? window.localStorage.getItem("loginData")
      : false;
  const converSaveData = JSON.parse(savedData);
  const token = converSaveData?.data?.token;
  const ID = converSaveData?.data?._id;

  useEffect(() => {
    GET("assigned-to", token, setDropDownData, setLoading, setError);
  }, [token]);

  // Update user function
  const updateUser = async (ID, updatedData) => {
    try {
      const response = await axios.patch(
        `https://miservo-api.vercel.app/api/user/edit-user/${ID}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const handleSaveChanges = async () => {
    if (!selectedAssignedTo || !checkInDuration) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please select all the options.',
      });
      return;
    }
  
    const updatedData = {
      assignedTo: selectedAssignedTo,
      checkInDuration: checkInDuration,
    };
    
    setLoading(true);
  
    try {
      const result = await updateUser(ID, updatedData);
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        text: 'Your data has been updated successfully!',
      });
      console.log("Updated successfully:", result);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue updating the data. Please try again later.',
      });
      console.error("Error during update:", error);
    }
    
    setLoading(false);
  };
  


  return (
    <div>
      <h2 className="text-2xl font-bold">Check-In Duration</h2>
      <p className="text-sm py-4 w-[80%]">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s. It has survived not only five centuries, but also the
        leap into electronic typesetting, remaining essentially unchanged.
      </p>

      <p className="font-bold mb-2">Select when you get notified:</p>
      <select
        className="rounded p-2 mb-4 w-96 border-none active:outline-none bg-gray-200"
        value={checkInDuration}
        onChange={(e) => setCheckInDuration(e.target.value)}
      >
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <p className="font-bold mb-2">
        Select when your beneficiaries get notified when you are not
        responding:
      </p>
      <select
        className="rounded p-2 mb-4 w-96 border-none active:outline-none bg-gray-200"
        value={selectedAssignedTo}
        onChange={(e) => setSelectedAssignedTo(e.target.value)}
      >
        {dropDownData.map((item, index) => (
          <option key={index} value={item.assignedTo}>
            {item.assignedTo}
          </option>
        ))}
      </select>

      <Link
        href="#"
        className="bg-yellow-700 px-5 py-2 text-black text-xs font-bold flex gap-2 justify-center items-center w-72 mt-5"
        onClick={handleSaveChanges}
      >
        {
          loading ? <Loader /> : "Save Changes"
        }
      </Link>
    </div>
  );
};

const Notification = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Check-In Duration</h2>
      <p className="text-sm py-9">
        Get notified what’s happening right now, you can turn off at any time
      </p>

      <h1 className="text-xl font-bold mt-5">Email Notification</h1>
      <p className="flex justify-between items-center mt-2">
        <span className="text-sm">
          Miservo can send an Email notification
        </span>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            onChange={(e) => {
              const toggleDot = e.target.nextSibling.firstChild;
              toggleDot.classList.toggle("translate-x-5");
            }}
          />
          <div className="relative w-10 h-5 bg-yellow-800 rounded-full shadow-inner">
            <div className="absolute w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 transform"></div>
          </div>
        </label>
      </p>

      <h1 className="text-xl font-bold mt-5">Push Notification</h1>
      <p className="flex justify-between items-center mt-2">
        <span className="text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard
        </span>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            onChange={(e) => {
              const toggleDot = e.target.nextSibling.firstChild;
              toggleDot.classList.toggle("translate-x-5");
            }}
          />
          <div className="relative w-10 h-5 bg-yellow-800 rounded-full shadow-inner">
            <div className="absolute w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 transform"></div>
          </div>
        </label>
      </p>

      <h1 className="text-xl font-bold mt-5">Payment</h1>
      <p className="flex justify-between items-center mt-2">
        <span className="text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard
        </span>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            onChange={(e) => {
              const toggleDot = e.target.nextSibling.firstChild;
              toggleDot.classList.toggle("translate-x-5");
            }}
          />
          <div className="relative w-10 h-5 bg-yellow-800 rounded-full shadow-inner">
            <div className="absolute w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 transform"></div>
          </div>
        </label>
      </p>
    </div>
  )
}
const Payment = () => {
  return (
    <div className="">
      <div className="flex justify-between py-3">
        <h2 className="text-2xl font-bold">payments</h2>
        <Link href="/" className="flex gap-2 py-3">
          Edit Details <Icon src={pencil} className="w-4" />
        </Link>
      </div>
      <h2 className="text-lg font-bold ">subscription</h2>
      <p className="font-bold text-sm mt-3 mb-7">
        You have subscribed to a yearly package which will be expiring on{" "}
        <span className="text-yellow-800">1St January 2025</span>
      </p>

      <h2 className="text-lg font-bold ">Card Details</h2>
      <div className="">
        <CustomTextField
          placeholder="Card Number"
          classs="!bg-gray-200 w-1/2 "
        />
        <CustomTextField
          placeholder="Name Of Card"
          classs="!bg-gray-200 w-1/2 "
        />
        <div className="w-1/2 flex gap-3 ">
          <CustomTextField placeholder="Expiration" classs="!bg-gray-200" />
          <CustomTextField placeholder="CVC" classs="!bg-gray-200" />
        </div>
        <div className="w-1/2 flex gap-3 ">
          <select className=" w-full text-gray-600 text-sm border-none active:outline-none bg-gray-200 ">
            <option value="">Country</option>
            <option value="monthly">America</option>
            <option value="yearly">Canada</option>
          </select>
          <CustomTextField placeholder="Zip" classs="!bg-gray-200" />
        </div>
      </div>
    </div>
  )
}
const Password = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Password</h2>
      <h2 className="text-lg font-bold mt-8 ">subscription</h2>
      <p className="font-bold text-sm mt-3 mb-7">
        You have subscribed to a yearly package which will be expiring on{" "}
        <span className="text-yellow-800">1St January 2025</span>
      </p>

      <p className="font-bold mb-2">Current Password</p>
      <input
        type="password"
        placeholder="*******"
        className="w-1/2 bg-gray-200 p-1 active:outline-none mb-3"
      />

      <p className="font-bold mb-2">New Password</p>
      <div className="flex flex-col w-1/2">
        <input
          type="password"
          placeholder="*******"
          className="w-full bg-gray-200 p-1 active:outline-none mb-3"
        />
        <Link href="#" className="text-right font-sm font-bold">
          {" "}
          Forget Password?{" "}
        </Link>
      </div>

      <Link
        href="#"
        className="bg-yellow-700 px-5 py-3 text-black text-xs font-bold flex gap-2 justify-center items-center w-1/2 mt-5"
      >
        Update Password
      </Link>
    </div>
  )
}


const Setting = () => {
  const [activeComponent, setActiveComponent] = useState("General");

  const sidebar = [
    {
      name: "General",
      comp: <GeneralComp />
    },
    {
      name: "Check-In",
      comp: <CheckIn />
    },
    {
      name: "Notification",
      comp: <Notification />
    },
    {
      name: "Payment",
      comp: <Payment />
    },
    {
      name: "Password",
      comp: <Password />
    }
  ];

  const activeComp = sidebar.find(item => item.name === activeComponent)?.comp;

  return (
    <>
      <Navbar />
      <div className="flex m-10 bg-white">
        {/* Sidebar */}
        <div className="w-1/4 bg-[#FFF9EB] p-5 min-h-[520px]">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <ul className="space-y-2">
            {sidebar.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActiveComponent(item.name)}
                  className={`w-full text-left p-2 rounded ${activeComponent == item.name ? 'bg-yellow-800' : 'hover:bg-gray-300'} `}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          {activeComp} {/* Render the correct component */}
        </div>
      </div>
    </>
  );
};

export default Setting;

