# 4u.template.repo

This repository provides a template for creating Docker containers and inheriting CI.

## Usage

1. **Use this repo as Template**  
   To use the CI from this repository, set this repo as template for your new repo or copy the configuration into your project.

2. **Write a Dockerfile**  
   Create a `Dockerfile` in your project. Example of a minimal Dockerfile: [Dockerfile](Dockerfile)

3. **Set up your project**
   Ensure your repo's github actions turned on and CI/CD pipeline is configured to build and deploy your Docker image using your Dockerfile.

### Example: Run Locally

To test your Docker image locally:

```bash
docker build -t your-app .
docker run --rm your-app
```

## Support

If you have any questions, feel free to ask [@pieceowater](https://github.com/pieceowater).
