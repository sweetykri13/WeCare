using DALDoctorCapstone.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Data.SqlClient;

namespace DALDoctorCapstone
{
    public class DoctorRepository
    {
        public CureWellDBContext context { get; set; }
        public DoctorRepository()
        {
            context = new CureWellDBContext();
        }
        public List<Doctor> GetAllDoctors() {
            List<Doctor> doctors = new List<Doctor>();
            try
            {
                doctors = (from doc in context.Doctors select doc).ToList();
            }
            catch (Exception e)
            {
                doctors = null;
                Console.WriteLine(e.Message);
                
            }

            return doctors;
        }

        public List<Specialization> GetAllSpecializations()
        {
          List<Specialization> specializations = new List<Specialization>();
            try
            {
               specializations=(from spe in context.Specializations select  spe).ToList();
            }
            catch (Exception e)
            {
                specializations = null;
                Console.WriteLine(e.Message);
            }
            return specializations;
        }

        public List<Surgery> GetAllSurgeryTypeForToday()
        {
            List<Surgery> surgeries = new List<Surgery>();
            try
            {
                surgeries = (from sur in context.Surgeries select sur).ToList();
            }
            catch (Exception e)
            {
                surgeries = null;
                Console.WriteLine(e.Message);
            }
            return surgeries;
        }
        public bool AddDoctor(string doctorName)
        {
            bool status = false;
            try
            {
                Doctor doctor = new Doctor();
                doctor.DoctorName = doctorName;
                context.Doctors.Add(doctor);
                context.SaveChanges();
                status = true;
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }
        public bool UpdateDoctorDetails(int doctorId, string newDoctorName)
        {
            bool status = false;
            try
            {
                var doctor = context.Doctors.FirstOrDefault(c => c.DoctorId == doctorId);
                if (doctor != null)
                {
                    doctor.DoctorName = newDoctorName;
                    context.SaveChanges();
                    status = true;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }
        public bool UpdateSurgerysDate(int surgeryId, int startTime,int endTime)
        {
            bool status = false;
            try
            {
                var surgery = context.Surgeries.FirstOrDefault(c => c.SurgeryId == surgeryId);
                if (surgery != null)
                {
                    surgery.StartTime = startTime;
                    surgery.EndTime= endTime;
                    context.SaveChanges();
                    status = true;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public bool UpdateSurgery(int surgeryId, string surgeryCategory)
        {
            bool status = false;
            try
            {
                var surgery = context.Surgeries.FirstOrDefault(c => c.SurgeryId == surgeryId);
                if (surgery != null)
                {
                    // Find the corresponding SpecializationCode based on the surgeryCategory
                    var specialization = context.Specializations.FirstOrDefault(s => s.SpecializationCode == surgeryCategory);
                    if (specialization != null)
                    {
                        surgery.SurgeryCategory = specialization.SpecializationCode;
                        context.SaveChanges();
                        status = true;
                    }
                    else
                    {
                        // Handle the case when the surgeryCategory does not correspond to a valid SpecializationCode
                        // Add appropriate error handling logic here
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle the exception
                status = false;
            }
            return status;
        }

        public bool UpdateSurgeryCat(int surgeryId, string surgeryCategory)
        {
            bool status = false;
            try
            {
                var surgery = context.Surgeries.FirstOrDefault(c => c.SurgeryId == surgeryId);
                if (surgery != null)
                {
                    var specialization = context.Specializations.FirstOrDefault(s => s.SpecializationCode == surgeryCategory);
                    if (specialization != null)
                    {
                        surgery.SurgeryCategory = specialization.SpecializationCode;
                        context.SaveChanges();
                        status = true;
                    }
                    else
                    {
                        
                        var newSpecialization = new Specialization
                        {
                            SpecializationCode = surgeryCategory,
                            SpecializationName = context.Specializations.FirstOrDefault(s => s.SpecializationCode == surgery.SurgeryCategory)?.SpecializationName
                        };

                        context.Specializations.Add(newSpecialization);
                        context.SaveChanges();

                        surgery.SurgeryCategory = newSpecialization.SpecializationCode;
                        context.SaveChanges();

                        status = true;
                    }
                }
            }
            catch (Exception ex)
            {
                status = false;
            }
            return status;
        }


        //public bool DeleteDoctor(int doctorId)
        //{
        //    Doctor doctor = new Doctor();
        //    bool status = false;
        //    try
        //    {
        //        doctor = context.Doctors.Find(doctorId);
        //        if(doctor!=null)
        //        {
        //            context.Doctors.Remove(doctor);
        //            context.SaveChanges();
        //            status = true;
        //        }
        //        else
        //        {
        //            status= false;
        //        }
        //    }
        //    catch (Exception)
        //    {

        //        status = false;
        //    }
        //    return status;
        //}
        public bool DeleteDoctor(int doctorId)
        {
            bool status = false;
            try
            {
                var doctor = context.Doctors.Include(d => d.DoctorSpecializations).Include(d => d.Surgeries).FirstOrDefault(d => d.DoctorId == doctorId);
                if (doctor != null)
                {
                    // Remove all associated DoctorSpecialization records
                    context.DoctorSpecializations.RemoveRange(doctor.DoctorSpecializations);

                    // Remove all associated Surgery records
                    context.Surgeries.RemoveRange(doctor.Surgeries);

                    // Remove the doctor
                    context.Doctors.Remove(doctor);

                    context.SaveChanges();
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }



    }
}