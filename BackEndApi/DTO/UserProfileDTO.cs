namespace BackEndApi.DTO
{
    public class UserProfileDTO
    {
        public required string Username { get; set; }

        //public required string Password { get; set; }
        public string? Email { get; set; }
    }
}
