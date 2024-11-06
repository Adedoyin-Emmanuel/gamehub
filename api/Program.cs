using api.Data;
using dotenv.net;
using Microsoft.EntityFrameworkCore;



DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");
var mysqlServerServerVersion = new MySqlServerVersion(new Version(8, 0, 36));


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<GamehubContext>(options => options.UseMySql(connectionString, mysqlServerServerVersion));

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
