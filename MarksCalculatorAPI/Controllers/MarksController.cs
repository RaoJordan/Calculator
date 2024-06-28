using Microsoft.AspNetCore.Mvc;
using MarksCalculatorAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace MarksCalculatorAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MarksCalculatorAPI : ControllerBase
    {
        private static List<MarksModel> _marksData = new List<MarksModel>();
        [HttpPost("calculate")]
        public ActionResult<double> CalculatePercentage([FromBody] List<MarksModel> marks)
        {
            if (marks == null || !marks.Any())
            {
                return BadRequest("Marks cannot be empty");
            }
            _marksData.AddRange(marks);
            double totalMarks = marks.Sum(m => m.Marks);
            double percentage = (totalMarks / (marks.Count * 100)) * 100;
            return Ok(percentage);
        }
    [HttpGet("marks")]
    public ActionResult<List<MarksModel>> GetMarksData()
    {
        return Ok(_marksData); // Endpoint to retrieve stored marks data
    }
    }
}
