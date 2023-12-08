using System.ComponentModel.DataAnnotations;

namespace FoodCourtDigitalMenu.Models
{
    public class BranchModel
    {
        public string BranchId { get; set; }
        public string? BranchName { get; set; }
        public string? BranchIpAddress { get; set; }
        public string? BranchPortNumber { get; set; }
        public string? BranchDescription { get; set; }
        public bool IsActive { get; set; }
        public string? ImageBase64 { get; set; }
    }
}
