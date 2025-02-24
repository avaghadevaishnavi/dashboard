import React, { useState, useEffect } from "react";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    grNo: "",
    name: "",
    className: "",
    semYear: "",
    percentage: "",
    cgpa: "",
  });

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  // ✅ Sync localStorage when students change
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem("students", JSON.stringify(students));
    } else {
      localStorage.removeItem("students"); // Clear localStorage when no students exist
    }
  }, [students]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.grNo &&
      formData.name &&
      formData.className &&
      formData.semYear &&
      formData.percentage &&
      formData.cgpa
    ) {
      const updatedStudents = [...students, formData];
      setStudents(updatedStudents);
      setFormData({
        grNo: "",
        name: "",
        className: "",
        semYear: "",
        percentage: "",
        cgpa: "",
      });
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
  };

  // ✅ Fix: Remove only the selected student
  const handleRemove = (grNo) => {
    const updatedStudents = students.filter((student) => student.grNo !== grNo);
    setStudents(updatedStudents);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Percentage List</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 shadow-md rounded-lg">
        {["grNo", "name", "className", "semYear", "percentage", "cgpa"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-gray-700 font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
        ))}
        <button type="submit" className="md:col-span-3 bg-indigo-600 text-white px-4 py-2 rounded mt-4 hover:bg-indigo-700">
          {students.some((s) => s.grNo === formData.grNo) ? "Update Student" : "Add Student"}
        </button>
      </form>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              {["GR No", "Name", "Class", "Sem/Year", "Percentage", "CGPA", "Actions"].map((heading) => (
                <th key={heading} className="p-4 text-left">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="p-4">{student.grNo}</td>
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.className}</td>
                  <td className="p-4">{student.semYear}</td>
                  <td className="p-4">{student.percentage}</td>
                  <td className="p-4">{student.cgpa}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition duration-300"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 transition duration-300 ml-2"
                      onClick={() => handleRemove(student.grNo)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">No students added yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
