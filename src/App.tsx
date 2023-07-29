import { Route, Routes } from "react-router";
import { useNavigate } from "react-router";
import { Chat } from "./screens/chat/Chat";
import ChatDetail from "./screens/chatDetail/ChatDetail";
import UnknownPage from "./screens/404/404";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/register";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/localStorage";
import { useRecoilState } from "recoil";
import { authenticationAtom } from "../recoil/atoms/authentication";
import { Triangle } from "react-loader-spinner";
import axios from "axios";


function App() {
  let [isLoading, setLoading] = useState<boolean>(true);
  const { getItem, clearItem } = useLocalStorage();
  const [authState, setAuthState] = useRecoilState(authenticationAtom);
  const navigate = useNavigate();


  useEffect(() => {

    const authentication = async () => {
      setLoading(true)
      const getAuthenticationcrediantial = getItem("auth");

      if (!getAuthenticationcrediantial) {
        setAuthState({ ...authState, isLoggedIn: false });
        setLoading(false)
      } else {
        try {
          const { data } = await axios.post("http://localhost:3000/auth/verifyToken", {
            token: getAuthenticationcrediantial.token,
          }, { withCredentials: true });

          setAuthState({
            userProfileImage: data?.profileImage,
            isLoggedIn: true
          });
          setLoading(false);
          navigate({ pathname: "/home" });

        } catch (error) {
          setAuthState({ ...authState, isLoggedIn: false });
          clearItem("authentication");
          setLoading(false);
        }

      }
    }

    authentication();
  }, [])


  return (
    isLoading ? (
      <div className="min-h-screen w-full flex justify-center pt-32 bg-[#131d2f]">
        <div className="absolute">
          <Triangle
            height="80"
            width="80"
            color="#fff"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
        <div className="w-full flex pt-32 text-gray-200  justify-center"><h2>. . . Loading</h2></div>
      </div>
    ) :
      <>
        <Routes>
          <Route path="*" element={<UnknownPage />} />
          {authState.isLoggedIn ?
            <Route path="/home?" element={<Chat />}>
              <Route path="conversation/:id" Component={() => <ChatDetail />} />
              <Route path="H1" Component={() => <>a page</>} />
            </Route>
            :
            <>
              <Route path="/login?" Component={() => <Login />} />
              <Route path="/register" Component={() => <Register />} />
            </>
          }
        </Routes>
      </>
  )
}

export default App
