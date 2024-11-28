FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY *.csproj ./

RUN dotnet restore

COPY . ./

RUN dotnet publish -c Release -0 ./publish

EXPOSE 5000

ENTRYPOINT ["dotnet", "publish/api.dll"]