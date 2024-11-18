import React from "react";
import TotalSubscriptions from "../../components/ui/Home/TotalSubscriptions";
import TotalUser from "../../components/ui/Home/TotalUser";
import TotalSearching from "../../components/ui/Home/TotalSearching";

const Home = () => {
    return (
        <div>

            <TotalSubscriptions />
            <div className="mt-10">
                <TotalUser />
            </div>

            <div className="mt-10">
                <TotalSearching />
            </div>

        </div>
    );
}

export default Home;