import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import NotificationModal from "../../../components/Notification";
import axios from "axios"; // axios를 사용하여 백엔드 서버에 HTTP 요청을 보냅니다.
import Logo from "../../../components/Logo";

const routesBeforeNotification = [{ to: "/", name: "PictureBoard" }];

const routesAfterNotification = [
  { to: "/calendar", name: "Calendar" },
  { to: "/mypage", name: "Mypage" },
];

const NavItem = ({ mobile }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstLoad = useRef(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNotificationClick = async () => {
    try {
      const response = await axios.get("http://localhost:4000/quotes/random");
      setData([response.data]); // 데이터를 배열로 감싸서 설정합니다.
      setShowModal(true); // 명언을 가져온 후 모달을 표시합니다.
    } catch (error) {
      console.error("Error fetching random quote:", error);
    }
  };

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    // 로그인 상태를 확인하는 로직 추가
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:4000/auth/status");
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        const response = await axios.get("http://localhost:4000/quotes/random");
        setData([response.data]); // 데이터를 배열로 감싸서 설정합니다.
      } catch (error) {
        console.error("Error fetching random quote:", error);
      }
    };

    fetchRandomQuote();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/quotes/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching motivation quotes:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (location.pathname === "/" && !isFirstLoad.current) {
      window.location.reload();
    } else {
      isFirstLoad.current = false;
    }
  }, [location.pathname]);

  return (
    <div
      className={`text-dark-color font-bold text-xl h-full ${
        mobile ? "bg-gray-900" : ""
      }`}
    >
      <ul
        className={`text-md w-full h-4/5 flex ${
          mobile ? "flex-col" : "flex-col"
        } items-start justify-between`}
      >
        <li onClick={handleLogoClick} className="cursor-pointer">
          <Logo />
        </li>
        {routesBeforeNotification.map(({ to, name }) => (
          <li key={name} className="w-full text-left cursor-pointer">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `w-full block ${isActive ? "text-white" : ""} hover:text-white`
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
        <li className="w-full cursor-pointer">
          <button
            className="block w-full text-left hover:text-white"
            onClick={handleNotificationClick}
          >
            Notification
          </button>
        </li>
        {routesAfterNotification.map(({ to, name }) => (
          <li key={name} className="w-full text-left cursor-pointer">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `w-full block ${isActive ? "text-white" : ""} hover:text-white`
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
      <NotificationModal
        show={showModal}
        handleClose={handleCloseModal}
        data={data}
      />
    </div>
  );
};

NavItem.propTypes = {
  mobile: PropTypes.bool, // 필수로 요구하지 않음
};

export default NavItem;
