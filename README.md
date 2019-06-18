# Todo sample for Kubernetes


## Configurable settings

Store config in the environment (aka the [12-factor app](https://12factor.net/) principles).

Public accessible endpoint for todoapi backend, defined in [config.local.yml](k8s/local/config.local.yml):

 - `TODOAPI_HOST` : default = `localhost`
 - `TODOAPI_PORT` : default = `30080`
 - `TODOAPI_PATH` : default = `/api/todo`

A version for deployment on the cloud is also provided in [config.cloud.yml](k8s/cloud/config.cloud.yml):

 - `TODOAPI_HOST` : external IP (*static*) or domain name allocated by cloud providers.
 - `TODOAPI_PORT` : default = `80`
 - `TODOAPI_PATH` : default = `/api/todo`


## Architecture

A *dockerized* web app with separate frontend and backend services on *Kubernetes* (both locally and on the cloud).

**Frontend**

Static HTML5 files and jQuery scripts.

Local web endpoint:

- host = `localhost`
- port = `30000`

Cloud web endpoint:

- host = external IP (*ephemeral*) or domain name allocated by cloud providers
- port = `80`

**Backend**

Backend program written in ASP.NET Core.

Local API endpoint:

- host = `localhost`
- port = `TODOAPI_PORT` (default = `30080`)
- path = `TODOAPI_PATH` (default = `/api/todo`)

Cloud API endpoint:

- host = `TODOAPI_HOST` (to be revised in [config.cloud.yml](k8s/cloud/config.cloud.yml)), external IP (*static*) or domain name allocated by cloud providers
- port = `TODOAPI_PORT` (default = `80`)
- path = `TODOAPI_PATH` (default = `/api/todo`)



## Usage: the local case

### Preparation

1. Create a `todo` namespace for this app:

   ```
   % kubectl create ns todo
   ```

2. Load the ConfigMap content:

   ```
   % kubectl apply -f k8s/local/config.local.yml  -n todo
   % kubectl get configmaps  -n todo
   ```


### Build & Run

1. Using [Skaffold](https://skaffold.dev/) to streamline the build-and-run processes continuously:

   ```
   % skaffold dev  -n todo
   ```

2. Use your browser to visit the web app at http://localhost:30000


### Canary

1. See the number of pods in the deployments, including the *canary* part of the `todoapi` service:

   ```
   % kubectl get deployments -n todo
   NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
   todoapi          3         3         3            3           14s
   todoapi-canary   1         1         1            1           14s
   todofrontend     3         3         3            3           14s
   ```

2. Scale the *canary* part from 1 to 2, either by:


   ```
   % kubectl scale --replicas=2 deployment/todoapi-canary  -n todo
   ```

   or by:

   ```
   % kubectl patch deployment todoapi-canary \
       --patch "$(cat todoapi-canary-patch.yml)" -n todo
   ```

3. See again the number of pods in the deployments, including the *canary* part of the `todoapi` service:

   ```
   % kubectl get deployments -n todo
   NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
   todoapi          3         3         3            3           2m
   todoapi-canary   2         2         2            2           2m
   todofrontend     3         3         3            3           2m

   % kubectl get pods -n todo
   NAME                              READY   STATUS    RESTARTS   AGE
   todoapi-77f54c6f5d-9dkjh          1/1     Running   0          2m
   todoapi-77f54c6f5d-grmfs          1/1     Running   0          2m
   todoapi-77f54c6f5d-rdk7p          1/1     Running   0          2m
   todoapi-canary-549dd65797-2rdxf   1/1     Running   0          2m
   todoapi-canary-549dd65797-mn7db   1/1     Running   0          42s
   todofrontend-67cc74bcbb-2zw4x     1/1     Running   0          2m
   todofrontend-67cc74bcbb-w6fz5     1/1     Running   0          2m
   todofrontend-67cc74bcbb-wdhmh     1/1     Running   0          2m
   ```


## Usage: the cloud case

### Preparation

1. If you're using GKE, do the [gke-steps](gke-steps.md) first.

2. Fill in correct image names by modifying the `PROJECT_ID` string in `skaffold.yaml` file:

   ```
   % vi skaffold.yaml
   ```

3. Fill in correct image names by modifying the `PROJECT_ID` string in manifest files, by either:

   ```
   % k8s/cloud/fix-name.py $PROJECT_ID
   ```

   or by the following if there's no Python3 installed in your Windows:

   ``` 
   C:> docker run  -v %cd%:/mnt  python:3-alpine  \
       /mnt/k8s/cloud/fix-name.py  write_your_real_project_id_here
   ```

4. Create a `todo` namespace for this app:

   ```
   % kubectl create ns todo
   ```

5. Load the ConfigMap content (GCP/GKE for example):

   ```
   # reserve a new static external IP address for backend todoapi
   % gcloud compute addresses create todoapi --region=us-west1 --network-tier=PREMIUM

   # make sure the static external IP address has been allocated
   % gcloud compute addresses list

   # replace the placeholder string "111.222.333.444" with the allocated IP address
   % vi k8s/cloud/config.cloud.yml
   % vi k8s/cloud/todoapi-service.yml

   #...

   # now, load it!
   % kubectl apply -f k8s/cloud/config.cloud.yml  -n todo
   % kubectl get configmaps  -n todo
   ```

### Build & Run

1. Using [Skaffold](https://skaffold.dev/) to streamline the build-and-run process continuously:

   ```
   % skaffold run -p cloud  -n todo
   ```

2. Use your browser to visit the web app at http://FRONTEND_EXTERNAL_IP:80


### Canary

1. See the number of pods in the deployments, including the *canary* part of the `todoapi` service:

   ```
   % kubectl get deployments -n todo
   NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
   todoapi          3         3         3            3           14s
   todoapi-canary   1         1         1            1           14s
   todofrontend     3         3         3            3           14s
   ```

2. Scale the *canary* part from 1 to 2, either by:

   ```
   % kubectl scale --replicas=2 deployment/todoapi-canary  -n todo
   ```

   or by:

   ```
   % kubectl patch deployment todoapi-canary \
       --patch "$(cat todoapi-canary-patch.yml)" -n todo
   ```

3. See again the number of pods in the deployments, including the *canary* part of the `todoapi` service:

   ```
   % kubectl get deployments -n todo
   NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
   todoapi          3         3         3            3           2m
   todoapi-canary   2         2         2            2           2m
   todofrontend     3         3         3            3           2m

   % kubectl get pods -n todo
   NAME                              READY   STATUS    RESTARTS   AGE
   todoapi-77f54c6f5d-9dkjh          1/1     Running   0          2m
   todoapi-77f54c6f5d-grmfs          1/1     Running   0          2m
   todoapi-77f54c6f5d-rdk7p          1/1     Running   0          2m
   todoapi-canary-549dd65797-2rdxf   1/1     Running   0          2m
   todoapi-canary-549dd65797-mn7db   1/1     Running   0          42s
   todofrontend-67cc74bcbb-2zw4x     1/1     Running   0          2m
   todofrontend-67cc74bcbb-w6fz5     1/1     Running   0          2m
   todofrontend-67cc74bcbb-wdhmh     1/1     Running   0          2m
   ```


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

**7.0**: Support canary release.

**6.0**: Support Kubernetes on the cloud (GKE for example).

**5.0**: Support ConfigMap and naming convention.

**4.1**: Use Kubernetes dashboard.

**4.0**: Support Kubernetes (locally).

**3.0**: Separate frontend and backend into 2 distinct containers.

**2.0**: Dockerize the app with simple `Dockerfile` and `docker-compose.yml`.

**1.0**: Extracted from Microsoft Docs.
