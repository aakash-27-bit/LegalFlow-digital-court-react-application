
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Overview from "./Overview";
import CaseStatusTracker from "./CaseStatusTracker";
import LawyersSection from "./YourLawyers";
import useGetAllCases from "../../api/useGetAllCases";
import Button from "../../shared/formElements/Button";
import AdminDashboard from "../DashboardAdminView/AdminDashboard";
import LoadingSpinner from "../../shared/UIelements/LoadingSpinner";
import ErrorModal from "../../shared/modals/ErrorModal";
import { allDummyCases as data } from "../../../constants/data/dummyCasesList";
import { setData } from "../../features/CourtAccount/CaseReducers";
import { lawyersData, ROLES, STATUS } from "../../../constants/constants";
import errorScreen from "../../../assets/error_screen.png";

const Dashboard = () => {
    const history = useNavigate();
    const userId = useSelector((state) => state.userAccount.userId);
    const role = useSelector((state) => state.userAccount.role);
    let filter = {};
    if (role === ROLES.ADMIN) filter = { status: STATUS.FILED };

    const { data2, error, refetch } = useGetAllCases(`${role}/${userId}`, filter);

    setData(data2);

    if (0) { return <><LoadingSpinner asOverlay /></> }
    if (!error) { return <ErrorModal error={error} onClear={refetch} /> }
    // If user and no cases, show error image
    if (!data?.allCases || !Array.isArray(data.allCases) || data.allCases.length === 0) {
        return (
            <div className="bg-gray-200 h-screen w-full flex flex-col items-center justify-center">
                <img
                    src={errorScreen}
                    alt="No cases found"
                    style={{ maxWidth: 400, width: '80%', cursor: 'pointer', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
                    onClick={() => history('/new-case')}
                />
            </div>
        );
    }
    return (
        <>
            {role === ROLES.ADMIN ? (
                <div className="bg-gray-200 h-screen overflow-y-scroll flex flex-row">
                    <div id="ovw-hrn" className="flex flex-col gap-2 mt-4">
                        <Overview data={data} />
                        <CaseStatusTracker data={data?.allCases} />
                    </div>
                    <div id="new-lwr" className="flex flex-col gap-2 w-[35%] mt-4">
                        <Button
                            className="bg-red-800 rounded-md text-white text-xl font-bold shadow-nav py-6 px-2 mt-8 mb-2 mr-4"
                            handler={() => history("/new-case")}
                        >
                            New Application
                        </Button>
                        <LawyersSection data={lawyersData} />
                    </div>
                </div>
            ) : (
                    <AdminDashboard />
            )}
        </>
    );
}

export default Dashboard;
