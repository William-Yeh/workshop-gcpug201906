# Run the Workshop on GKE (Google Kubernetes Engine)

This page shows you how to run the workshop on [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/) (GKE), a managed Kubernetes environment provided by [Google Cloud Platform](https://cloud.google.com/) (GCP). 


## Google Cloud Shell

If you're an experienced GCP user, just skip this section.

If you're new to the GCP, do the following exercise to get used to the GCP environment, and [Google Cloud Shell](https://cloud.google.com/shell/) in particular.

1. Create an account in [Google Cloud Platform](https://cloud.google.com/).

2. Complete the 45-minute exercise: [A Tour of Qwiklabs and the Google Cloud Platform](https://www.qwiklabs.com/focuses/2794?parent=catalog).



## Preparing for Kubernetes Cluster

1. Enable the **Kubernetes Engine API** for an existing or a new project by visiting the [GKE page](https://console.cloud.google.com/projectselector/kubernetes).

   This may take a few minutes to complete.  Keep the `PROJECT_ID` on hand since we'll use it many times.

2. Use **Cloud Shell** or your favorite shell to create a k8s cluster in the `us-west1-a` zone:

   ```
   % gcloud config set project PROJECT_ID
   
   % gcloud config set compute/zone us-west1-a
   
   % gcloud container clusters create gcpug201906 --num-nodes 3
   ```

3. Install the latest version of [Skaffold](https://skaffold.dev/) in Cloud Shell, if necessary:

   ```
   % curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64
   % chmod +x skaffold
   % sudo mv skaffold /usr/local/bin
   ```

4. Clone the repo of this workshop:

   ```
   % git clone https://github.com/William-Yeh/workshop-gcpug201906.git
   ```
5. Set the `PROJECT_ID`

    ```
   % export PROJECT_ID="$(gcloud config get-value project -q)"
   ```

Now you're ready to run the workshop on GKE!
