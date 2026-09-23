using Application.Interfaces;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Clinic_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentSerivices _appointmentSerivices;

        public AppointmentController(IAppointmentSerivices appointmentSerivice)
        {
            _appointmentSerivices = appointmentSerivice;
        }
        [HttpGet]

        public async Task<IActionResult> GetAppointment()
        {
            var app = await _appointmentSerivices.GetAppointments();
            return Ok(app);


        }


        [HttpGet("doctor/{id}")]
        public async Task<IActionResult> GetAppointmentsByDoctorId(int id) {
            var docAppointment = await _appointmentSerivices.GetAppointmentByDoctorId(id);
            return Ok(docAppointment);
        }

        [HttpGet("statistics/doctor")]
        public async Task<IActionResult> GetAppointmentByDoctor()
        {
            var statistics = await _appointmentSerivices.GetAppointmentByDoctor();

            return Ok(statistics);
        }
        [HttpGet("patients/{id}")]
        public async Task<IActionResult> GetAppointmentByPatientId(int id)
        {
            var patientAppointment = await _appointmentSerivices.GetAppointmentByPatientId(id);
            return Ok(patientAppointment);
        }
        [HttpGet("by-date/{date}")]
        public async Task<IActionResult> GetAppointmentByDate(DateOnly date)
        {
            var DayAppointment = await _appointmentSerivices.GetAppointmentByDate(date);

            return Ok(DayAppointment);
        }

        [HttpGet("statistics")]
        public async Task<IActionResult> GetAppointmentStatistics()
        {
            var statistics = await _appointmentSerivices.GetAppointmentStatistics();

            return Ok(statistics);
        }
        [HttpGet("statistics/status")]
        public async Task<IActionResult> GetAppointmentStatusStatistics()
        {
            var statistics = await _appointmentSerivices.GetAppointmentStatusStatistics();

            return Ok(statistics);
        }
        [HttpPost]

        public async Task<IActionResult> CreateAppointment(Appointment appointments)
        {
            try
            {
                var apoi = await _appointmentSerivices.CreateAppointment(appointments);
                return Ok(apoi);

            }
            catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]

        public async Task<IActionResult> UpdateAppointment(Appointment appointment)
        {
            var appo = await _appointmentSerivices.UppdateAppointment(appointment);
            return Ok(appo);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
             await _appointmentSerivices.RemoveAppointment(id);
            return Ok("removed successfully");
        }
    }
}
