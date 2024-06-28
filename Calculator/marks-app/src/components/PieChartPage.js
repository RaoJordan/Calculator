import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';
import { Pie } from "react-chartjs-2";

// Register the required components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const PieChartPage = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(null);

  const handleBack = () => {
    // Navigate back to the Home Page
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5017/api/marks/marks");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data)
        // Assuming data is an array of objects with { subject: string, marks: number }
        const chartData = {
          labels: data.map(item => item.subject),
          datasets: [
            {
              label: "Marks Distribution",
              data: data.map(item => item.marks),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40"
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40"
              ]
            }
          ]
        };
        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          Pie Chart of Marks Distribution
        </h1>
        {chartData ? (
          <div className="w-full">
            <Pie data={chartData} />
          </div>
        ) : (
          <p>Loading chart...</p>
        )}
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
