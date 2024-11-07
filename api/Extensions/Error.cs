using Newtonsoft.Json;

namespace api.Extensions;

public class Error
{
    public int Code { get; set; }
    
    [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
    public string Message { get; set; }


    public Error(int code, string message)
    {
        Code = code;
        Message = message;  
    }
    
    
    
    
}