using FoodCourtDigitalMenu.Models;
using FoodCourtDigitalMenu.Repository;

namespace FoodCourtDigitalMenu.Services
{
    public interface IBranchCrudService
    {
        Task<List<BranchModel>> GetAllBranches();
        Task<BranchModel> GetBranchById(int branchId);
        Task<BranchModel> CreateBranch(BranchModel branch);
        Task<bool> UpdateBranch(BranchModel branch);
        Task<string> DeleteBranch(BranchModel branch);
    }
    public class BranchCrudService : IBranchCrudService
    {
        private readonly IBranchRepository repository;
        public BranchCrudService(IBranchRepository _repository)
        {
            repository = _repository;
        }
        public async Task<List<BranchModel>> GetAllBranches()
        {
            var res = await repository.GetAllBranches();
            if(res != null)
            {
                return res;
            }
            return null;
        }

        public async Task<BranchModel> GetBranchById(int branchId)
        {
            var resault = await repository.GetBranchById(branchId);
            return resault;
        }

        public async Task<BranchModel> CreateBranch(BranchModel branch)
        {
            var resualt = await repository.CreateBranch(branch);
            return resualt;
        }

        public async Task<bool> UpdateBranch(BranchModel model)
        {
            var resualt = await repository.UpdateBranch(model);
            return resualt;
        }

        public async Task<string> DeleteBranch(BranchModel model)
        {
            var resualt = await repository.DeleteBranch(model);
            return resualt;
        }
    }
}
