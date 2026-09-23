using Application.DTO;
using Application.DTOs;
using Application.Interfaces;
using Domain.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repo
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly AppDbContext _context;
        public AppointmentRepository (AppDbContext context)
        {
            _context = context;
        }
        public async Task<Appointment> CreateAppointment(Appointment appointment)
        {
            await _context.Appointments.AddAsync(appointment);
            await _context.SaveChangesAsync();
            return appointment;
        }

       

        public async Task<List<Appointment>> GetAppointments()
        {
            return await _context.Appointments.Include(a => a.Doctor)
                            .Include(a => a.Patients).ToListAsync();
        }

      

        public async Task RemoveAppointment(int id)
        {
            var appointment = await _context.Appointments.FirstOrDefaultAsync(a => a.Id == id);
            if (appointment != null) {
                 _context.Appointments.Remove(appointment);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Appointment> UppdateAppointment(Appointment appointment)
        {
             _context.Appointments.Update(appointment);
             _context.SaveChanges();
            return appointment;
        }
        public async Task<bool> DoctorHasAppointment(int doctorId, DateOnly date, TimeOnly time)
        {
            return await _context.Appointments.AnyAsync(a => a.DoctorId == doctorId
            && 
            a.DateOnly == date
            && 
            a.Time == time
            &&
            a.Status == Appointment.AppointmentStatus.Scheduled);

        }
        public async Task<bool> PatientHasAppointment(int patientId, DateOnly date, TimeOnly time)
        {
            return await _context.Appointments.AnyAsync(a => a.PatientId == patientId
                        &&
                        a.DateOnly == date
                        &&
                        a.Time == time
                        &&
                        a.Status == Appointment.AppointmentStatus.Scheduled);
        }

        public async Task<List<Appointment>> GetAppointmentByDoctorId(int id)
        {
            return   _context.Appointments.Where(x => x.DoctorId == id).Include(a=> a.Doctor).Include(p => p.Patients).ToList();
        }

        public async Task<List<Appointment>> GetAppointmentByPatientId(int id)
        {
            return _context.Appointments.Where(x => x.PatientId == id).Include(a => a.Doctor).ToList();
        }
        public async Task<int> GetAppointmentByDate(DateOnly DateOnly)
        {
            return  await _context.Appointments.Where(d => d.DateOnly == DateOnly).CountAsync();
        }
       

       async Task<List<AppointmentStatisticDto>> IAppointmentRepository.GetAppointmentStatistics()
        {
            return await _context.Appointments
                            .GroupBy(a => a.DateOnly)
                            .Select(g => new AppointmentStatisticDto
                            {
                                Date = g.Key,
                                Count = g.Count()
                            })
                            .OrderBy(x => x.Date)
                            .ToListAsync();
        }

        public async Task<List<AppointmentStatusStatisticDto>> GetAppointmentStatusStatistics()
        {
            var totalAppointments = await _context.Appointments.CountAsync();

            if (totalAppointments == 0)
            {
                return new List<AppointmentStatusStatisticDto>();
            }

            return await _context.Appointments
                .GroupBy(a => a.Status)
                .Select(g => new AppointmentStatusStatisticDto
                {
                    Status = g.Key.ToString(),
                    Count = g.Count(),
                    Percentage = (double)g.Count() / totalAppointments * 100
                })
                .ToListAsync();
        }
        public async Task<List<DoctorAppointmentStatisticDto>> GetAppointmentByDoctor()
        {
            return await _context.Appointments
                .GroupBy(a => new
                {
                    a.DoctorId,
                    a.Doctor.FirstName,
                    a.Doctor.LastName
                })
                .Select(g => new DoctorAppointmentStatisticDto
                {
                    DoctorName = g.Key.FirstName + " " + g.Key.LastName,
                    Count = g.Count()
                })
                .ToListAsync();
        }
      

    }
}
