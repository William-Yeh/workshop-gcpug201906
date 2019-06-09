---
apiVersion: v1
kind: Service
metadata:
  name: todofrontend
  labels:
    app: todo
    tier: frontend
spec:
  type: LoadBalancer
  #loadBalancerIP: 111.222.333.444  # external IP (ephemeral or static)
  ports:
    - name: http
      port: 80
      targetPort: 80
  selector:
    app: todo
    tier: frontend

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: todofrontend
  labels:
    app: todo
    tier: frontend
    track: stable

spec:
  replicas: 3
  selector:
    matchLabels:
      app: todo
      tier: frontend
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate

  template:   # pod definition
    metadata:
      labels:
        app: todo
        tier: frontend
    spec:
      containers:
        - name: todofrontend
          image: gcr.io/PROJECT_ID/todofrontend:6.0
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 80
          envFrom:
            - configMapRef:
                name: config.cloud
          #env:
          #  - name: TODOAPI_HOST
          #    value: "localhost"
          #  - name: TODOAPI_PORT
          #    value: "30080"
          #  - name: TODOAPI_PATH
          #    value: "api/todo"
      #dnsPolicy: ClusterFirst
      #restartPolicy: Always
