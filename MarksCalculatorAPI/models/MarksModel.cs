namespace MarksCalculatorAPI.Models
{
    public class MarksModel
    {
        public string? Subject { get; set; }
        public int Marks { get; set; }
        public int MaxMarks { get; set; } // New property for maximum marks
    }
}
