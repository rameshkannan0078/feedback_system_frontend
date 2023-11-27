import React from 'react';
import NoDataImage from '../../Assets/No_data.png';

const BaNoDataFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center h-full ml-auto">
        <img src={NoDataImage} alt="No Data Found" className="mb-4 w-1/2" />
        <p className="text-gray-600 text-2xl font-semibold">No Data Found</p>
      </div>
    </div>
  );
};

export default BaNoDataFound;
