import { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Study from "./componenet/Study";
import Events from "./componenet/Events";
import Holiday from "./componenet/Holiday";
import ChatBot from "./componenet/ChatBot";
import Examination from "./componenet/Examination";
import StudentForm from "./componenet/StudentForm";

function App() {
  const [selected, setSelected] = useState("Dashboard"); // ✅ Set "Dashboard" as default
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 515);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 515);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 515) {
        setIsSidebarOpen(false);
        setIsSmallScreen(true);
      } else {
        setIsSidebarOpen(true);
        setIsSmallScreen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const content = {
    Dashboard: <Study />,
    Student: <StudentForm />,
    Course: <Holiday />,
    Event: <Events />,
    Examination: <Examination />,
    ChatBot: <ChatBot />,
  };

  return (
    <div className="flex h-screen relative">
      {/* Left Sidebar (Overlays on small screens) */}
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
          {Object.keys(content).map((item) => (
            <li
              key={item}
              className={`p-3 cursor-pointer rounded-lg ${
                selected === item ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
              onClick={() => {
                setSelected(item);
                if (isSmallScreen) setIsSidebarOpen(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content Area */}
      <div className="flex-grow p-5 overflow-y-auto h-screen transition-all duration-300">
        {/* Sidebar Toggle Button (Appears only when sidebar is hidden on small screens) */}
        {isSmallScreen && !isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white bg-gray-800 p-3 rounded-md hover:bg-gray-700 fixed top-5 left-5 z-10"
          >
            <IoMenu size={24} />
          </button>
        )}

        <div className="text-gray-700">{content[selected]}</div>
      </div>
    </div>
  );
}

export default App;
