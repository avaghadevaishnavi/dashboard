import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";


function Examination() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Use navigate hook

  return (
    <div className="font-sans min-h-screen">
      <nav className="flex items-center justify-between bg-pink-500 text-white p-4">
        <div className="text-lg font-bold">Examination Page</div>
        <button className="text-white text-2xl md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </nav>

      {/* Sections */}
      <div className="flex justify-center gap-6 mt-6 flex-wrap">
        <Section title="Exam Timetable" />
        <Section title="Percentage/CGPA" navigate={navigate} /> {/* Pass navigate */}
        <Section title="Previous Year Question Paper" />
        <Section title="Question Bank" />
        <Section title="Exam Submission" />
      </div>
    </div>
  );
}

function Section({ title, navigate }) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 w-72 text-left shadow-md">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <table className="w-full border-collapse mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Action</th>
            <th className="border px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents bubbling issues
                  if (navigate) navigate("/student-list"); // ✅ Navigate correctly
                }}
              >
                Add
              </button>
            </td>
            <td className="border px-4 py-2">Add a new record to {title.toLowerCase()}.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Examination;
