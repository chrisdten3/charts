import DashboardPanel from "../components/dashboardPanel";
import ChartsPanel from "../components/chartsPanel";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="relative h-screen"> 
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 p-2"
            >
                <BiArrowBack size={24} />
            </button>
            <div className="flex h-full">
                <div className="w-3/4 flex items-center justify-center">
                    <ChartsPanel />
                </div>
                <div className="w-1/4">
                    <DashboardPanel />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;


