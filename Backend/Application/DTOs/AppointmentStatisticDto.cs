using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DTOs
{
    public class AppointmentStatisticDto
    {
        public DateOnly Date { get; set; }
        public int Count { get; set; }
    }
}
