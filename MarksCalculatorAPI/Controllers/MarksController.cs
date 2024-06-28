using Microsoft.AspNetCore.Mvc;
using MarksCalculatorAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace MarksCalculatorAPI.Controllers
{
    [ApiController]
    [Route("api/marks")]
    public class MarksController : ControllerBase
    {
        private static List<MarksModel> _marksData = new List<MarksModel>();

        [HttpPost("calculate")]
        public ActionResult<double> CalculatePercentage([FromBody] List<MarksModel> marks)
        {
            if (marks == null || !marks.Any())
            {
                return BadRequest("Marks cannot be empty");
            }

            // Clear old data before adding new data
            _marksData.Clear();
            _marksData.AddRange(marks);

            double totalMarks = marks.Sum(m => m.Marks);
            double totalMaxMarks = marks.Sum(m => m.MaxMarks);

            if (totalMarks > totalMaxMarks)
            {
                return BadRequest("Marks cannot be greater than Max Marks");
            }

            double percentage = Math.Round((totalMarks / totalMaxMarks) * 100, 2);
            return Ok(percentage);
        }

        [HttpGet("marks")]
        public ActionResult<List<MarksModel>> GetMarksData()
        {
            return Ok(_marksData);
        }
    }
}
