namespace api.Services.Upload;

public interface IUploadService
{
    public (bool, string) Upload(IFormFile file);
}
