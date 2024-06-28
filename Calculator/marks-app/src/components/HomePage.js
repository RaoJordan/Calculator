import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

const initialSubjects = [
  { id: 1, name: "Calculus" },
  { id: 2, name: "Algebra" },
  { id: 3, name: "Electronics" },
  { id: 4, name: "Analog Circuits" },
  { id: 5, name: "Humanities" },
];

const HomePage = () => {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [marks, setMarks] = useState(Array(initialSubjects.length).fill(""));
  const [percentage, setPercentage] = useState(0);
  const navigate = useNavigate();

  const handleCalculatePercentage = async () => {
    try {
      const marksToSend = Object.keys(marks).map((subject, index) => {
        return { Subject: subject, Marks: marks[subject] };
      });
  
      const response = await fetch("http://localhost:5017/marks/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(marksToSend),
      });
  
      if (!response.ok) {
        throw new Error("Failed to calculate percentage");
      }
  
      const data = await response.json();
      setPercentage(data);
    } catch (error) {
      console.error("Error calculating percentage:", error);
      // Handle error (e.g., show a message to the user)
    }
  };
  

  const handleNextPage = () => {
    navigate("/piechart");
  };

  const handleAddSubject = () => {
    const newSubject = {
      id: subjects.length + 1,
      name: "",
    };
    setSubjects([...subjects, newSubject]);
    setMarks([...marks, ""]);
  };

  const handleDeleteSubject = (index) => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);

    const newMarks = [...marks];
    newMarks.splice(index, 1);
    setMarks(newMarks);
  };

  const handleSubjectNameChange = (index, newName) => {
    const newSubjects = [...subjects];
    newSubjects[index].name = newName;
    setSubjects(newSubjects);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" p-6  shadow-lg bg-purple-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4">Subject Name</th>
              <th className="py-2 px-4">Marks</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={subject.id}>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) =>
                      handleSubjectNameChange(index, e.target.value)
                    }
                    className="w-40 px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    value={marks[index]}
                    onChange={(e) => {
                      const newMarks = [...marks];
                      newMarks[index] = e.target.value;
                      setMarks(newMarks);
                    }}
                    className="w-20 px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
                  />
                </td>
                <td className="py-2 px-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteSubject(index)}
                    className="text-red-500"
                  >
                    <MdDeleteForever />
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4  flex justify-center">
          <button
            onClick={handleAddSubject}
            className=" bg-blue-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-100
 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
          >
            Add Subject
          </button>
          <button
            onClick={handleCalculatePercentage}
            className="bg-green-500  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-100 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
          >
            Calculate Percentage
          </button>
        </div>
        <div className="mt-4 mr-10 flex justify-center">
          {percentage > 0 && (
            <p className="bg-blue-100 text-blue-900 px-4 py-2 rounded">
              Percentage: {percentage}%
            </p>
          )}
        </div>
        <div className="flex justify-center mr-10 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextPage}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 border-gray-100"
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
