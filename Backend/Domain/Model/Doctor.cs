
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace Domain.Model
    {
        public class Doctor
        {
            public int Id { get; set; }
        [Required]
            public string FirstName {  get; set; } = string.Empty;
        [Required]

            
        public string LastName { get; set; } = string.Empty;
        [Required]

        public string Specialty {  get; set; } = string.Empty;
        [Required]
        [Phone]
        public string MobileNumber { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [JsonIgnore]
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
    }
