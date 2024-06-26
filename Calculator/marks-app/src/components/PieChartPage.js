import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PieChartPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Navigate back to the Home Page
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          Pie Chart of Marks Distribution
        </h1>
        {/* Add your pie chart component here */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="bg-purple-500 text-white px-4 py-2 rounded mt-4 hover:bg-purple-600"
        >
          Back
        </motion.button>
      </div>
    </div>
  );
};

export default PieChartPage;
