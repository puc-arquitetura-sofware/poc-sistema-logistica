FROM mcr.microsoft.com/dotnet/sdk:5.0 AS builder
WORKDIR /source

COPY . ./src/GSL.Cadastro

RUN (cd ./src/GSL.Cadastro; dotnet restore --disable-parallel --ignore-failed-sources)
RUN (cd ./src/GSL.Cadastro/; dotnet publish --output /app/ --configuration Release)

# Build da imagem
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=builder /app .
RUN cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime
ENTRYPOINT ["dotnet", "Api.dll"]
