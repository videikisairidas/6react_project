using System.ComponentModel.DataAnnotations;

namespace BackEndApi.DTO
{
    public class UserLogin
    {

        public required string Username { get; set; }

        public required string Password { get; set; }
    }

}
