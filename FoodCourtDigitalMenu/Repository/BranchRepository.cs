using FoodCourtDigitalMenu.FileUploadExtention;
using FoodCourtDigitalMenu.Models;
using FoodCourtDigitalMenu.Services;
using System.Text.Json;
using static FoodCourtDigitalMenu.Services.DataService;

namespace FoodCourtDigitalMenu.Repository
{
    public interface IBranchRepository
    {
        Task<List<BranchModel>> GetAllBranches();
        Task<BranchModel> GetBranchById(int branchId);
        Task<BranchModel> CreateBranch(BranchModel branch);
        Task<bool> UpdateBranch(BranchModel model);
        Task<string> DeleteBranch(BranchModel model);
    }
    public class BranchRepository : IBranchRepository
    {
        private readonly IDataService service;
        public readonly string imageFolder = AppDomain.CurrentDomain.BaseDirectory + @"log\";


        public enum RepositoryResult
        {
            created = 1,
            NotFound = 2,
            Error = 3,
            Updated = 4,
            Deleted = 5,
        }

        public BranchRepository (IDataService _service)
        {
            service = _service;
        }

        public async Task<List<BranchModel>> GetAllBranches()
        {
            var resualt = await service.ReadData();
            if (resualt == null) return null;
            return resualt;
        }

        public async Task<BranchModel> GetBranchById(int branchId)
        {
            var branch = await GetAllBranches();
            foreach (var item in branch)
            {
                if(item.BranchId == branchId.ToString())
                {
                    return item;
                }
            }
            return null;
        }

        public async Task<BranchModel> CreateBranch(BranchModel branch)
        {
            if (branch != null)
            {
                List<BranchModel> branchlist = new List<BranchModel>();
                if (!string.IsNullOrEmpty(branch.ImageBase64))
                {
                    var imageFile = ImageUploaderExtension.Base64ToImage(branch.ImageBase64);
                    var imageName = Guid.NewGuid().ToString("N") + ".jpeg";
                    imageFile.AddImageToServer(imageName, imageFolder);
                }
                branchlist.Add(branch);
                await service.WriteData(branchlist);
                return branch;
            }
            return null;
        }

        public async Task<bool> UpdateBranch(BranchModel model)
        {
            var branch = await GetAllBranches();
            foreach(var item in branch)
            {
                if(item.BranchId == model.BranchId)
                {
                    item.BranchId = model.BranchId;
                    item.BranchName = model.BranchName;
                    item.BranchDescription = model.BranchDescription;
                    item.BranchIpAddress = model.BranchIpAddress;
                    item.BranchPortNumber = model.BranchPortNumber;
                    item.BranchIsActive = model.BranchIsActive;
                }
               var resualt = service.WriteData(branch);
                if (resualt != null)
                {
                    return true;
                }
            }
            return false;
        }

        public async Task<string> DeleteBranch(BranchModel model)
        {
            return "شعبه انتخاب شده حذف شد";
        }
    }
}
