using Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;
using Domain.Model;
namespace Application.Interfaces
{
    public interface IPatientServices
    {
        public Task<List<Patient>> GetAllPatients();

        public Task<Patient> GetPatientById(int id);

        public Task<Patient> CreatePatient(Patient patient);

        public Task<Patient> UpdatePatient(Patient patient);

        public Task DeletePatient(int id);
    }
}
