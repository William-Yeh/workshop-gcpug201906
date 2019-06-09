namespace TodoApi.Models
{
    public class TodoItem
    {
        private string name = "";

        public long Id { get; set; }
        public string Name {
            // hack the GET content on purpose!
            get { return name.ToUpper(); }
            set { name = value; }
        }
        public bool IsComplete { get; set; }
    }
}