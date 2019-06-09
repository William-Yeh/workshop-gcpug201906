# Todo sample for Kubernetes


## Configurable settings

Store config in the environment (aka the [12-factor app](https://12factor.net/) principles).

Public accessible endpoint for todoapi backend, defined in [config.local.yml](k8s/config.local.yml):

 - `TODOAPI_HOST` : default = `localhost`
 - `TODOAPI_PORT` : default = `30080`
 - `TODOAPI_PATH` : default = `/api/todo`


## Architecture

A *dockerized* web app with separate frontend and backend services on *Kubernetes* (locally).

**Frontend**

Static HTML5 files and jQuery scripts.

Web endpoint with port = `30000`.

**Backend**

Backend program written in ASP.NET Core.

API endpoint with port = `TODOAPI_PORT` (default = `30080`) and path = `TODOAPI_PATH` (default = `/api/todo`).


## Usage

### Preparation

1. Create a `todo` namespace for this app:

   ```
   % kubectl create ns todo
   ```

2. Load the ConfigMap content:

   ```
   % kubectl apply -f k8s/config.local.yml  -n todo
   % kubectl get configmaps  -n todo
   ```

### Build

1. Build images:

   ```
   % docker-compose build
   ```


### Run

1. Start the backend:

   ```
   % kubectl apply -f k8s/todoapi-service.yml -n todo
   % kubectl get svc  -n todo
   ```

2. Start the frontend:

   ```
   % kubectl apply -f k8s/todofrontend-service.yml -n todo
   % kubectl get svc  -n todo
   ```

3. Use your browser to visit the web app at http://localhost:30000


## Kubernetes dashboard

See [here](k8s-dashboard.md) if you'd like to use [Kubernetes dashboard](https://github.com/kubernetes/dashboard) locally.


## About the source code

The sample was extracted from the TodoApi demo in the Microsoft Docs site, retrieved on Feb 14, 2019:

 - Document - [Tutorial: Create a web API with ASP.NET Core MVC](https://docs.microsoft.com/zh-tw/aspnet/core/tutorials/first-web-api)

 - Source code - https://github.com/aspnet/Docs/tree/master/aspnetcore/tutorials/first-web-api/samples/2.2/TodoApi


The original source code to be used in this repo is packed in the `TodoApi-original.zip` file for your reference.


## LICENSE

Apache License 2.0.  See the [LICENSE](LICENSE) file.


## History

**5.0**: Support ConfigMap and naming convention.

**4.1**: Use Kubernetes dashboard.

**4.0**: Support Kubernetes (locally).

**3.0**: Separate frontend and backend into 2 distinct containers.

**2.0**: Dockerize the app with simple `Dockerfile` and `docker-compose.yml`.

**1.0**: Extracted from Microsoft Docs.
