import { toTitleCase } from "../../../shared/util/generalFunc";
import { CiCircleChevRight } from "react-icons/ci";
import { useState } from "react";
import CaseDetailsModal from "../../../shared/modals/CaseDetailsModal";
import { convertToMaskedFormat } from "../../../shared/util/generalFunc";

const CaseStatusTracker = ({ data }) => {
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedCase, setSelectedCase] = useState({});
    data = Array.isArray(data) && data.length > 0 ? data.slice().reverse() : [];
    const handleOpenModal = (index) => {
        data.length() > 0 && setSelectedCase(data[index]);
        setOpenDetails(open => !open);
    }

    return (
        <>
            <p className="text-md font-circular ml-4">Track Case Status</p>
            <div className="w-[95%] rounded-xl mx-4 h-[260px] bg-white shadow-card p-2">
                <CaseDetailsModal
                    item={selectedCase}
                    show={openDetails}
                    closeModal={() => setOpenDetails((open) => !open)}
                />
                <div className="w-full h-full overflow-hidden overflow-y-scroll custom-scrollbar ">
                    <div className="flex flex-col gap-2 ">
                        {Array.isArray(data) && data.length > 0 ? data.map((item, index) => {
                            const {
                                caseTitle = "New Application",
                                judge: { judgeName = "To Be Decided" } = {},
                                court: { courtName = "To Be Decided" } = {},
                                status,
                                id
                            } = item;

                            return (
                                <div key={index}>
                                    <div key={index} className="w-[100%] h-12 py-2 px-4 flex flex-row justify-between items-center bg-gray-200 rounded-lg">
                                        <div>
                                            <div className="flex flex-row gap-1 items-baseline">

                                                <p className="text-md" >{caseTitle}</p>,
                                                <p className="text-xs">( {convertToMaskedFormat(id)} )</p>
                                            </div>
                                            <div className="text-xs italic font-medium"><p>{judgeName}, {courtName}</p></div>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <p className="text-md animate-pulse font-light tracking-wider font-circular text-[#006A67]">{toTitleCase(status)}</p>
                                            <CiCircleChevRight className="text-2xl cursor-pointer text-[#165f5d]" onClick={() => handleOpenModal(index)} />
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : null
                        }
                    </div>
                </div>
            </div >
        </>
    );
}
export default CaseStatusTracker;
