    using Application.Interfaces;
using Application.Services;
    using Domain.Model;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore.Query.Internal;
    namespace Clinic_Management_System.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class PatientController : ControllerBase
        {
            private readonly IPatientServices _patient;
        private readonly CreatePatientCommandHandler _handler;
            public PatientController(IPatientServices patient , CreatePatientCommandHandler handler)
            {
                _patient = patient;
            _handler = handler;
            }

            [HttpGet]
            public async Task<IActionResult> GetAll()
            {
                var patients = await _patient.GetAllPatients();
                return Ok(patients);
            }

            [HttpGet("{id}")]
            public async Task<IActionResult> GetById(int id)
            {
                var patient = await _patient.GetPatientById(id);

                if (patient == null)
                {
                    return NotFound("Patient not found");
                }

                return Ok(patient);
            }


        [HttpPost] public async Task<IActionResult> CreatePatient([FromForm] Patient patient, [FromForm] IFormFile? photo)
        {   
            if (photo != null)
            { var folderPath = Path.Combine(Directory.GetCurrentDirectory(),
                 "wwwroot", "uploads", "patients");
                Directory.CreateDirectory(folderPath);
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(photo.FileName);
                var filePath = Path.Combine(folderPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                { await photo.CopyToAsync(stream);
                } patient.Photo = "/uploads/patients/" + fileName; }

            var command = new CreatePatientCommand
            {
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                MobileNumber = patient.MobileNumber,
                Email= patient.Email,
                Photo = patient.Photo,
                DoctorId = patient.DoctorId,
            };
            


             await _handler.Handle(command);
            return Ok(patient); }

        [HttpPut]

            public async Task<IActionResult> UpdatePatient(Patient patient) {
            try
            {
                var p = await _patient.UpdatePatient(patient);
                return Ok(p);
            }
            catch (Exception ex)
            {

                return BadRequest(new { message = ex.Message });
            }
            
            }


            [HttpDelete("{id}")]
            public async Task<IActionResult> DeletePatient(int id)
            {
            try
            {
                await _patient.DeletePatient(id);
                return Ok("Patient deleted successfully");

            }
            catch (Exception ex)
            {

                return Conflict(new { message = ex.Message });
            }
            }
        }
    }
