namespace api.Utils;

public static class FileUploadHandler
{
    public static (bool, string) Upload(IFormFile file)
    {
        List<string> allowedExtensions = [".png", ".jpeg", ".gif", ".jpg", ".webp"];
        string extension = Path.GetExtension(file.FileName);

        if (!allowedExtensions.Contains(extension))
        {
            return (false, $"File {file.FileName} doesn't contain valid extension");
        }

        long fileSize = file.Length;
        const int maxFileSize = 5 * 1024 * 1024;

        if (fileSize > maxFileSize)
        {
            return (false, $"File size can not be more than {maxFileSize} bytes");
        }
        
        string fileName = Guid.NewGuid().ToString() + "_" + extension;
        string uploadPathToReturn = $"/uploads/${fileName}";
        string path = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

                     
        Console.WriteLine(uploadPathToReturn);
        Console.WriteLine(fileName);
        
        
        string fileDestination = Path.Combine(path, fileName);
        using FileStream fileStream = new FileStream(fileDestination, FileMode.Create);

        
  
        
        
        file.CopyTo(fileStream);
 
        
        return (true, uploadPathToReturn);
    }
}