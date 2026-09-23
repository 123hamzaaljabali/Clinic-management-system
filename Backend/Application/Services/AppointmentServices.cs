using Application.DTO;
using Application.DTOs;
using Application.Interfaces;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Services
{
    public class AppointmentServices : IAppointmentSerivices
    {
        private readonly IAppointmentRepository _appointmentRepository;

        public AppointmentServices(IAppointmentRepository appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
        }
        public async Task<Appointment> CreateAppointment(Appointment appointment)
        {
            var doctorBusy = await _appointmentRepository.DoctorHasAppointment(appointment.DoctorId
                , appointment.DateOnly,
                appointment.Time);

            if (doctorBusy)
            {

                throw new InvalidOperationException(
                    "Doctor already has an appointment at this time.");
            }
            var patientBusy = await _appointmentRepository.PatientHasAppointment(
                    appointment.PatientId,
                    appointment.DateOnly,
                    appointment.Time);
            if (patientBusy)

            {
                throw new InvalidOperationException(
                "Patient already has an appointment at this time.");
            }


            return await _appointmentRepository.CreateAppointment(appointment);
        }


        public Task<List<Appointment>> GetAppointmentByDoctorId(int id)
        {
            return _appointmentRepository.GetAppointmentByDoctorId(id);
        }
        public Task<List<Appointment>> GetAppointmentByPatientId(int id)
        {
            return _appointmentRepository.GetAppointmentByPatientId(id);
        }
        public Task<List<Appointment>> GetAppointments()
        {
            return _appointmentRepository.GetAppointments();
        }

        public Task RemoveAppointment(int id)
        {
            return _appointmentRepository.RemoveAppointment(id);
        }

        public Task<Appointment> UppdateAppointment(Appointment appointment)
        {
            return _appointmentRepository.UppdateAppointment(appointment);
        }

        public async Task<int> GetAppointmentByDate(DateOnly DateOnly)
        {
            return await _appointmentRepository.GetAppointmentByDate(DateOnly);
        }
        public async Task<List<AppointmentStatisticDto>> GetAppointmentStatistics()
        {
            return await _appointmentRepository.GetAppointmentStatistics();
        }

        public async Task<List<AppointmentStatusStatisticDto>> GetAppointmentStatusStatistics()
        {
            return await _appointmentRepository.GetAppointmentStatusStatistics();
        }



        public async Task<List<DoctorAppointmentStatisticDto>> GetAppointmentByDoctor()
        {
            return await _appointmentRepository.GetAppointmentByDoctor();
        }

       

    }
    }
