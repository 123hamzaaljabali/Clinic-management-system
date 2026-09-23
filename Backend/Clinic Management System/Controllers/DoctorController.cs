using Application.Interfaces;
using Application.Services;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Clinic_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorServices _services;
        public DoctorController(IDoctorServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var doctors = await _services.GetDoctorAsync();
            return Ok(doctors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctorById(int id)
        {
            var docc = await _services.GetDoctorByIdAsync(id);
            return Ok(docc);
        }

        [HttpPost]

        public async Task<IActionResult> CreateDoctor(Doctor doctor)
        {
            var doct = await _services.CreateDoctorAsync(doctor);
            return Ok(doct);
        }

        [HttpPut]

        public async Task<IActionResult> UpdateDoctor(Doctor doctor)
        {
            var doc = await _services.UpdateDoctorAsync(doctor);
            return Ok(doc);
        }
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeletableDoctor(int id)
        {
            await _services.DeleteDoctorAsync(id);
            return Ok("Deleted successfully");
        }

    }
}

