const UpcomingHearings = ({ data }) => {
    return (
        <div className="bg-white rounded-xl flex flex-col p-2 w-3/5 font-circular shadow-nav">
            <p className="text-md font-bold font-circular text-gray-700 pl-2">Upcoming Hearings</p>
            <div className="overflow-x-scroll overflow-hidden px-2 flex flex-row gap-2 cursor-pointer custom-scrollbar">
                {
                    data.map((item, index) => {
                        const {
                            nextHearing = {
                                date: "To Be Decided",
                                timings: "To Be Decided",
                            },
                            caseTitle = "New Case "
                        } = item;
                        return (
                            <div key={index} className={`rounded-xl p-2 min-w-[33%] flex flex-col my-2 ${item.status === "Filed" ? 'bg-red-400' : 'bg-blue-200 '}`}>
                                <p className="text-xs mt-2 mb-1 font-light">{caseTitle}</p>
                                <p className="text-sm font-light">{nextHearing?.date}</p>
                                <p className="text-xs font-light ">{nextHearing?.timings}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default UpcomingHearings;  