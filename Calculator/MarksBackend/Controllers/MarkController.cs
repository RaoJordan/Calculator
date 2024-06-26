using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace MarksBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarksController : ControllerBase
    {
        [HttpPost("calculatePercentage")]
        public ActionResult<double> CalculatePercentage([FromBody] int[] marks)
        {
            if (marks == null || marks.Length == 0)
            {
                return BadRequest("Marks array is empty.");
            }

            double totalMarks = marks.Sum();
            double percentage = (totalMarks / (marks.Length * 100)) * 100;

            return Ok(Math.Round(percentage, 2));
        }
    }
}