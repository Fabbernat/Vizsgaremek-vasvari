using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace RoyalDelivery.Dotnet.Backend.DbMysqlModels;

public partial class RoyaldeliveryDbContext : DbContext
{
    public RoyaldeliveryDbContext()
    {
    }

    public RoyaldeliveryDbContext(DbContextOptions<RoyaldeliveryDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<Meal> Meals { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Owner> Owners { get; set; }

    public virtual DbSet<Restaurant> Restaurants { get; set; }

    public virtual DbSet<Shop> Shops { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=royaldelivery_db;user=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.32-mariadb"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("latin2_hungarian_ci")
            .HasCharSet("latin2");

        modelBuilder.Entity<Meal>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("meals")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.HasIndex(e => e.RestaurantId, "restaurant_id");

            entity.Property(e => e.Id)
                .HasColumnType("int(9)")
                .HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .HasDefaultValueSql("'.'")
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasDefaultValueSql("'Gipsz Jakab'")
                .HasColumnName("name");
            entity.Property(e => e.Price)
                .HasDefaultValueSql("'1000'")
                .HasColumnType("int(9)")
                .HasColumnName("price");
            entity.Property(e => e.RestaurantId)
                .HasDefaultValueSql("'1'")
                .HasColumnType("int(9)")
                .HasColumnName("restaurant_id");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("orders")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.HasIndex(e => e.RestaurantId, "restaurant_id");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.Id)
                .HasColumnType("int(9)")
                .HasColumnName("id");
            entity.Property(e => e.Date)
                .HasMaxLength(100)
                .HasDefaultValueSql("2026-05-05")
                .HasColumnName("date");
            entity.Property(e => e.RestaurantId)
                .HasMaxLength(100)
                .HasDefaultValueSql("1")
                .HasColumnName("restaurant_id");
            entity.Property(e => e.UserId)
                .HasMaxLength(100)
                .HasDefaultValueSql("1")
                .HasColumnName("user_id");
        });

        modelBuilder.Entity<Owner>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("owners")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.Id)
                .HasColumnType("int(1)")
                .HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasDefaultValueSql("'gipszjakab@gmail.com'")
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .HasDefaultValueSql("'jelszo123'")
                .HasColumnName("password");
            entity.Property(e => e.UserId)
                .HasColumnType("int(9)")
                .HasColumnName("user_id");
            entity.Property(e => e.Username)
                .HasMaxLength(100)
                .HasDefaultValueSql("'gipszjakab'")
                .HasColumnName("username");
        });

        modelBuilder.Entity<Restaurant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("restaurants")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.Property(e => e.Id)
                .HasColumnType("int(9)")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasDefaultValueSql("'.'")
                .HasColumnName("name");
            entity.Property(e => e.OwnerId)
                .HasDefaultValueSql("'1'")
                .HasColumnType("int(9)")
                .HasColumnName("owner_id");
        });

        modelBuilder.Entity<Shop>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("shops");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity
                .ToTable("users")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.Property(e => e.Id)
                .HasColumnType("int(9)")
                .HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(100)
                .HasDefaultValueSql("'.'")
                .HasColumnName("address");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasDefaultValueSql("'gipszjakab@gmail.com'")
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasDefaultValueSql("'Jakab'")
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasDefaultValueSql("'Gipsz'")
                .HasColumnName("last_name");
            entity.Property(e => e.Password)
                .HasMaxLength(999)
                .HasDefaultValueSql("'jelszo123'")
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(100)
                .HasDefaultValueSql("'gipszjakab'")
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
