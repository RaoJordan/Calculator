[HttpPost("calculate")]
public ActionResult<double> CalculatePercentage([FromBody] List<MarksModel> marks)
{
    if (marks == null || !marks.Any())
    {
        return BadRequest("Marks cannot be empty");
    }

    _marksData.Clear();  // Clear previous data
    _marksData.AddRange(marks);

    double totalPercentage = 0;

    foreach (var mark in marks)
    {
        if (mark.MaxMarks <= 0)
        {
            return BadRequest("Max marks must be greater than zero");
        }

        double percentage = Math.Round(((double)mark.Marks / mark.MaxMarks) * 100, 2);
        totalPercentage += percentage;
    }

    double averagePercentage = totalPercentage / marks.Count;

    return Ok(averagePercentage);
}
