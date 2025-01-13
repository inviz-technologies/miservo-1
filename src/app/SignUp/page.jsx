"use client"

import React, { useState } from 'react'
import Icon from '@components/Icon';
import CustomTextField from '@components/CustomTextField';
import CustomDropdown from '@components/CustomDropdown';
import Link from 'next/link';
import { Button } from "@material-tailwind/react";
import { backArrow, bankIcon, debitCard } from "@root/icons.js"
import axios from 'axios';
import Swal from 'sweetalert2';
import Loader from '@root/src/components/Loader';


function SignUpFormStep_1({ navigate, handleChange, formData }) {

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.password || formData.password.length < 6 ) newErrors.password = 'Password is required';
        if (formData.password !== formData.rePassword) newErrors.rePassword = 'Passwords must match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // true if no errors
    };

    const handleNext = () => {
        if (validate()) {
            navigate();
        }
    };

    return (
        <>
            <div className='d-flex-between-y-center w-full gap-4'>
                <CustomTextField
                    label='First name'
                    name='firstName'
                    onChange={(e) => handleChange(e.target.value, 'firstName')}
                    value={formData.firstName || ''}
                    error={errors.firstName}
                />
                <CustomTextField
                    label='Last name'
                    name='lastName'
                    onChange={(e) => handleChange(e.target.value, 'lastName')}
                    value={formData.lastName || ''}
                    error={errors.lastName}
                />
            </div>
            <CustomTextField
                label='Enter Your Email'
                name='email'
                onChange={(e) => handleChange(e.target.value, 'email')}
                value={formData.email || ''}
                error={errors.email}
            />
            <CustomTextField
                label='Enter your cell number'
                name='phone'
                onChange={(e) => handleChange(e.target.value, 'phone')}
                value={formData.phone || ''}
                error={errors.phone}
            />
            <CustomTextField
                label='Enter password'
                name='password'
                type='password'
                onChange={(e) => handleChange(e.target.value, 'password')}
                value={formData.password || ''}
                error={errors.password}
            />
            <CustomTextField
                label='Re-write password'
                name='rePassword'
                type='password'
                onChange={(e) => handleChange(e.target.value, 'rePassword')}
                value={formData.rePassword || ''}
                error={errors.rePassword}
            />

            <Button className='w-full' onClick={handleNext}>CONTINUE</Button>
        </>
    );
}

function SignUpFormStep_2({ navigate, handleChange, formData }) {

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.birthdate) newErrors.birthdate = 'Birthdate is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zip) newErrors.zip = 'Zip code is required';
        if (!formData.address_1) newErrors.address_1 = 'Address #1 is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // true if no errors
    };

    const handleNext = () => {

        if (validate()) {
            navigate();
        }
    };

    return (
        <>
            <CustomTextField
                label='Your Birthdate'
                type='date'
                onChange={(e) => handleChange(e.target.value, 'birthdate')}
                value={formData.birthdate || ''}
                error={errors.birthdate}
            />
            <CustomDropdown
                label="Select Gender"
                menuItems={['Male', "Female", "Prefer not to say"]}
                onChange={(value) => handleChange(value, 'gender')}
                value={formData.gender || ''}
                error={errors.gender}
            />
            <div className='d-flex-between-y-center max-w-full gap-4 main'>
                <CustomDropdown
                    label="City"
                    menuItems={[
                        'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
                        'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
                        'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Indianapolis',
                        'Charlotte', 'San Francisco', 'Seattle', 'Denver', 'Washington D.C.'
                    ]}
                    onChange={(value) => handleChange(value, 'city')}
                    value={formData.city || ''}
                    error={errors.city}
                />
                <CustomDropdown
                    label="State"
                    menuItems={[
                        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
                        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
                        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
                        'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
                        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
                        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
                        'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
                        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
                        'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
                    ]}
                    onChange={(value) => handleChange(value, 'state')}
                    value={formData.state || ''}
                    error={errors.state}
                />
                <CustomTextField
                    label='Zip'
                    onChange={(e) => handleChange(e.target.value, 'zip')}
                    value={formData.zip || ''}
                    error={errors.zip}
                />
            </div>

            <CustomTextField
                label='Address #1'
                onChange={(e) => handleChange(e.target.value, 'address_1')}
                value={formData.address_1 || ''}
                error={errors.address_1}
            />
            <CustomTextField
                label='Address #2'
                onChange={(e) => handleChange(e.target.value, 'address_2')}
                value={formData.address_2 || ''}
            />

            <Button className='w-full' onClick={handleNext}>CONTINUE</Button>
        </>
    );
}



