import CommonModal from "./Modal";
import { VscChromeClose } from "react-icons/vsc";
import PdfDownloader from "../formElements/PdfDownloader";
import { defaultCaseObject } from "../../constants/data/defaultCase";
import React, { useState } from "react";
import Button from "../formElements/Button";
import axios from 'axios';

const CaseApplicationsModal = ({
    data,
    show,
    closeModal,
    refetch
}) => {
    const {
        summary = defaultCaseObject.summary,
        caseTitle = defaultCaseObject.caseTitle,
        // id = defaultCaseObject.id,
        // court = defaultCaseObject.court,
        // judge = defaultCaseObject.judge,
        // lawyer = defaultCaseObject.lawyer,
        // nextHearing = defaultCaseObject.nextHearing,
        // status = defaultCaseObject.status,
        documents = []
    } = data;

    const [checkedState, setCheckedState] = useState(
        new Array(documents.length).fill(false)
    );

    //handle checkbox toggle
    const handleCheckboxChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

    //handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!checkedState.every((state) => Boolean)) return window.alert("Please verify all documents before submitting.")
        try {
            const token = localStorage.getItem('Access-token');
            const baseUrl = process.env.REACT_APP_BASE_URL || '';
            const response = await axios.put(
                `${baseUrl}/ccms/admin/update-case/${data._id}`,
                { status: "pending" },
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
            );
            if (response) {
                let temp = window.alert(`Case ${data.caseTitle} application is accepted. `);
                if (temp === undefined) {
                    refetch();
                }
                closeModal();
            }
        }
        catch (err) { console.log('error', err); }
    };

    return (
        <CommonModal
            openModal={show}
            handleClose={closeModal}
            className="max-w-[40vw] h-fit rounded-md p-4 flex flex-col gap-2"
        >
            <div className="w-full mb-2 flex flex-row justify-between">
                <p className="text-xl tracking-wider">{caseTitle}</p>
                <div>
                    <Button
                        onClick={() => { }}
                        className="bg-red-500 rounded p-1"
                    >Edit</Button>
                    <VscChromeClose onClick={() => closeModal()} className="text-2xl cursor-pointer font-bold" />
                </div>
            </div>
            <div className="w-full mb-2 ">
                <p className="text-sm italic text-gray-600 font-light">{summary}</p>
            </div>

            <p className="text-sm italic text-bue-400">Click icon to Download and Verify</p>
            {
                documents.length > 0 && documents.map((item, index) => {
                    return (
                        <div key={index} className="flex flex-row gap-2 pl-2 items-baseline justify-baseline bg-gray-200 ">
                            <input
                                type="checkbox"
                                name={`document-${index}`}
                                checked={checkedState[index]}
                                className="h-5 w-5"
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <PdfDownloader key={index} id={index} fileName={item.fileName} fileTitle={item.fileTitle} />
                        </div>
                    )
                }
                )
            }
            <Button
                disabled={!checkedState.every(Boolean)}
                handler={handleSubmit}
                className={`rounded-2xl ${!checkedState.every(Boolean) ? ' bg-blue-300' : 'bg-blue-600'} py-2 max-w-[40%] mt-2 text-white`}
            >
                Submit
            </Button>
        </CommonModal>
    )
};

export default CaseApplicationsModal;
