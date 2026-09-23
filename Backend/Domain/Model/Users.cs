using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Model
{
    public class Users
    {   

        public int Id {  get; set; }
        [Required]
        [StringLength(20)]
        public string Password { get; set; }
        [Required]
        [EmailAddress]

        public string Email { get; set; }
    }
}
