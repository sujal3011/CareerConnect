import React from 'react';
import FilterSection from '../components/FilterSection';
import JobListSection from '../components/JobListSection';

const Opportunities = () => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-4 p-4">
      {/* Filter Section */}
      <div className="w-full lg:w-1/4">
        <FilterSection />
      </div>

      {/* Job List Section */}
      <div className="w-full lg:w-3/4">
        <JobListSection />
      </div>
    </div>
  );
};

export default Opportunities;