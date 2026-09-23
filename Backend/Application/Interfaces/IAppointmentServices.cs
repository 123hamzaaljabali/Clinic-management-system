using Application.DTO;
using Application.DTOs;
using Domain.Model;
using System;

using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces
{
    public interface IAppointmentSerivices
    {
        public Task<List<Appointment>> GetAppointments();

        public Task<List<Appointment>> GetAppointmentByDoctorId(int id);


        Task<List<AppointmentStatusStatisticDto>> GetAppointmentStatusStatistics();

        public Task<List<Appointment>> GetAppointmentByPatientId(int id);
        Task<List<DoctorAppointmentStatisticDto>> GetAppointmentByDoctor();
        public Task<int> GetAppointmentByDate(DateOnly date);
        public Task<List<AppointmentStatisticDto>> GetAppointmentStatistics();
        public Task<Appointment> CreateAppointment(Appointment appointment);

        public Task RemoveAppointment(int id);

        public Task<Appointment> UppdateAppointment(Appointment appointment);
    }
}
