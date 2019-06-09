# Todo sample in ASP.NET Core 2.2

## Architecture

A monolithic web app written in [ASP.NET Core MVC](https://docs.microsoft.com/aspnet/core/mvc/overview).


## Usage

1. Compile:

   ```
   C:\> dotnet restore

   C:\> dotnet publish -o out
   ```

2. Run:

   ```
   C:\> cd out
   C:\> dotnet TodoApi.dll --urls http://+:30000
   ```

3. Use your browser to visit the web app at http://localhost:30000


## About the source code

The sample was extracted from the TodoApi demo in the Microsoft Docs site, retrieved on Feb 14, 2019:

 - Document - [Tutorial: Create a web API with ASP.NET Core MVC](https://docs.microsoft.com/zh-tw/aspnet/core/tutorials/first-web-api)

 - Source code - https://github.com/aspnet/Docs/tree/master/aspnetcore/tutorials/first-web-api/samples/2.2/TodoApi


The original source code to be used in this repo is packed in the `TodoApi-original.zip` file for your reference.


## LICENSE

MIT License.  See the [`LICENSE`](LICENSE) file.


## History

**1.0**: Extracted from Microsoft Docs.


