using Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces
{
    public interface IDoctorServices
    {
        public  Task<List<Doctor>> GetDoctorAsync();
        
        public  Task<Doctor> GetDoctorByIdAsync(int id);

        public Task<Doctor> CreateDoctorAsync(Doctor doctor);

        public Task DeleteDoctorAsync(int id);

        public Task<Doctor> UpdateDoctorAsync(Doctor doctor);
    }
}
