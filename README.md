# Awesome AWS
The goal of this project is to run a simple hello world application inside a container managed by kubernetes inside the aws infrastructure. This project will suport:
- `continuos integration and deployment`
- `test drive development`
- `monitoring, alert, observability`
- `monorepo file structure`

This project can also contain some common patterns from microservice architecture.

## Features and app structure
This project includes a simple `Node.js hello world app with express` which can be accessed by an `API gateway over nginx`. The app container will be closed for directly port access (like <i>localhost:3000</i>) and will be only accessible throught the `gateway`. The app will only respond for the `/` and `/health` route(s).

The app's `observability/monitoring/alerting` will be managed by the `Elastic ELK` stack.

It will be created a `build pipeline on aws`, and the deploy will be managed by a `EKS aws service` which will try to keep `3 running instances` of the app.

This project will be structured as a monorepo within all <i>services</i> inside their own directories. <b>Note:</b><i> so remember to manage it on the build pipeline.</i>

## Future features
- Service registry/discovery
- Circuit breaker

## Tecnologies used
- Node.js
- Nginx
- Elastic ELK (Elasticsearch, Logstash, Kibana, Beats)
- Kubernetes
- AWS

## Extra tecnologies
Some extra tecnologies may be included (if any new idea) such as:

- Typescript
- AWS Lambda
- Redis