FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine3.20

WORKDIR /app

COPY *.csproj ./

RUN dotnet restore

COPY . ./


RUN dotnet publish -c Release -o ./publish


ENTRYPOINT ["dotnet", "publish/api.dll"]