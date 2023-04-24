## COPYGEN Frontend App

This app is built using ReactJS. You can specify backend in `app.js`, if you want to change. All major modules are in `src` directory.

### Run Locally
```
npm start
```

### Using Docker
Using docker makes it easier to run API on any environment
```
docker build -t copygen-app .
docker run -p 80:80 copygen-api
```

### Deploy to GCloud
You can also send build to gcloud container registry using GCloud console. Change `PROJECT_ID` and `REPO_NAME` according to your requirements.
```
gcloud builds submit --tag gcr.io/PROJECT_ID/REPO_NAME
```
Then you can either deploy using `CLI` or `Console`