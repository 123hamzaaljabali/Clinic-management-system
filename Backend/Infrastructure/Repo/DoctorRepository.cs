using Application.Interfaces;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Repo
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly AppDbContext _context;

        public DoctorRepository (AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Doctor>> GetAll()
        {
            return await _context.Doctors.ToListAsync();
        }

        public async Task<Doctor> CreateDoctor(Doctor doctor)
        {
             await _context.Doctors.AddAsync(doctor);
            await _context.SaveChangesAsync();
            return doctor;

        }

        public async Task DeleteDoctor(int id)
        {  
            var doc = await _context.Doctors.FirstOrDefaultAsync(d => d.Id == id);

            if (doc != null) {
                _context.Doctors.Remove(doc);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("failed to delete");
            }

        }

        public async Task<Doctor> UpdateDoctor(Doctor doctor)
        {
            _context.Doctors.Update(doctor);
            await _context.SaveChangesAsync();
            return doctor;
        }

        public async Task<Doctor> GetDoctorByIdAsync(int id)
        {
            var doc = await _context.Doctors.FirstOrDefaultAsync(d => d.Id == id);
            if (doc != null) {
                return doc;
            }
            return null;
        }
    }
}
