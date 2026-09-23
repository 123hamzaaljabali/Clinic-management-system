using Application.DTO;
using Application.DTOs;
using Domain.Model;
using System;


using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces
{
    public interface IAppointmentRepository

    {
        public Task<List<Appointment>> GetAppointments();

        public Task<List<Appointment>> GetAppointmentByDoctorId(int id);
        public Task<List<Appointment>> GetAppointmentByPatientId(int id);

        Task<List<DoctorAppointmentStatisticDto>> GetAppointmentByDoctor();


        Task<List<AppointmentStatusStatisticDto>> GetAppointmentStatusStatistics();
        public Task<List<AppointmentStatisticDto>> GetAppointmentStatistics();
        public Task<int> GetAppointmentByDate(DateOnly date);

        public Task<Appointment> CreateAppointment(Appointment appointment);

        Task<bool> DoctorHasAppointment(int doctorId, DateOnly date, TimeOnly time);

        Task<bool> PatientHasAppointment(int patientId, DateOnly date, TimeOnly time);

        public Task RemoveAppointment(int id);

        public Task<Appointment> UppdateAppointment(Appointment appointment);
    }
}
