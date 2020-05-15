# Node App Template
This is a simple Node.js hello world application to be used as template for doing things like:

- `Continuous integration and deployment`
- `Code coverage`
- `TDD`
- `Log aggregation`
- `Monitoring and alerting`

## Motivation
This project started as an ideia of a template for studying Kubernetes and AWS services like `EKS`. Node.js was choosen as it is my main programming language.

Many ideas and new technologies - which I may like to study - may arise in future releases of this project as a side configuration/development.

## Tecnologies around
- Typescript
- ESLint
- Express
- Elastic ELK stack (Elasticsearch, Logstash, Kibana, Filebeat)
- Prometheus and Grafana
- Kubernetes
- Github Actions
- AWS

## How it works
This project includes a simple `Node.js hello world app with express` with the following avaiable routes:

- `/` - Index route.
- `/health` - Route for checking the healthcheck of the service.
- `/pid` - Get the `process id` within the container where it is running.
- `/version` - Return the app's version, a good case for testing new deployments throught the build pipeline.

The app's `observation/monitoring` will be managed by `Prometheus`, while the `aggregation of logs` will be handled by the `ELK stack`.

<b>Note:</b> `This project is structured as a monorepo.`

## Running with docker compose

`Node app`, `ELK` and `Prometheus` each one have its own `docker-compose.yml` file. Start the containers as needed, running:

```bash
# cd app/ or elk/ or prometheus/ and:
docker-compose build -f docker-compose.yml
```

## Deploying Kubernetes locally or in Amazon EKS
Having pre-configured `EKS`cluster up and running, or running the `minikube` version:

```bash
# Deploy the app replicas
kubectl apply -f kubernetes/deployments/app-deployment.yaml

# Expose the app using a LoadBalancer
kubectl apply -f kubernetes/services/app-service.yaml
```

## Building and publishing docker image
```bash
cd app/

# Build
docker build -t node-app-template .

# Tag
docker tag node-app-template ffrm/node-app-template

# Push
docker push ffrm/node-app-template
```

## Monitoring
Grafana will be accessible on `http://localhost:3000` after Prometheus container creation.

## Log aggregation
The application is configured to output all requests to `app/log/requests.log` and general application logs to `app/log/app.log`. `Filebeat` will monitor these files and will `push` new outputs to `elasticsearch`. Kibana will be accessible on `http://localhost:5601` after elk container creation. The `default user` is `elastic`, and password is `changeme`.