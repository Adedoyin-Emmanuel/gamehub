namespace api.Extensions;

public class NotFound : Response
{
    public NotFound(): base(404, "Resource not found")
    {
        
    }

    public NotFound(string message): base(404, message)
    {
        
    }
}