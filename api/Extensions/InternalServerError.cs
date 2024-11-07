namespace api.Extensions;

public class InternalServerError: Response
{
    public InternalServerError():base(500, "An internal server error occured.")
    {
        
    }


    public InternalServerError(string message):base(500, message)
    {
        
    }
    
}