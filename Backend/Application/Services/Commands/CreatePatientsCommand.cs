using System.ComponentModel.DataAnnotations;

public class CreatePatientCommand
{
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    public string MobileNumber { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public int DoctorId { get; set; }

    public string? Photo { get; set; }
}