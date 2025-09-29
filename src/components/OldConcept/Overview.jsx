import ProgressBarCircular from "./CircularProgressBar";
import UpcomingHearings from "./UpcomingHearings";
const Overview = ({ data }) => {
    return (
        <>
            <p className="text-md font-medium ml-4 mt-2 "> Overview </p>
            <div className="bg-transparent flex flex-row gap-2 mx-4 mb-4 ">
                <ProgressBarCircular
                    activeCases={data?.activeCases}
                    closedCases={data?.closedCases}
                    totalCases={data?.totalCases}
                />
                <UpcomingHearings
                    data={data?.allCases}
                />
            </div>
        </>
    )
};

export default Overview;