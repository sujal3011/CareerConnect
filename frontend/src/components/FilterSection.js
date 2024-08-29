import React from 'react';

const FilterSection = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Filter Jobs</h2>

      {/* Job Type */}
      <div className="mb-4">
        <label className="block text-gray-700">Job Type</label>
        <select className="w-full p-2 border border-gray-300 rounded-lg">
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter location" />
      </div>

      {/* Salary Range */}
      <div className="mb-4">
        <label className="block text-gray-700">Salary Range</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter salary range" />
      </div>

      {/* Experience Years */}
      <div className="mb-4">
        <label className="block text-gray-700">Experience Years</label>
        <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter years of experience" />
      </div>

      {/* Department */}
      <div className="mb-4">
        <label className="block text-gray-700">Department</label>
        <select className="w-full p-2 border border-gray-300 rounded-lg">
          {/* Example options, replace with actual departments */}
          <option>Engineering</option>
          <option>Marketing</option>
          <option>Sales</option>
          <option>Human Resources</option>
        </select>
      </div>

      {/* Role Category */}
      <div className="mb-4">
        <label className="block text-gray-700">Role Category</label>
        <select className="w-full p-2 border border-gray-300 rounded-lg">
          {/* Example options, replace with actual role categories */}
          <option>Software Engineer</option>
          <option>Project Manager</option>
          <option>Data Analyst</option>
          <option>Product Manager</option>
        </select>
      </div>

      <button className="bg-blue-600 text-white p-2 rounded-lg w-full">Apply Filters</button>
    </div>
  );
};

export default FilterSection;