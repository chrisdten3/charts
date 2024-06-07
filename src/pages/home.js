import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div className="font-extrabold h-screen flex items-center justify-center flex-col">
            <h1 className="text-green-400 text-8xl">
                charts
            </h1>
            <p className="text-slate-400 text-2xl">
                A simple way to improve your portfolio
            </p>
            <div className="flex flex-row text-lg pt-2">
                <button className="bg-slate-200 flex-grow px-4 py-2 rounded-md hover:bg-slate-400 mr-10"><Link to="/dashboard">visit dashboard </Link></button>
                <button className="bg-green-400 text-white flex-grow px-4 py-2 rounded-md hover:bg-slate-400"><Link to="/how">how it works</Link></button>
            </div>
        </div>
    );
    }   
export default Home;