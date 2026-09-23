using Application.Interfaces;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Services
{
    public class AuthServices : IAuthServices
        
    {
        private readonly IAuthRepository _authRepository;
        public AuthServices(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public async Task<Users> GetUserAsync(string email, string password)
        {
            return await _authRepository.GetUserAsync(email, password);
        }

        public async Task<Users> RegisterUserAsync(Users user)
        {
            return await _authRepository.RegisterUserAsync(user);
        }
    }
}
