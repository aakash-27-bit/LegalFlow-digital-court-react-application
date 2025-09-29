import CommonModal from "./Modal";
import { VscChromeClose } from "react-icons/vsc";
import { defaultCaseObject } from "../../config/data/defaultCase";
import PdfDownloader from "../formElements/PdfDownloader";

const CaseDetailsModal = ({ item, show, closeModal }) => {
    const {
        summary = defaultCaseObject.summary,
        caseTitle = defaultCaseObject.caseTitle,
        id = defaultCaseObject.id,
        court = defaultCaseObject.court,
        judge = defaultCaseObject.judge,
        lawyer = defaultCaseObject.lawyer,
        nextHearing = defaultCaseObject.nextHearing,
        status = defaultCaseObject.status,
        documents = []
    } = item;
    return (
        <CommonModal
            openModal={show}
            handleClose={closeModal}
            className="max-w-[75vw] h-fit rounded-md p-4 "
        >
            <div className="w-full flex justify-between flex-row ">
                <p className="text-xl tracking-wider font-semibold">{caseTitle}</p>
                <VscChromeClose className="text-2xl cursor-pointer font-bold" onClick={closeModal} />
            </div>
            <div className="flex flex-row gap-4 mt-2">

                <div className="flex flex-col gap-0">
                    <p className="text-md mt-1 ">{`CaseId: ${id}`}</p>
                    <span className="font-medium w-full mt-1 mb-2">Summary : <p className="font-extralight text-sm inline italic "> {summary}</p></span>
                    <span className="font-semibold text-md">Court Address: <p className="font-extralight text-sm inline">{court?.courtName}, {court?.courtAddress}, {court?.courtId}</p></span>
                    <span className="font-medium w-full">Judge : <p className="font-extralight italic text-sm inline"> {judge?.judgeName}, {judge?.judgeId}</p></span>
                    <span className="font-medium w-full">Lawyer : <p className="font-extralight italic text-sm inline"> {lawyer?.lawyerName}, {lawyer?.lawyerId}</p></span>
                    <br /><br />
                    <span className="font-medium text-md">Hearing Date: <p className="font-extralight text-sm inline">{nextHearing?.date}</p></span>
                    <span className="font-medium text-md">Case Timings: <p className="font-extralight text-sm inline">{nextHearing?.timings}</p></span>
                    <span className="font-medium text-md">Case Status: <p className="font-extralight text-sm inline">{status}</p></span>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row gap-4 items-center mb-2">

                        <p className="text-md font-circular text-gray-800">Case Documents</p>
                        <p className="text-sm  text-red-600 font-medium italic ">Click to download</p>
                    </div>
                    {
                        documents.length > 0 && documents.map((item, index) =>
                            <PdfDownloader id={index} fileId={item.fileId} fileName={item.fileName} fileTitle={item.fileTitle} />
                        )
                    }
                </div>
            </div>
        </CommonModal>
    )
};
export default CaseDetailsModal;
