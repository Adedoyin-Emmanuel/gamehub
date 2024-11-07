using System.Net;
using Newtonsoft.Json;

namespace api.Extensions;

public class Response
{
    public int Code { get; private set; }

    [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
    public string Message { get; private set; }

    public object? Data { get; private set; }


    public Response(int code, string message)
    {
        Code = code;
        Message = message;
    }


    public Response(string message) : this(200, message)
    {
        Message = message;
    }


    public Response(string message, object data) : this(200, message)
    {
        Data = data;
    }

    public Response(int code, string message, object data) : this(code, message)
    {
        Data = data;
    }


}