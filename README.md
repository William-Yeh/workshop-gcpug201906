# Todo sample for Docker

## Architecture

A *dockerized* web app with separate frontend and backend containers within the same host.

**Frontend**

Static HTML5 files and jQuery scripts.

Web endpoint with port = `30000`.

**Backend**

Backend program written in ASP.NET Core.

API endpoint with port = `30080` and path = `/api/todo`.


## Usage

1. Compile:

   ```
   % docker-compose build
   ```

2. Run:

   ```
   % docker-compose up
   ```

3. Use your browser to visit the web app at http://localhost:30000


## About the source code

The sample was extracted from the TodoApi demo in the Microsoft Docs site, retrieved on Feb 14, 2019:

 - Document - [Tutorial: Create a web API with ASP.NET Core MVC](https://docs.microsoft.com/zh-tw/aspnet/core/tutorials/first-web-api)

 - Source code - https://github.com/aspnet/Docs/tree/master/aspnetcore/tutorials/first-web-api/samples/2.2/TodoApi


The original source code to be used in this repo is packed in the `TodoApi-original.zip` file for your reference.


## LICENSE

Apache License 2.0.  See the [LICENSE](LICENSE) file.


## History

**3.0**: Separate frontend and backend into 2 distinct containers.

**2.0**: Dockerize the app with simple `Dockerfile` and `docker-compose.yml`.

**1.0**: Extracted from Microsoft Docs.
