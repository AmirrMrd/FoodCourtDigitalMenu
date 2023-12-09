using FoodCourtDigitalMenu.Models;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Text.Json;
using System.Text.Json.Nodes;
using static FoodCourtDigitalMenu.Services.DataService;
using static System.Net.Mime.MediaTypeNames;

namespace FoodCourtDigitalMenu.Services
{
    public interface IDataService
    {
        Task<CrudResult> WriteData(List<BranchModel> list);
        Task<List<BranchModel>> ReadData();
    }
    public class DataService : IDataService
    {
        public enum CrudResult
        {
            Saved = 1,
            Error = 2,
            NotFound = 3,
        }
        public enum CrudAction
        {
            write = 1,
            read = 2,
        }

        public async Task<CrudResult> WriteData(List<BranchModel> list)
        {
            var filename = $"{"branch"}.txt";
            filename = @"Logs\" + filename;
            string dirPath = Directory.GetCurrentDirectory();
            if (!Directory.Exists(dirPath))
            {
                Directory.CreateDirectory(dirPath);
            }
            try
            {
                using FileStream readingFile = File.OpenRead(filename);
                var listBranch = await JsonSerializer.DeserializeAsync<List<BranchModel>>(readingFile);
                foreach (var item in list)
                {
                    listBranch.Add(item);
                }
                await readingFile.DisposeAsync();
                using FileStream createStream = File.Create(filename);
                var options = new JsonSerializerOptions { WriteIndented = true };
                await JsonSerializer.SerializeAsync(createStream, listBranch, options);
                await createStream.DisposeAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString() + "خطای نوشتن دیتا");
            }
            return CrudResult.Saved;
        }
        public async Task<List<BranchModel>> ReadData()
        {
            var filename = $"{"branch"}.txt";
            filename = @"Logs\" + filename;
            string dirPath = Directory.GetCurrentDirectory();
            if (!Directory.Exists(dirPath))
            {
                Directory.CreateDirectory(dirPath);
            }
            try
            {
                using FileStream readingFile = File.OpenRead(filename);
                var listBranch = await JsonSerializer.DeserializeAsync<List<BranchModel>>(readingFile);
                await readingFile.DisposeAsync();
                return listBranch;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString() + "خطای خواندن دیتا");
            }
            return null;
        }


    }
}
