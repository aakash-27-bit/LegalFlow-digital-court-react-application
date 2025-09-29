import { useSelector } from "react-redux";
import { useState } from "react";
import { STATUS } from "../../../constants/constants";
import useGetAllCases from "../../api/useGetAllCases";
import ErrorModal from "../../shared/modals/ErrorModal";
import { toTitleCase } from "../../shared/util/generalFunc";
import EditCaseDetailsModal from "../../shared/modals/EditCaseDetails";
import LoadingSpinner from "../../shared/UIelements/LoadingSpinner";
import { FiEdit3 } from "react-icons/fi";

const UpdateHearings = () => {
    const userId = useSelector((state) => state.userAccount.userId);
    const role = useSelector((state) => state.userAccount.role);
    let filter = { status: STATUS.PENDING };
    const { data, error, loading, refetch } = useGetAllCases(`${role}/${userId}`, filter);

    const [openCaseEditModal, setOpenCaseEditModal] = useState(false);

    const [selectedCase, setSelectedCase] = useState({});

    if (loading) { return <><LoadingSpinner asOverlay /></> }
    if (error) return <ErrorModal error={error} onClear={refetch} />


    const handleEditCase = (item, index) => {
        setSelectedCase({
            ...item,
            pos: index
        });
        setOpenCaseEditModal(open => !open);
    }

    return (
        <div className="flex flex-col w-[30%] gap-1">
            <p className="text-xl font-bold pl-1 text-gray-800">Schedule Next Hearings</p>
            {openCaseEditModal &&
                <EditCaseDetailsModal
                    show={openCaseEditModal}
                    item={selectedCase}
                    refetch={refetch}
                    closeModal={() => setOpenCaseEditModal(false)}
                />
            }
            {
                data?.data?.length === 0 && <p className="text-md font-circular">No Pending Cases found.</p>
            }
            <div className="rounded-sm bg-white h-[90vh] p-2 px-4 mt-1 pt-2 flex-col flex gap-2">
                {data?.data?.length > 0 && data?.data?.map((item, index) => {
                    return (
                        <div
                            className="shadow-card relative rounded-lg border-1 border-gray-200 p-2 flex flex-col gap-1"
                            key={index}
                        >
                            <div className="flex flex-row justify-between">
                                <div className="ml-2 width-fit">
                                    <p className="text-xl text-gray-700 font-bold">{item.caseTitle}</p>
                                    <p className="text-sm text-gray-500 italic">{item.summary.slice(0, 60) + "..."}</p>
                                    <p className="text-md mb-2 mt-2 text-gray-500 font-circular">Type: {toTitleCase(item.caseType)}</p>
                                </div>
                                <div
                                    className="rounded-full z-20 w-10 h-10 bg-[#33558b] cursor-pointer"
                                >
                                    <FiEdit3 className="cursor-pointer font-bold text-2xl ml-2 mt-2 text-white"
                                        onClick={() => handleEditCase(item, index)}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default UpdateHearings;
