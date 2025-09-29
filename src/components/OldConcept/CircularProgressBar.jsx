import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
const ProgressBarCircular = ({ activeCases = 3, closedCases = 8, totalCases = 11 }) => {
    const solvedPercentage = (closedCases / totalCases) * 100;
    return (

        <div className=" bg-white max-h-[160px] w-2/5 p-2 px-4 rounded-xl shadow-nav m-auto flex flex-row">
            <CircularProgressbar
                value={solvedPercentage}
                maxValue={100}
                text={`${closedCases}/${totalCases}`}
                styles={buildStyles({
                    pathColor: solvedPercentage > 50 ? '#006A67' : 'red',
                    trailColor: '#d6d6d6',
                    textColor: '#213555',
                    strokeWidth: '12',
                    textSize: '16px',
                })}
            />
            <div className="text-center mt-2.5 flex flex-col gap-4 justify-center text-md font-bold">
                <div className="text-red-700">{activeCases} Active Cases</div>
                <div className="text-[#006A67]">{closedCases} Closed Cases</div>
            </div>
        </div>
    )
};
export default ProgressBarCircular;