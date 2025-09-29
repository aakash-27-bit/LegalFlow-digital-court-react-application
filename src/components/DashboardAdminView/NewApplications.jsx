import { useState } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import CaseApplicationsModal from "../../shared/modals/CaseApplicationsModal";

const NewApplications = ({ refetch, data }) => {
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedCase, setSelectedCase] = useState({});
    data = Array.isArray(data?.data?.allCases) && data.data.allCases.length() > 0 && data.data.slice().reverse();

    const handleOpenModal = (index) => {
        setSelectedCase(data[index]);
        setOpenDetails(true);
    }
    //api call to update verify documents send notif to add lawyer, 
    return (
        <div className="flex flex-col gap-1 w-full ">
            {openDetails &&
                <CaseApplicationsModal
                    show={openDetails}
                    data={selectedCase}
                    refetch={refetch}
                    closeModal={() => setOpenDetails((open) => !open)}
                />}
            <div className="flex flex-row gap-2 items-end">

                <p className="text-xl text-gray-800 font-bold">New Applications, </p><p className="text-sm font-medium italic text-red-700">Click to verify documents</p>
            </div>
            <div
                className="w-full custom-scrollbar overflow-hidden mt-1 h-max rounded-sm bg-white flex flex-row gap-4 p-4"
            >
                {
                    data.length > 0 && data.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="p-2 rounded-lg shadow-nav flex flex-col justify-between items-end cursor-pointer"
                                onClick={() => handleOpenModal(index)}
                            >
                                <div>

                                    <p className="text-md font-medium fort-circular">{item.caseTitle}</p>
                                    <p className="text-sm italic text-gray-400">{item.summary.slice(0, 80) + "..."}</p>
                                </div>
                                <div className="border-2 border-white" onClick={() => handleOpenModal(index)}>
                                    <IoArrowForwardCircleOutline className="text-3xl text-purple-700 font-bold" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default NewApplications;
