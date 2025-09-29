import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useForm } from "../../../shared/hooks/form-hook";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../../shared/util/validators";
import { typeOfCases } from "../../../constants/constants";

import Input from "../../../shared/formElements/Input";
import Button from "../../../shared/formElements/Button";

import LoadingSpinner from "../../../shared/UIelements/LoadingSpinner";
import ErrorModal from "../../../shared/modals/ErrorModal";
import StateAndDistrict from "./StateAndDistrict";
import Dropdown from "../../../shared/formElements/Dropdown";
import CaseDetails from "./CaseDetails";
import { handleKeyPress } from "../../../shared/util/generalFunc";


export default function NewCases() {
    const currentUserId = useSelector((state) => state.userAccount.UserId);
    const [proceedToDetails, setProceedToDetails] = useState(false);

    const [formState, inputHandler] = useForm({
        aadhar_no: {
            value: '',
            isValid: false
        },
        state: {
            value: '',
            isValid: false
        },
        district: {
            value: '',
            isValid: false
        },
        caseType: {
            value: '',
            isValid: false
        },
        caseDesc: {
            value: '',
            isValid: false
        }
    }, false
    )
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    //const history = useNavigate();
    const clearError = () => {
        setError(null);
    }
    const handleSubmit = async () => {
        setIsLoading(true);
        const newcase = {
            userId: currentUserId,
            userAadhar: formState.inputs.aadhar_no.value,
            caseType: formState.inputs.caseType.value.name,
            state: formState.inputs.state.value,
            district: formState.inputs.district.value,
            description: formState.inputs.caseDesc.value,
            registrationFees: formState.inputs.caseType.value.fees,
        }
        localStorage.setItem("CCMS_NEW_CASE", JSON.stringify(newcase));
        setIsLoading(false);
        setProceedToDetails(true);
    }
    return (
        <>
            {isLoading && <LoadingSpinner asOverlay />}
            <ErrorModal error={error} onClear={clearError} />
            <div className="bg-gray-200 h-screen p-4 pt-0 font-circular overflow-y-scroll">
                <p className="text-lg font-circular font-thin mt-2">Register New Case </p>
                <div className="mt-2 mb-0 p-4 w-full shadow-card bg-white">
                    <p className="text-sm font-circular font-thin mt-2">Basic information</p>
                    <div className="flex flex-row W-full">
                        <div className="flex flex-col w-1/2 p-2">
                            <Input
                                id="aadhar_no"
                                element="input"
                                type="numeric"
                                maxLength={12}
                                minValue={0}
                                onKeyDown={handleKeyPress}
                                label="Verify your ID "
                                placeHolder="Enter your Aadhar Card NO. / Voter ID no. "
                                errorText="Must contain 12 digits (0-9)"
                                validators={[VALIDATOR_MINLENGTH(12)]}
                                onInput={inputHandler}
                            />

                            <StateAndDistrict
                                inputHandler={inputHandler}
                                formState={formState}
                                validators={[VALIDATOR_REQUIRE()]}
                            />
                        </div>
                        <div className="flex flex-col w-1/2 p-2">
                            <Dropdown
                                id="case_type"
                                label="Select type of case"
                                data={typeOfCases}
                                setSelectedItem={(type) => {
                                    inputHandler("caseType", type, true);
                                }}
                                placeholder="Enter case type"
                                dropdownWithDescription={true}
                            />
                            <Input
                                id="caseDesc"
                                element="textarea"
                                type="text"
                                label="Case Description"
                                rows="5"
                                placeHolder=" Write case description  (200 words )."
                                errorText="Must contain min 10 words. "
                                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
                                onInput={inputHandler}
                            />
                        </div>
                    </div>

                    <Button
                        className={`rounded-full px-8 py-2 text-white font-circular font-thin ${!formState.isValid ? "!cursor-not-allowed bg-blue-300" : " bg-blue-500"}`} disabled={!formState.isValid}
                        handler={handleSubmit}
                    >
                        Save and Continue
                    </Button>
                </div>
                {
                    proceedToDetails && (
                        <CaseDetails />
                    )
                }
            </div>
        </>
    );
}
