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
  const [subjects, setSubjects] = useState(initialSubjects.map(subject => ({ ...subject, marks: "", maxMarks: "" })));
  const [percentage, setPercentage] = useState(0);
  const navigate = useNavigate();

  const handleCalculatePercentage = async () => {
    try {
      // Validation check for marks exceeding max marks
      for (const subject of subjects) {
        if (parseInt(subject.marks, 10) > parseInt(subject.maxMarks, 10)) {
          window.alert(`Marks for ${subject.name} cannot be greater than Max Marks`);
          return;
        }
      }

      const marksToSend = subjects.map(subject => ({
        Subject: subject.name,
        Marks: parseInt(subject.marks, 10),
        MaxMarks: parseInt(subject.maxMarks, 10),
      }));

      const response = await fetch("http://localhost:5017/api/marks/calculate", {
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
      setPercentage(data.toFixed(2));
    } catch (error) {
      console.error("Error calculating percentage:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const handleNextPage = async () => {
    navigate("/piechart");
  };

  const handleAddSubject = () => {
    const newSubject = {
      id: subjects.length + 1,
      name: "",
      marks: "",
      maxMarks: "",
    };
    setSubjects([...subjects, newSubject]);
  };

  const handleDeleteSubject = (index) => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const handleSubjectNameChange = (index, newName) => {
    const newSubjects = [...subjects];
    newSubjects[index].name = newName;
    setSubjects(newSubjects);
  };

  const handleMarksChange = (index, newMarks) => {
    const newSubjects = [...subjects];
    newSubjects[index].marks = newMarks;
    setSubjects(newSubjects);
  };

  const handleMaxMarksChange = (index, newMaxMarks) => {
    const newSubjects = [...subjects];
    newSubjects[index].maxMarks = newMaxMarks;
    setSubjects(newSubjects);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 shadow-lg bg-purple-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4">Subject Name</th>
              <th className="py-2 px-4">Marks Scored</th>
              <th className="py-2 px-4">Max Marks</th>
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
                    value={subject.marks}
                    onChange={(e) =>
                      handleMarksChange(index, e.target.value)
                    }
                    className="w-20 px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    value={subject.maxMarks}
                    onChange={(e) =>
                      handleMaxMarksChange(index, e.target.value)
                    }
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
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleAddSubject}
            className="bg-blue-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-100 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
          >
            Add Subject
          </button>
          <button
            onClick={handleCalculatePercentage}
            className="bg-green-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-100 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
          >
            Calculate Percentage
          </button>
        </div>
        <div className="mt-4 mr-10 flex justify-center">
          {percentage > 0 && (
            <p className="bg-blue-100 text-blue-900 px-4 py-2 rounded">
              Average Percentage: {percentage}%
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