function SignUpFormStep_3({ navigate, handleChange, formData }) {

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.maritalStatus) newErrors.maritalStatus = 'MaritalStatus is required';
        if (!formData.checkInDuration) newErrors.checkInDuration = 'CheckInDuration is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // true if no errors
    };

    const handleNext = async () => {
        if (validate()) {
            setIsLoading(true); 
            try {
                await navigate(); 
                setIsLoading(false); 
            } catch (err) {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <CustomDropdown
                label="Marital Status"
                menuItems={['Single', "Married", "Prefer not to say"]}
                onChange={(value) => handleChange(value, 'maritalStatus')}
                value={formData.maritalStatus || ''}
            />
            <CustomDropdown
                label="Check-In Duration"
                menuItems={["weekly", "monthly", "yearly"]}
                onChange={(value) => handleChange(value, 'checkInDuration')}
                value={formData.checkInDuration || ''}
            />
            {isLoading ? <Loader /> :
                <Button className='w-full' onClick={handleNext}>Continue </Button>
            }
        </>
    );
}





// function SignUpFormStep_4({ navigate }) {
//     const [selectedDiv, setSelectedDiv] = useState(null);

//     return (
//         <>
//             <div className='w-[550px] d-flex-column-center gap-4'>

//                 <h1 className='w-full mb-4 text-4xl font-extrabold capitalize'>lets get started</h1>
//                 <p className='w-full mb-4'>
//                     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
//                 </p>

//                 <div className="d-flex-between-y-center w-full gap-4">
//                     <div
//                         className={`w-full p-4 rounded-2xl cursor-pointer ${selectedDiv === 'monthly' ? 'bg-yellow-800 text-white' : "bg-white text-black"}`}
//                         onClick={() => setSelectedDiv('monthly')}>
//                         <h4 className='text-xl font-bold'>Monthly</h4>
//                         <p className='text-sm py-4'>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
//                         <div className='text-xl font-bold mb-4'>$230.00/<span className='text-sm font-light'>month</span></div>
//                         <Button className={`w-full font-inter rounded-sm shadow-none hover:shadow-none ${selectedDiv === 'monthly' ? 'bg-white text-black' : "text-black bg-yellow-800"}`}>CONTINUE</Button>
//                     </div>
//                     <div
//                         className={`w-full p-4 rounded-2xl cursor-pointer ${selectedDiv === 'year' ? 'bg-yellow-800 text-white' : "bg-white text-black"}`}
//                         onClick={() => setSelectedDiv('year')}>
//                         <h4 className='text-xl font-bold'>Yearly</h4>
//                         <p className='text-sm py-4'>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
//                         <div className='text-xl font-bold mb-4'>$230.00/<span className='text-sm font-light'>year</span></div>
//                         <Button className={`w-full font-inter rounded-sm shadow-none hover:shadow-none ${selectedDiv === 'year' ? 'bg-white text-black' : "text-black bg-yellow-800"}`}>CONTINUE</Button>
//                     </div>
//                 </div>

//                 <Button className='w-full font-inter shadow-none hover:shadow-none text-black bg-yellow-800' onClick={navigate}>CONTINUE</Button>
//             </div>
//         </>
//     )
// }




// function SignUpFormStep_5({ navigate }) {
//     const [selectedDiv, setSelectedDiv] = useState(null);

//     return (
//         <>
//             <div className='w-[550px] d-flex-column-center gap-2'>
//                 <h1 className='w-full mb-2 font-extrabold text-2xl d-flex-start-center gap-4 cursor-pointer'><Icon src={backArrow} className='w-5' /> Payment</h1>
//                 <p className='w-full text-sm font-bold'>
//                     Yearly subscription
//                 </p>
//                 <h1 className='w-full font-extrabold text-2xl'>$ 230.00</h1>
//                 <p className='w-full mb-2 text-sm font-bold text-gray-800'>Lorem Ipsum is simply dummy text of the printing and typesetting</p>

//                 <CustomTextField label='Bill to pay' placeholder='Miservo' type='text' classs='' />

//                 <h5 className='w-full text-sm font-bold mb-2'>Payment Details</h5>
//                 <div className="d-flex-between-y-center w-full -mt-3 gap-4">
//                     <div
//                         className={`w-full p-4 rounded-2xl cursor-pointer  text-black ${selectedDiv === 'monthly' ? 'bg-orange-100' : "bg-white text-black"}`}
//                         onClick={() => setSelectedDiv('monthly')}>
//                         <Icon src={debitCard} />
//                         <h4 className='text-xl mt-6 font-bold'>Debit/Credit</h4>
//                     </div>
//                     <div
//                         className={`w-full p-4 rounded-2xl cursor-pointer  text-black ${selectedDiv === 'year' ? 'bg-orange-100' : "bg-white text-black"}`}
//                         onClick={() => setSelectedDiv('year')}>
//                         <Icon src={bankIcon} />
//                         <h4 className='text-xl mt-6 font-bold'>Bank Transfer</h4>
//                     </div>
//                 </div>
//                 <div className='w-full grid gap-x-2 mt-2 grid-cols-6'>
//                     <div className='col-span-6'>
//                         <CustomTextField hideLabel={true} placeholder='Card Number' type='text' classs='' />
//                     </div>
//                     <div className='col-span-3'>
//                         <CustomTextField hideLabel={true} placeholder='Expiration' type='text' classs='' />
//                     </div>
//                     <div className='col-span-3'>
//                         <CustomTextField hideLabel={true} placeholder='Cvc' type='text' classs='' />
//                     </div>
//                     <div className='col-span-3'>
//                         <CustomDropdown hideLabel={true} menuItems={['Single', "Married", "Prefer not to say"]} />
//                     </div>
//                     <div className='col-span-3'>
//                         <CustomTextField hideLabel={true} placeholder='Zip' type='text' classs='' />
//                     </div>
//                     <div className='col-span-2'>
//                         <Button className='w-full font-inter shadow-none hover:shadow-none text-black bg-gray-400'>Cancel</Button>
//                     </div>
//                     <div className='col-span-4'>
//                         <Button className='w-full font-inter shadow-none hover:shadow-none text-gray-700 bg-orange-200' onClick={navigate}>SUBSCRIBE</Button>
//                     </div>
//                 </div>
//                 <p className='w-full mb-2 text-sm mt-4 text-gray-700'>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
//             </div>
//         </>
//     )
// }




function GoToLoginSection({ navigate }) {
    return (
        <div className='w-[550px] d-flex-column-center gap-6'>
            <h1 className='w-full mb-2 font-extrabold text-2xl cursor-pointer'>
                you have successfully subscribed to
                our yearly package
            </h1>
            <h1 className='w-full mb-2 font-extrabold text-2xl cursor-pointer'>
                Thanks for your subscription
            </h1>
            <p className='w-full text-sm font-bold'>
                Go To <Link href='/Login' className='border-b-2 border-yellow-800 pb-2'>Login Page</Link> and Continue
            </p>
        </div>
    )
}




const SignUp = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({});

    const handlePageNavigation = () => {
        if (currentPage >= 6) return;
        setCurrentPage((prev) => prev + 1);
    };

    const handleChange = (value, field) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

    };

    const SubmitData = async () => {
        try {
            const response = await axios.post('https://miservo-api.vercel.app/api/user/create', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            Swal.fire({
                title: "Successfully Created!",
                text: "Thank You",
                icon: "success"
            });

            if (response.status == 200) {
                setCurrentPage(4)
            }

        } catch (err) {
            const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${errorMessage}`,
            });
        }
    };

    return (
        <section className='grid grid-cols-2 min-h-[100vh]'>
            <div className='border-r-2 border-purple-1000 d-flex-center my-[8vh]'>
                <h1 className='text-5xl text-purple-1000 font-extrabold uppercase'>Miservo</h1>
            </div>
            <div className='d-flex-column-center'>
                <div className='w-[550px] d-flex-column-center gap-4'>

                    {currentPage < 4 && (
                        <div className='d-flex-between-y-center w-full mb-8 ps-4'>
                            <div className='flex gap-2 justify-center items-center cursor-pointer'>
                                {currentPage !== 1 && (
                                    <span onClick={() => setCurrentPage((prev) => prev - 1)}>
                                        <Icon src={backArrow} className='w-5' />
                                    </span>
                                )}
                                <h1 className='text-4xl font-extrabold capitalize'>let's get started</h1>
                            </div>
                            <div className='font-bold text-sm'>step {currentPage}/3</div>
                        </div>
                    )}

                    {currentPage === 1 && <SignUpFormStep_1 navigate={handlePageNavigation} handleChange={handleChange} formData={formData} />}
                    {currentPage === 2 && <SignUpFormStep_2 navigate={handlePageNavigation} handleChange={handleChange} formData={formData} />}
                    {currentPage === 3 && <SignUpFormStep_3 navigate={SubmitData} handleChange={handleChange} formData={formData} />}
                    {currentPage === 4 && <GoToLoginSection />}
                    {/* Add other steps as needed */}

                </div>
            </div>
        </section>
    );
};


export default SignUp