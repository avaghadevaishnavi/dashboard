import React, { useState } from "react";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    maritalStatus: "",
    dateOfBirth: "",
    religion: "",
    caste: "",
    motherTongue: "",
    annualIncome: "",
    photo: null,
    grNumber: "",
    abcId: "",
    courseName: "",
    year: "",
    address: "",
    city: "",
    state: "",
    district: "",
    pinCode: "",
    mobileNo: "",
    email: "",
    parentMobileNo: "",
    emergencyMobileNo: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, photo: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked ? value : "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Student data saved successfully!");
  };

  const handleReset = () => {
    setFormData({
      name: "",
      gender: "",
      maritalStatus: "",
      dateOfBirth: "",
      religion: "",
      caste: "",
      motherTongue: "",
      annualIncome: "",
      photo: null,
      grNumber: "",
      abcId: "",
      courseName: "",
      year: "",
      address: "",
      city: "",
      state: "",
      district: "",
      pinCode: "",
      mobileNo: "",
      email: "",
      parentMobileNo: "",
      emergencyMobileNo: "",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-purple-400 to-blue-400 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-center text-2xl font-bold text-white">Add Student</h1>
        
        {/* Personal Details */}
        <h3 className="text-lg font-semibold text-white">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold">Full Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white font-semibold">Gender*</label>
            <div className="flex gap-4 text-white">
              {["Male", "Female", "Other"].map((gender) => (
                <label key={gender} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    className="accent-blue-500 bg-white"
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Marital Status & Date of Birth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold">Marital Status*</label>
            <div className="flex gap-4 text-white">
              {["Yes", "No"].map((status) => (
                <label key={status} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="maritalStatus"
                    value={status}
                    checked={formData.maritalStatus === status}
                    onChange={handleChange}
                    className="accent-blue-500 bg-white"
                  />
                  {status === "Yes" ? "Married" : "Unmarried"}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-white font-semibold">Date of Birth*</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 bg-white rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Religion, Caste, Mother Tongue, Annual Income */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Religion", name: "religion" },
            { label: "Caste", name: "caste" },
            { label: "Mother Tongue", name: "motherTongue" },
            { label: "Annual Family Income", name: "annualIncome" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-white font-semibold">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className="w-full p-2 border border-gray-300 bg-white rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Upload Photo */}
        <div>
          <label className="block text-white font-semibold">Upload Photo*</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
          />
        </div>

        {/* Address Details */}
        <h3 className="text-lg font-semibold text-white">Address Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Address", name: "address" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "District", name: "district" },
            { label: "Pin Code", name: "pinCode" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-white font-semibold">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Contact Details */}
        <h3 className="text-lg font-semibold text-white">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Mobile No.", name: "mobileNo" },
            { label: "Email Id", name: "email" },
            { label: "Parent/Guardian Mobile No.", name: "parentMobileNo" },
            { label: "Emergency Mobile No.", name: "emergencyMobileNo" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-white font-semibold">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">Save</button>
          <button type="button" onClick={handleReset} className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
