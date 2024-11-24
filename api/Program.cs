using api.Data;
using api.Repositories.Game;
using Asp.Versioning;
using dotenv.net;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using api.Services.Upload;



DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");
var mysqlServerServerVersion = new MySqlServerVersion(new Version(8, 0, 36));

{

    builder.Services.AddScoped<IGameRepository, GameRepository>();
    builder.Services.AddScoped<IUploadService, UploadService>();
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddDbContext<GamehubContext>(options => options.UseMySql(connectionString, mysqlServerServerVersion));
    builder.Services.AddApiVersioning(options =>
    {
        options.DefaultApiVersion = new ApiVersion(1);
        options.ReportApiVersions = true;
        options.AssumeDefaultVersionWhenUnspecified = true;
        options.ApiVersionReader =
            ApiVersionReader.Combine(new UrlSegmentApiVersionReader(), new HeaderApiVersionReader("X-Api-Versio"));
    }).AddMvc().AddApiExplorer(options =>
    {
        options.GroupNameFormat = "'v'V";
        options.SubstituteApiVersionInUrl = true;
    });

    builder.Services.AddAutoMapper(typeof(Program).Assembly);
    builder.Services.AddFluentValidationAutoValidation();
    builder.Services.AddValidatorsFromAssemblyContaining<Program>();

}

{
    var app = builder.Build();


    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.MapControllers();

    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.UseExceptionHandler("/error/500");

    app.UseStatusCodePagesWithReExecute("/error/{0}");

    app.Run();

}