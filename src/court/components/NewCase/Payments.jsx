import { React, useState } from "react";
import Input from "../../../shared/formElements/Input";
import Button from "../../../shared/formElements/Button";
import { useForm } from "../../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../../shared/util/validators";
import { handleKeyPress } from "../../../shared/util/generalFunc";
import bank from "../../../assets/bank.svg";
import { paymentCards } from "../../../constants/constants";
import { paymentMethods } from "../../../constants/constants";

const Payments = () => {

    const [savedCards, setSavedCards] = useState(paymentCards);
    const [activeIndex, setActiveIndex] = useState(1);
    const [activeCard, setActiveCard] = useState(-1);

    const initialState = {
        holderName: {
            value: '',
            isValid: false,
        },
        cardNumber: {
            value: '',
            isValid: false,
        },
        expiry: {
            value: '',
            isValid: false,
        },
        cvv: {
            value: '',
            isValid: false,
        },
    }

    const [formState, inputHandler, setFormData] = useForm(initialState, false);
    const handleNewCard = () => {
        const newCard = {
            id: savedCards.length + 1,
            bankName: "New Debit Card",
            holderName: formState.inputs.holderName.value,
            cardNumber: formState.inputs.cardNumber.value,
            expiry: formState.inputs.expiry.value,
            cvv: formState.inputs.cvv.value,
            bankImage: bank,
        }
        setSavedCards((cards) => [...cards, newCard]);
        setFormData(initialState, false);
    }
    return (
        <div className=" bg-gray-200 h-screen overflow-y-scroll">
            <div className="flex flex-row bg-white p-4 m-4" >
                <div className=" flex flex-col w-1/2">
                    <p className="text-lg font-semibold font-circular"> Payment Option </p>
                    <div className="flex flex-col gap-2 w-4/5 mt-1">
                        {paymentMethods.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <label
                                    key={index}
                                    className={`w-full font-thin rounded-[8px] min-h-md cursor-pointer border-[2px] flex flex-row items-baseline gap-2 py-2 ${activeIndex === index
                                        ? "border-blue-500"
                                        : "border-gray-300"
                                        } bg-white px-4 py-3 `}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <input
                                        key={index}
                                        type="radio"
                                        id={`option-${index + 1}`}
                                        value={item.value}
                                        checked={activeIndex === index}
                                        className="mt-2 mr-2 text-lg w-4 h-4"
                                        readOnly
                                    />
                                    <div className="items-center flex flex-row gap-2">

                                        <Icon className="text-xl" />
                                        <p className="text-lg font-extralight font-circular text-black">{item.title}</p>
                                    </div>
                                </label>
                            )
                        })
                        }
                    </div>
                </div>
                <div className="flex flex-col w-1/2 p-4">
                    <p className="text-xl font-circular font-semibold">Payment Details</p>
                    <div className="flex flex-row justify-between border-b-[2px] mt-2 border-gray-400 pb-2 ">
                        <p className="font-light text-md">Total Payable: </p>
                        <p className="font-bold text-xl "> ₹ {JSON.parse(localStorage.getItem("CCMS_NEW_CASE"))?.registrationFees}</p>
                    </div>
                    <Button
                        className="w-full mt-2 py-2 bg-black text-white font-circular">
                        CONFIRM PAYMENT
                    </Button>
                </div>
            </div >
            <div className="flex flex-row gap-16 mt-4 bg-white p-4 m-4" >
                <div className="mt-2 w-1/2">
                    <p className="text-lg font-semibold font-circular"> Saved Cards </p>
                    <div className="flex flex-col gap-2 mt-1 ">
                        {savedCards.map((item, index) => {
                            return (
                                <label
                                    key={index}
                                    className={`max-w-4/5 font-thin rounded-[8px] cursor-pointer border-[2px] flex flex-row items-center gap-2 ${activeCard === index
                                        ? "border-blue-500"
                                        : "border-gray-300"
                                        } bg-white px-4 py-2 `}
                                    onClick={() => setActiveCard(index)}
                                >
                                    <input
                                        key={index}
                                        type="radio"
                                        id={`option-${index + 1}`}
                                        value={item.value}
                                        checked={activeCard === index}
                                        className="mt-2 mr-2 text-lg w-4 h-4"
                                        readOnly
                                    />
                                    <div className=" items-center flex flex-row w-full">
                                        <div className="-mt-[4px] bg-white  h-12 object-cover">

                                            <img src={item.bankImage} alt="bank-logo" className="  w-16 h-full aspect-square bg-white" />
                                        </div>
                                        <div className="flex flex-col w-full ml-2">

                                            <p className="text-sm font-extralight font-circular text-black">{item.bankName}</p>
                                            <div className="flex flex-row justify-between w-full items-end">

                                                <p className="text-xs font-extralight font-circular text-gray-700">{item.cardNumber}</p>
                                                <p className="text-xs font-light font-circular text-gray-400">Exp:{" "}{item.expiry}</p>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            )
                        })
                        }
                    </div>
                </div>
                <div className="mt-2 w-1/2">
                    <p className="text-md font-semibold font-circular">Add New Card/Debit /ATM Card</p>
                    <div className="flex flex-col">
                        <Input
                            id="holderName"
                            element="input"
                            type="text"
                            label="Card Holder Name"
                            placeHolder="Enter your Full Name"
                            errorText="Must contain letters A-Z/a-z only"
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandler}
                        />
                        <Input
                            id="cardNumber"
                            element="input"
                            type="numeric"
                            maxLength="16"
                            label="Card Number"
                            onKeyDown={handleKeyPress}
                            placeHolder="XXXX-XXXX-XXXX-XXXX"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(12)]}
                            errorText="Must contain 16 digits"
                            onInput={inputHandler}
                        />
                        <div className="flex flex-row gap-4 items-center">
                            <Input
                                id="expiry"
                                type="date"
                                element="input"
                                label="Expiry Date"
                                placeHolder="00/0000"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Required Field"
                                onInput={inputHandler}
                            />
                            <Input
                                id="cvv"
                                type="numeric"
                                element="input"
                                label="CVV"
                                placeHolder="XXX"
                                maxLength={3}
                                onKeyDown={handleKeyPress}
                                validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_REQUIRE()]}
                                onInput={inputHandler}
                                errorText="Required Field, Must be 3 numbers"
                            />
                            <Button
                                className={`rounded-3xl px-4 w-3/5 mt-2 h-12 py-1 !text-lg text-white font-circular font-thin ${!formState.isValid ? "!cursor-not-allowed bg-blue-300" : " bg-blue-500"}`} disabled={!formState.isValid}
                                handler={handleNewCard}
                            >
                                Add Card
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default Payments;
