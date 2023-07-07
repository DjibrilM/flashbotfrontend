
import { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router";
import { useNavigate, Navigate, useLocation } from "react-router";
import { useLocalStorage } from "../hooks/localStorage";
import HomeLoader from "../components/homeLoader/HomeLoader";

const Root = () => {
    const navigate = useNavigate();
    let [isLoading, setLoading] = useState<boolean>(true);
    const { getItem, setItem } = useLocalStorage();
    const navigation = useLocation();

    console.log(navigation.pathname);

    const checkAuthToken = () => {
        const authToken = getItem("auth");
        if (!authToken) {
            setLoading(false);
            navigate('login');
        } else {

        }
    };


    useEffect(() => {
        ///check if there is any auth token 
        checkAuthToken();
    }, [])


    return <main className="w-full min-h-screen bg-[#131d2f]">
        {isLoading ? <HomeLoader /> :
            <>
                <Outlet />
            </>
        }

    </main>;
};

export default Root;
