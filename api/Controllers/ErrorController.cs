using Microsoft.AspNetCore.Mvc;
using api.Extensions;
using System.Net;


namespace api.Controllers;


public class ErrorController : ControllerBase
{

    [Route("/error")]
    [AcceptVerbs("GET", "POST", "PUT", "DELETE")]
    public IActionResult Error(int code)
    {
        HttpStatusCode parseCode = (HttpStatusCode)code;
        
        
    }
    
}