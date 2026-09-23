using Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces
{
    public interface IDoctorRepository
    {
        public  Task<List<Doctor>> GetAll();

        public Task<Doctor> GetDoctorByIdAsync(int id);


        public Task<Doctor> CreateDoctor(Doctor doctor);

        public Task DeleteDoctor(int id);

        public Task<Doctor> UpdateDoctor(Doctor doctor);
    }
}
