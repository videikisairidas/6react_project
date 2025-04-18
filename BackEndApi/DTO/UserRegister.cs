using System.ComponentModel.DataAnnotations;

namespace BackEndApi.DTO
{
    public class UserProfileUpdateDTO
    {
        public required int Id { get; set; }
        public required string Username { get; set; }

        public required string Password { get; set; }
        public required string RepeatPassword { get; set; }

        public string? Email { get; set; }

    }
}
