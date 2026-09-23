using Application.DTOs;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Application.Interfaces
{
    public interface IAuthRepository
    {
        Task<Users> GetUserAsync(string email, string password);
        Task<Users> RegisterUserAsync(Users user);

    }
}
