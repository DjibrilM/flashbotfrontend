
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";

const Root = () => {
    const navigate = useNavigate();
    let [isloading, setIsLoading] = useState<boolean>(false);

    return <>
        {isloading ? <p>loading</p> :
            <>
                <Outlet />
            </>
        }

    </>;
};

export default Root;
