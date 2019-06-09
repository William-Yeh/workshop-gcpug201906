# Kubernetes dashboard

To use [Kubernetes dashboard](https://github.com/kubernetes/dashboard) locally, follow the steps below:

1. Install the Kubernetes dashboard:

   ```
   % kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml
   ```

2. Create a secure channel to your Kubernetes cluster:

   ```
   % kubectl proxy
   ```

3. Now access Dashboard at:

   ```
   http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/
   ```


To login into the dashboard, you need to retrieve the [bearer token](https://github.com/kubernetes/dashboard/wiki/Access-control#getting-token-with-kubectl).  Follow the steps below:

1. Check existing secrets in `kube-system` namespace:

   ```
   % kubectl -n kube-system get secret
   ```

2. Now dig into the secret named `replicaset-controller-token-`xxx :

   ```
   % kubectl -n kube-system describe secrets replicaset-controller-token-kzpmc
   ```

3. Use the **token** above to login into the Kubernetes dashboard.
