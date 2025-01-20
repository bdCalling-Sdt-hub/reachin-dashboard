import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Admin from "../Pages/Dashboard/Admin";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
import TermsAndConditions from "../Pages/Dashboard/TermsAndCondition";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import User from "../Pages/Dashboard/User";
import Blogs from "../Pages/Dashboard/Blogs";
import FAQ from "../Pages/Dashboard/FAQ";
import SubscriptionEarning from "../Pages/Dashboard/SubscriptionEarning";
import PeoplesData from "../Pages/Dashboard/ManageData/PeoplesData";
import CompaniesData from "../Pages/Dashboard/ManageData/CompaniesData";
import AddPeoplesData from "../components/ui/ManageData/AddPeoplesData";
import AddCompaniesData from "../components/ui/ManageData/AddCompaniesData";
import OurStories from "../Pages/Dashboard/OurStories";
import UserTable from "../Pages/Dashboard/UserTable";
import ProtectedRoute from ".././routes/ProtectedRoute"
import Package from "../Pages/Dashboard/Package";
import Contact from "../Pages/Dashboard/Contact";


const router = createBrowserRouter([
    {
        path: "/",
        // element: <Main />,
        element: <ProtectedRoute><Main /></ProtectedRoute>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/user/:id",
                element: <User />
            },
            {
                path: "/registered-users",
                element: <UserTable />
            },
            {
                path: "/subscription-earning",
                element: <SubscriptionEarning />
            },
            {
                path: "/peoples-data",
                element: <PeoplesData />
            },
            {
                path: "/add-peoples-data",
                element: <AddPeoplesData />
            },
            {
                path: "/add-peoples-data/:id",
                element: <AddPeoplesData />
            },
            {
                path: "/companies-data",
                element: <CompaniesData />
            },
            {
                path: "/add-companies-data",
                element: <AddCompaniesData />
            },
            {
                path: "/add-companies-data/:id",
                element: <AddCompaniesData />
            },
            {
                path: "/admin",
                element: <Admin />
            },
            {
                path: "/blogs",
                element: <Blogs />
            },
            {
                path: "/package-setting",
                element: <Package />
            },

            {
                path: "/about-us",
                element: <OurStories />
            },
            {
                path: "/license-terms",
                element: <PrivacyPolicy />
            },
            {
                path: "/terms-and-conditions",
                element: <TermsAndConditions />
            },

            {
                path: "/change-password",
                element: <ChangePassword />
            },
            {
                path: "/faq",
                element: <FAQ />
            },
            {
                path: "/profile",
                element: <AdminProfile />
            },
            {
                path: "/notification",
                element: <Notifications />
            },
            {
                path: "/contact",
                element: <Contact />
            }

        ]
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
            {
                path: "/auth",
                element: <Login />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "verify-otp",
                element: <VerifyOtp />,
            },
            {
                path: "reset-password",
                element: <ResetPassword />,
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    }
]);

export default router;
