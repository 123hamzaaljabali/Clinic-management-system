using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using static Domain.Model.Appointment;

namespace Domain.Model
{
    public class Appointment
    {
        public int Id { get; set; }
        [Required] 
        public Doctor? Doctor { get; set; }
        [Required]

        [Range(1, int.MaxValue)]
        public int DoctorId { get; set; }
        [Required]

        public Patient? Patients { get; set; }
        [Range(1, int.MaxValue)]

        [Required]

        public int PatientId { get; set; }
        [Required]


        public AppointmentStatus Status { get; set; }
        [Required]

        public DateOnly DateOnly { get; set; }
        [Required]

        public TimeOnly Time { get; set; }


        public enum AppointmentStatus
        {
            Scheduled,
            Cancelled,
            Completed
        
        }
        [Required]


        public string Notes { get; set; }
    }
}
