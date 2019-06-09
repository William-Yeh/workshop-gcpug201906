FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /app

# Add *.csproj before rest of repo for caching
COPY *.csproj .
RUN  dotnet restore

# Copy all files in the solution to builder context
COPY . .
RUN  dotnet publish -o out

#---

FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS runtime
LABEL maintainer="william.pjyeh@gmail.com"

ENV ASPNETCORE_URLS http://+:80
EXPOSE 80
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "TodoApi.dll"]