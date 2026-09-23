    using System;
    using System.Collections.Generic;
    using System.Text;
using Application.Interfaces;       


    using Domain.Model;
    using Microsoft.EntityFrameworkCore;
    namespace Infrastructure.Repo
    {
    public class AuthRepository : IAuthRepository

        {
            private readonly AppDbContext _context;
            public AuthRepository(AppDbContext context)
            {
                _context = context;
            }
            public  Task<Users> GetUserAsync(string email, string password)
            {
                return  _context.Users.FirstOrDefaultAsync(a => a.Email == email && a.Password == password);
            }

        public async Task<Users> RegisterUserAsync(Users user)
        {

             _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
    }
