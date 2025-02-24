import React, { useState, useEffect } from 'react';

const Holiday = () => {
  const [courses, setCourses] = useState([]);
  const [courseClass, setCourseClass] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(savedCourses);
  }, []);

  const saveCourses = (courses) => {
    localStorage.setItem('courses', JSON.stringify(courses));
    setCourses(courses);
  };

  const handleAddOrUpdateCourse = (e) => {
    e.preventDefault();

    if (courseClass && courseName && courseDuration) {
      const newCourse = { class: courseClass, name: courseName, duration: courseDuration };

      if (editingIndex !== null) {
        const updatedCourses = [...courses];
        updatedCourses[editingIndex] = newCourse;
        saveCourses(updatedCourses);
        setEditingIndex(null);
      } else {
        saveCourses([...courses, newCourse]);
      }

      setCourseClass('');
      setCourseName('');
      setCourseDuration('');
    }
  };

  const handleEditCourse = (index) => {
    const course = courses[index];
    setCourseClass(course.class);
    setCourseName(course.name);
    setCourseDuration(course.duration);
    setEditingIndex(index);
  };

  const handleDeleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    saveCourses(updatedCourses);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8 w-full">
      <h1 className="text-center text-2xl font-bold text-green-600 mb-6">Course List</h1>
      
      {/* Course Form */}
      <form onSubmit={handleAddOrUpdateCourse} className="flex flex-col gap-4">
        <label className="text-gray-700 font-medium">Class:</label>
        <input
          type="text"
          id="courseClass"
          value={courseClass}
          onChange={(e) => setCourseClass(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
        />

        <label className="text-gray-700 font-medium">Course Name:</label>
        <textarea
          id="courseName"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
          rows="3"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
        ></textarea>

        <label className="text-gray-700 font-medium">Duration:</label>
        <input
          type="text"
          id="courseDuration"
          value={courseDuration}
          onChange={(e) => setCourseDuration(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition w-full"
        >
          {editingIndex !== null ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      {/* Saved Courses Table (Scrollable on Small Screens) */}
      <h2 className="text-xl font-semibold text-gray-800 mt-6">Saved Courses</h2>
      <div className="overflow-x-auto">
        <table className="w-full mt-4 border border-gray-300 rounded-lg overflow-hidden min-w-[300px]">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left hidden sm:table-cell">Course Name</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-3">{course.class}</td>
                <td className="p-3 hidden sm:table-cell">{course.name}</td>
                <td className="p-3">{course.duration}</td>
                <td className="p-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEditCourse(index)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holiday;
