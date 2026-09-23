using Application.Interfaces;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;


namespace Application.Services
{
    public class DoctorServices : IDoctorServices
    {
        private readonly IDoctorRepository _repository;

        public DoctorServices(IDoctorRepository repository)
        {
            _repository = repository;
        }
        public async Task<Doctor> CreateDoctorAsync(Doctor doctor)
        {
            return await _repository.CreateDoctor(doctor);
        }
        

        public async Task DeleteDoctorAsync(int id)
        {
            await _repository.DeleteDoctor(id);
        }

        public async Task<Doctor> GetDoctorByIdAsync(int id)
        {
          return  await _repository.GetDoctorByIdAsync(id);
        }

        public async Task<List<Doctor>> GetDoctorAsync()
        {
            return await _repository.GetAll();
        }

        public async Task<Doctor> UpdateDoctorAsync(Doctor doctor)
        {
            return await _repository.UpdateDoctor(doctor);
        }


    }

   


    }

