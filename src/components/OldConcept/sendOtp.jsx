import React, { useCallback, useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebaseConfig";
// import { useAuth0 } from "@auth0/auth0-react";


const OTPAuth = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [verificationId, setVerificationId] = useState(null);
    auth.settings.appVerificationDisabledForTesting = true;

    // const { loginWithRedirect } = useAuth0();

    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            auth, "recaptcha-container",
            {
                size: "invisible",
                callback: () => {
                    onSignInSubmit();
                },
            });
    };


    const onSignInSubmit = useCallback(() => {
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                setVerificationId(confirmationResult.verificationId);
                alert("OTP has been sent!");
            })
            .catch((error) => console.log("Error: ", error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmitOTP = useCallback(() => {
        const credential = auth.PhoneAuthProvider.credential(
            verificationId,
            otp
        );
        auth
            .signInWithCredential(credential)
            .then((result) => {
                alert("User is verified");
            })
            .catch((error) => console.log("Error: ", error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h2>Phone authentication </h2>
            <div id="recaptcha-container"></div>
            <input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={onSignInSubmit}>Send OTP </button>
            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={onSubmitOTP}>Verify OTP</button>
        </div>
    );
};

export default OTPAuth;