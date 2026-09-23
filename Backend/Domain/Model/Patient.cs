using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;
namespace Domain.Model
{
    public class Patient
    {
        public int Id { get; set; }

        [Required]
        public string  FirstName { get; set; } = string.Empty;
        [Required]

        public string LastName { get; set; } = string.Empty;

        public string? Photo { get; set; }

        [Required]
        [Phone]
        public string MobileNumber { get; set; } = string.Empty ;

        [Range(1, int.MaxValue)]
        [Required]
        public int DoctorId { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [JsonIgnore]
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();



    }
}
