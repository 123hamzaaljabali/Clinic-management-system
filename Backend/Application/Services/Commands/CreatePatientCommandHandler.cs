using Domain.Model;
using System;
using Application.Interfaces;

public class CreatePatientCommandHandler
{
	private readonly IAppDbContext _context;
	public CreatePatientCommandHandler(IAppDbContext context)
	{
		_context = context;
	}
    public async Task Handle(CreatePatientCommand command)
	{
		var patient = new Patient
		{
			FirstName = command.FirstName,
			LastName = command.LastName,
           MobileNumber = command.MobileNumber,
			Email = command.Email,
			Photo = command.Photo,
			DoctorId = command.DoctorId,

		};
		await _context.Patients.AddAsync(patient);
		await _context.SaveChangesAsync();
	}
}
