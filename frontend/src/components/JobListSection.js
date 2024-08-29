import React from 'react';

const JobListSection = () => {
  const jobs = [
    { id: 1, title: 'Frontend Developer', company: 'Company A', location: 'New York', experience: 'Mid Level' },
    { id: 2, title: 'Backend Developer', company: 'Company B', location: 'San Francisco', experience: 'Senior Level' },
    // Add more jobs here
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Job Listings</h2>
      {jobs.map(job => (
        <div key={job.id} className="border-b border-gray-200 py-4">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p>{job.company} - {job.location}</p>
          <p className="text-gray-600">{job.experience}</p>
        </div>
      ))}
    </div>
  );
};

export default JobListSection;