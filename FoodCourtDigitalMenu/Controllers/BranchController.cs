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
