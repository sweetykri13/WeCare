using DALDoctorCapstone;
using DALDoctorCapstone.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Intercom.Core;
using Intercom.Data;
using System.Diagnostics;

namespace ServiceLayerDoctorCapstone.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CureWellController : Controller
    {
        DoctorRepository rep=new DoctorRepository();

        [HttpGet]
        public JsonResult GetAllDoctor() {
            List<Doctor> doc=new List<Doctor>();
            try
            {
                doc = rep.GetAllDoctors();
            }
            catch (Exception)
            {
                doc = null;
                
            }
            return Json(doc);
        }
        [HttpGet]
        public JsonResult GetAllSpecilization()
        {           
            List<Specialization> specializations = rep.GetAllSpecializations();
            try
            {
                specializations = rep.GetAllSpecializations();
            }
            catch (Exception e)
            {

                specializations = null;           
            }
            return Json(specializations);
        }
        [HttpGet]
        public JsonResult GetAllSurgeryTypeForToday()
        {
            List<Surgery> surgeries=new List<Surgery>();
            try
            {
                surgeries = rep.GetAllSurgeryTypeForToday();
            }
            catch (Exception e)
            {

                surgeries = null;
            }
            return Json(surgeries);
        }

        [HttpPost]
        public JsonResult AddDoctor(string doctorName)
        {
            bool status = false;

            string message;
            try
            {
                status = rep.AddDoctor(doctorName);
                if (status)
                {
                    message = "Successful addition operation";
                }
                else
                {
                    message = "Unsuccessful addition operation!";
                }
            }
            catch (Exception)
            {
                message = "Some error occured, please try again!";
            }
            return Json(message);
        }
        [HttpPatch]
        public bool UpdateDoctor(int doctorId, string doctorName)
        {
            
            bool status = false;
            try
            {
                status = rep.UpdateDoctorDetails(doctorId, doctorName);
            }
            catch (Exception)
            {

                status = false;
            }
             return status;
        }

        [HttpPatch]
        public bool UpdateSurgerysDate(int surgeryId, int startTime, int endTime)
        {
            bool status = false;
            try
            {
                status = rep.UpdateSurgerysDate(surgeryId, startTime, endTime);
            }
            catch (Exception)
            {

                status = false;
            }
            return status;
        }
        [HttpDelete]
        public bool DeleteDoctor(int doctorId)
        {
            bool status = false;
            try
            {
                status = rep.DeleteDoctor(doctorId);
            }
            catch (Exception)
            {

                status = false;
            }
            return status;
        }

    }
}
