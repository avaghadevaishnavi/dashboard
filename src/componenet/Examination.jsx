import React ,{useState}from 'react';
import { IoMenu, IoClose } from "react-icons/io5";

function Examination() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="font-sans min-h-screen">
    {/* Navbar */}
    <nav className="flex items-center justify-between bg-pink-500 text-white p-4">
      {/* Logo */}
      <div className="text-lg font-bold">Examination Page</div>

      {/* Mobile Menu Button */}
      <button
        className="text-white text-2xl md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <IoClose /> : <IoMenu />}
      </button>

      {/* Menu Items (Responsive) */}
      <ul
        className={`absolute md:static top-14 left-0 w-full md:w-auto bg-pink-500 md:bg-transparent p-4 md:p-0 flex flex-col md:flex-row md:space-x-4 transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        } md:flex`}
      >
        {["BCA", "BMS", "BCom", "BScIT"].map((course) => (
          <li key={course} className="relative group">
            <button className="text-white text-lg">{course}</button>

            {/* Dropdown Menu */}
            <div className="hidden group-hover:block absolute left-0 top-full bg-white text-black rounded-md shadow-lg mt-1 w-24">
              {["FY", "SY", "TY"].map((year) => (
                <div key={year} className="px-4 py-2 hover:bg-gray-200">
                  {year}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {/* Search Icon */}
      <div className="text-xl hidden md:block">🔍</div>
    </nav>
      <div className="flex justify-center gap-6 mt-6 flex-wrap">
        <Section title="Exam Timetable" />
        <Section title="Percentage/CGPA" />
        <Section title="Previous Year Question Paper" />
        <Section title="Question Bank" />
        <Section title="Exam Submission" />
      </div>
    </div>
  );
}

function Section({ title }) {
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
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
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
