using Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces
{
    public interface IAuthServices
    {
        Task<Users> GetUserAsync(string email, string password);
        Task<Users> RegisterUserAsync(Users user);

    }
}
