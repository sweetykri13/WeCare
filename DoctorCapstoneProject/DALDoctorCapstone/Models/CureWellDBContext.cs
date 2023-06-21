﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace DALDoctorCapstone.Models
{
    public partial class CureWellDBContext : DbContext
    {
        public CureWellDBContext()
        {
        }

        public CureWellDBContext(DbContextOptions<CureWellDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Doctor> Doctors { get; set; } = null!;
        public virtual DbSet<DoctorSpecialization> DoctorSpecializations { get; set; } = null!;
        public virtual DbSet<Specialization> Specializations { get; set; } = null!;
        public virtual DbSet<Surgery> Surgeries { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder().
                SetBasePath(Directory.GetCurrentDirectory()).
                AddJsonFile("appsettings.json");
            var config = builder.Build();
            var connectionString = config.GetConnectionString("CureWellDB");
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Doctor>(entity =>
            {
                entity.ToTable("Doctor");

                entity.Property(e => e.DoctorId).HasColumnName("DoctorID");

                entity.Property(e => e.DoctorName)
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<DoctorSpecialization>(entity =>
            {
                entity.HasKey(e => new { e.DoctorId, e.SpecializationCode })
                    .HasName("pk_DoctorIDSpecializatioinCode");

                entity.ToTable("DoctorSpecialization");

                entity.Property(e => e.DoctorId).HasColumnName("DoctorID");

                entity.Property(e => e.SpecializationCode)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.SpecializationDate).HasColumnType("date");

                entity.HasOne(d => d.Doctor)
                    .WithMany(p => p.DoctorSpecializations)
                    .HasForeignKey(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_DoctorID");

                entity.HasOne(d => d.SpecializationCodeNavigation)
                    .WithMany(p => p.DoctorSpecializations)
                    .HasForeignKey(d => d.SpecializationCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_SpecializationCode");
            });

            modelBuilder.Entity<Specialization>(entity =>
            {
                entity.HasKey(e => e.SpecializationCode)
                    .HasName("pk_SpecializationCode");

                entity.ToTable("Specialization");

                entity.Property(e => e.SpecializationCode)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.SpecializationName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Surgery>(entity =>
            {
                entity.ToTable("Surgery");

                entity.Property(e => e.SurgeryId).HasColumnName("SurgeryID");

                entity.Property(e => e.DoctorId).HasColumnName("DoctorID");

                entity.Property(e => e.EndTime).HasColumnType("decimal(4, 2)");

                entity.Property(e => e.StartTime).HasColumnType("decimal(4, 2)");

                entity.Property(e => e.SurgeryCategory)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.SurgeryDate).HasColumnType("date");

                entity.HasOne(d => d.Doctor)
                    .WithMany(p => p.Surgeries)
                    .HasForeignKey(d => d.DoctorId)
                    .HasConstraintName("fk_DoctorID_Surgery");

                entity.HasOne(d => d.SurgeryCategoryNavigation)
                    .WithMany(p => p.Surgeries)             
                    .HasForeignKey(d => d.SurgeryCategory)
                    .HasConstraintName("fk_SpecializatioinCode_Surgery");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
