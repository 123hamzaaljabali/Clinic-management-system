using Application.Interfaces;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Security;
using System.Text;


namespace Application.Services
{
    public class PatientServices : IPatientServices
    {
        private readonly IPatientRepository _repository;

        public PatientServices(IPatientRepository repository)
        {
            _repository = repository;
        }

        public async Task<Patient> CreatePatient(Patient patient)
        {
            return await _repository.CreatePatient(patient);
        }

        public void DeletePatient(int id)
        {
             _repository.DeletePatient(id);
        }

        public Task<List<Patient>> GetAllPatients()
        {
            return _repository.GetAllPatients();
        }

        public Task<Patient> GetPatientById(int id)
        {
            return _repository.GetPatientById(id);
        }

        public Task<Patient> UpdatePatient(Domain.Model.Patient patient)
        {
            return _repository.UpdatePatient(patient);
        }

        Task IPatientServices.DeletePatient(int id)
        {
            return _repository.DeletePatient(id);
        }
    }




}

