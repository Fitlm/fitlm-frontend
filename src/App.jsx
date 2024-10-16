import "./App.css";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./layout/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./store/thunkFunctions";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";
import Mypage from "./pages/MyPage";
import CalendarPage from "./pages/CalendarPage";
import PictureBoardPage from "./pages/PictureBoardPage";

function Layout() {
  const isAuth = useSelector((state) => state.user?.isAuth);

  return (
    <div className="flex flex-col items-center h-screen bg-[#e2d7d2] overflow-hidden">
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <div className="flex flex-row w-full h-full">
        {isAuth && <Navbar className="w-1/6 h-full" />}
        <main
          className={`flex-1 flex items-center justify-center mx-auto w-full ${
            isAuth ? "" : "pl-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user?.isAuth);
  const { pathname } = useLocation();
  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={isAuth ? <PictureBoardPage /> : <LoginPage />} />

        {/*로그인한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Route>

        {/*로그인한 사람만 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
