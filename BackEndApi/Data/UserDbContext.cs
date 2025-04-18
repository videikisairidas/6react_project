using Microsoft.EntityFrameworkCore;
using BackEndApi.Models;


namespace BackEndApi.Data
{
    //public class UserDbContext(DbContextOptions<UserDbContext> options) : DbContext(options) 
    //{
    //    public DbSet<User> Users { get; set; }
    //}
   
    public class UserDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique(); // Ensure unique usernames

            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "alice", Password = "alice" },
                new User { Id = 2, Username = "bob", Password = "bob" },
                new User { Id = 3, Username = "charlie", Password = "charlie" },
                new User { Id = 4, Username = "diana", Password = "diana" }
            );

        }
    }
}
