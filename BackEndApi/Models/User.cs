using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
//using Microsoft.AspNetCore.Identity;

namespace BackEndApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }

        public string Role { get; set; } = "Customer";
        public string? GoogleId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //public ICollection<RecipeFavorite> RecipeFavorites { get; set; }
        //public ICollection<UserRole> UserRoles { get; set; }

    }
    //public class Role
    //{
    //    public int Id { get; set; }
    //    public required string Name { get; set; }

    //    public ICollection<UserRole> UserRoles { get; set; }
    //}

    //public class UserRole
    //{
    //    public int UserId { get; set; }
    //    public User User { get; set; }

    //    public int RoleId { get; set; }
    //    public Role Role { get; set; }
    //}

}
