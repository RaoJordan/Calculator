using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc; // Add this namespace for ControllerBase and related attributes
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();

// Models/MarksModel.cs
public class MarksModel
{
    public string Subject { get; set; }
    public int Marks { get; set; }
}

// Controllers/MarksController.cs
[ApiController]
[Route("[controller]")]
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
