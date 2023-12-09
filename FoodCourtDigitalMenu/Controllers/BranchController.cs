using FoodCourtDigitalMenu.Models;
using FoodCourtDigitalMenu.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodCourtDigitalMenu.Controllers
{
    [AllowAnonymous]
    //[Route("[controller]")]
    [ApiController]
    public class BranchController : Controller
    {
        private readonly IBranchCrudService service;
        public BranchController(IBranchCrudService _service)
        {
            service = _service;
        }
        // GET: api/Branch
        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllBranches")]
        public async Task<List<BranchModel>> GetAllBranches()
        {
            var resualt = await service.GetAllBranches();
            return resualt;
        }

        //// GET: api/Branch/5
        [AllowAnonymous]
        [HttpGet]
        [Route("GetBranchById")]
        public async Task<BranchModel> GetBranchById(int branchId)
        {
            var resualt = await service.GetBranchById(branchId);
            return resualt;
        }

        // POST: api/Branch
        [AllowAnonymous]
        [HttpPost]
        [Route("CreateBranch")]
        public async Task<bool> CreateBranch(BranchModel value)
        {
            if (value == null)
            {
                return false;
            }
            else
            {
                var resualt = await service.CreateBranch(value);
                if(resualt != null)
                {
                    return true;
                }
                return false;
            }

        }

        //[AllowAnonymous]
        //[HttpPost]
        //[Route("SaveBranchLogo")]
        //public async Task<IActionResult> SaveBranchLogo(IFormFile Data, string? FileName, string? UserId)
        //{
        //    try
        //    {
        //        // Check if a photo was uploaded
        //        if (Data.FileName == null || Data.Length == 0)
        //        {
        //            return BadRequest("No photo uploaded.");
        //        }

        //        // Create the full path to the destination folder based on the user ID
        //        string FolderPath = Path.Combine("assets", "userAvatar", UserId);

        //        // Create the destination folder if it doesn't exist
        //        if (!Directory.Exists(FolderPath))
        //        {
        //            Directory.CreateDirectory(FolderPath);
        //        }
        //        else
        //        {
        //            // Delete all files in the folder
        //            DirectoryInfo directoryInfo = new DirectoryInfo(FolderPath);
        //            foreach (FileInfo file in directoryInfo.GetFiles())
        //            {
        //                file.Delete();
        //            }
        //        }

        //        // Combine the folder path and filename to create the full destination path
        //        string DestinationPath = Path.Combine(FolderPath, FileName);

        //        // Save the new file to the destination path
        //        using (var stream = new FileStream(DestinationPath, FileMode.Create))
        //        {
        //            await Data.CopyToAsync(stream);
        //        }

        //        return Ok(true);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"An error occurred while saving the photo: {ex.Message}");
        //    }
        //}
        // PUT: api/Branch/5
        //public async Task<BranchModel> Put(int id, [FromBody] string value)
        //{
        //    BranchCrudService crud = new BranchCrudService();
        //    var resualt = await crud.UpdateBranch(id, value);
        //    return resualt;
        //}

        //// DELETE: api/Branch/5
        //public async Task<string> Delete(int id)
        //{
        //    return "";
        //}
    }
}
