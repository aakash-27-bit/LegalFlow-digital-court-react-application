import Button from '../formElements/Button';
import CommonModal from './Modal';
import OtpInput from '../UIelements/OtpInput';
import { useState } from 'react';
import axios from "axios";

const VerifyOtpModal = ({
    show,
    loading,
    value,
    onChange,
    setIsLoading,
    handleClose,
    resendOtp,
    email,
    onVerificationSuccess
}) => {
    const [errorMsg, setErrorMsg] = useState('');
    const submitOtp = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const token = localStorage.getItem('Access-token');
            const baseUrl = process.env.REACT_APP_BASE_URL || '';
            await axios.post(
                `${baseUrl}/ccms/otp/verify-otp`,
                {
                    email: email,
                    otp: value,
                },
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
            );
            setIsLoading(false);
            onVerificationSuccess();
        }
        catch (error) {
            setErrorMsg(error.response?.data?.message || error.message);
            setIsLoading(false);
            return;
        }
    };
    return (
        <CommonModal
            openModal={show}
            handleClose={handleClose}
            className="h-1/2 w-1/2"
            id="error-modal"
        >
            <div className="relative p-4 bg-gray-300 rounded-xl h-full flex flex-col overflow-hidden items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shine"></div>
                <p className="text-lg italic font-semibold text-gray-800">{`OTP sent to ${email}.`}</p>
                <OtpInput
                    value={value}
                    onChange={onChange}
                    valueLength={6}
                />
                {errorMsg && <p className="text-md mt-1 italic font-italic font-bold text-red-700">{errorMsg}</p>}
                <div className='flex flex-row w-full gap-8 justify-center'>

                    <Button
                        className="cursor-pointer rounded-full px-8 py-1 border-2 mt-6 text-xl border-black"
                        handler={(event) => {
                            event.preventDefault();
                            setErrorMsg("Otp Resent, Enter again!");
                            resendOtp(event);
                        }}
                    >Resend OTP</Button>
                    <Button className="cursor-pointer rounded-full px-8 py-1 border-2 mt-6 border-black text-xl" handler={submitOtp}>Submit OTP</Button>
                </div>
            </div>
        </CommonModal >
    );
}

export default VerifyOtpModal;
