import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Study from "./componenet/Study";
import Events from "./componenet/Events";
import Holiday from "./componenet/Holiday";
import ChatBot from "./componenet/ChatBot";
import Examination from "./componenet/Examination";
import StudentForm from "./componenet/StudentForm";
import StudentList from "./componenet/SubExamin/StudentList";

// Sidebar Component
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, isSmallScreen }) => {
  const navigate = useNavigate(); // ✅ Use React Router for navigation

  return (
    <div
      className={`bg-gray-800 text-white p-5 flex-shrink-0 transition-all duration-300 ${
        isSmallScreen
          ? `absolute left-0 top-0 h-full w-3/4 shadow-lg z-50 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`
          : "w-1/4 relative"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-white p-2 rounded-md hover:bg-gray-700"
        >
          <IoClose size={24} />
        </button>
      </div>
      <ul>
        {/* Sidebar Links */}
        {[
          { name: "Dashboard", path: "/" },
          { name: "Student Form", path: "/student-form" },
          { name: "Course", path: "/course" },
          { name: "Event", path: "/event" },
          { name: "Examination", path: "/examination" },
          { name: "ChatBot", path: "/chatbot" },
        ].map((item) => (
          <li
            key={item.name}
            className="p-3 cursor-pointer rounded-lg hover:bg-gray-700"
            onClick={() => {
              navigate(item.path); // ✅ Navigate using React Router
              if (isSmallScreen) setIsSidebarOpen(false);
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 515);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 515);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsSidebarOpen(screenWidth > 515);
      setIsSmallScreen(screenWidth <= 515);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <div className="flex h-screen relative">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isSmallScreen={isSmallScreen}
        />

        {/* Main Content Area */}
        <div className="flex-grow p-5 overflow-y-auto h-screen transition-all duration-300">
          {isSmallScreen && !isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-white bg-gray-800 p-3 rounded-md hover:bg-gray-700 fixed top-5 left-5 z-10"
            >
              <IoMenu size={24} />
            </button>
          )}

          {/* ✅ React Router Handles Navigation */}
          <Routes>
            <Route path="/" element={<Study />} />
            <Route path="/examination" element={<Examination />} />
            <Route path="/student-form" element={<StudentForm />} />
            <Route path="/student-list" element={<StudentList />} />
            <Route path="/course" element={<Holiday />} />
            <Route path="/event" element={<Events />} />
            <Route path="/chatbot" element={<ChatBot />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
