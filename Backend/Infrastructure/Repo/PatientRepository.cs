using Application.Interfaces;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace Infrastructure.Repo
{
    public class PatientRepository : IPatientRepository
    {
        private readonly AppDbContext _context;

        public PatientRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Patient> CreatePatient(Patient patient)
        {
            await _context.AddAsync(patient);
            await _context.SaveChangesAsync();
            return patient;
        }

       

        public async Task<List<Patient>> GetAllPatients()
        {
           return await _context.Patients.ToListAsync();
        }

        public async Task<Patient> GetPatientById(int id)
        {
            var pat = await _context.Patients.FirstOrDefaultAsync(t => t.Id == id);
            if(pat != null)
            {
                return pat;
            }
            return null;
        }

        public async Task<Patient> UpdatePatient(Patient patient)
        {
            try
            {
            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
            return patient;

            }
            catch (DbUpdateException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeletePatient(int id)
        {
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id == id);

            if (patient != null)
            {
                try
                {
                _context.Patients.Remove(patient);  
                await _context.SaveChangesAsync();

                }
                catch (DbUpdateException)
                {

                    throw new Exception ("sorry you cant delete this patient he have an appointment");
                }
            }
        }
    }
}
