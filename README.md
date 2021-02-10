[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f395d979637144eb85dec003a3346aaf)](https://www.codacy.com/gh/Knawat/knawat-moleculer-template?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Knawat/knawat-moleculer-template&amp;utm_campaign=Badge_Grade)

# Moleculer TypeScript Template by Knawat
We built our own template in Knawat and decided to share it with community as a full featuered Moleculer TypeScript template:
- One command to run, build and hot reloaded using tsc-watch
- Using Shopify Eslint plugin
- OpenAPI Example ready
- Using Mongoose
- Deployment template files for Docker, AppEngine and more later

## Usage
Start the project with `npm run dev` command.
After starting, open the http://localhost:3000/ URL in your browser.
On the welcome page you can test the generated services via API Gateway and check the nodes & services.

In the terminal, try the following commands:
- `nodes` - List all connected nodes.
- `actions` - List all registered service actions.
- `call greeter.hello` - Call the `greeter.hello` action.
- `call greeter.welcome --name John` - Call the `greeter.welcome` action with the `name` parameter.
- `call products.list` - List the products (call the `products.list` action).


## Services
- **api**: API Gateway services
- **greeter**: Sample service with `hello` and `welcome` actions.
- **products**: Sample DB service. To use with MongoDB, set `MONGO_URI` environment variables and install MongoDB adapter with `npm i moleculer-db-adapter-mongo`.

## Mixins
- **db.mixin**: Database access mixin for services. Based on [moleculer-db](https://github.com/moleculerjs/moleculer-db#readme)


## Useful links

- Moleculer website: https://moleculer.services/
- Moleculer Documentation: https://moleculer.services/docs/0.14/

## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report

## Kubernetes deploy
We will deploy our cluster into gcloud.

-  `export PROJECT_ID=knawat-moleculer-template`: To save project name (in which project in google you will deploy your cluster) as a variable on your machine
-  `docker build -t gcr.io/${PROJECT_ID}/knawat-moleculer-template-app:v1 .`: To build the docker image of the application
Pushing Docker image to conatiner registery
-  `gcloud services enable containerregistry.googleapis.com`
-  `gcloud auth configure-docker`
-  `docker push gcr.io/${PROJECT_ID}/knawat-moleculer-template-app:v1`
Create the cluster on gcloud
-  `gcloud config set project $PROJECT_ID`
-  `gcloud config set compute/zone us-west1`: you have to change zone as your project or your cluster zone
-  `gcloud container clusters create knawat-cluster`
-  `kubectl create secret generic mysecret --from-env-file=.secret`: Create a secret contains variable like users and passworda and connection string
-  `kubectl create configmap common-env --from-env-file=.common-env`: Create a common variable shared by the pods
-  `kubectl apply -f k8s/api-deplyment.yaml -f k8s/products-deployment.yaml -f k8s/k8s.yaml`: start the Kubernetes






