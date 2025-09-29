import { lawyersData } from "../../../constants/constants";
import { CiCircleChevRight } from "react-icons/ci";
import LawyerDetailsModal from "../../shared/modals/LawyerDetailsModal";
import { useState } from "react";

const LawyersSection = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedLawyer, setSelectedLawyer] = useState({});

    const handleOpenModal = (index) => {
        setSelectedLawyer(lawyersData[index]);
        setOpenModal(open => !open);
    }

    return (
        <div id="adv" className="bg-transparent rounded-xl mr-4 flex-col ">
            <p className="text-md font-semibold mt-2 ml-2">Your lawyers</p>
            <LawyerDetailsModal
                show={openModal}
                item={selectedLawyer}
                closeModal={() => setOpenModal(show => !show)}
            />
            <div className="mt-2 shadow-card p-2 bg-white max-h-[420px] h-fit py-4 rounded-xl flex flex-col gap-2 overflow-hidden overflow-y-auto custom-scrollbar">
                {
                    lawyersData.map((item, index) => {
                        let res = [];
                        item.cases.forEach((obj) => res.push(obj.caseTitle));
                        return (
                            <div key={index} className="relative w-full rounded-xl shadow-nav font-circular p-2 py-2">

                                <CiCircleChevRight
                                    onClick={() => handleOpenModal(index)}
                                    className="text-xl text-pink-950 cursor-pointer font-bold absolute top-1 right-2"
                                />

                                <p className="font-medium text-sm" >{item.fullName}</p>
                                <p className="text-xs text-gray-500">{res.join(" , ")}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};
export default LawyersSection;
