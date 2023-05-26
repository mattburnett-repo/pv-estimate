![repo header](images/header.png?raw=true 'Photovoltaic Estimate')

# Photovoltaic Estimate

This is a small, proof-of-concept project that retrieves photovoltaic electricity production estimates from a third-party API located [here](https://api.forecast.solar/estimate/52/12/37/0/5.67). Its purpose is to demonstrate how to use several common AWS services to request data from a third-party API, then process the returned data and return the processed results to a client app.

The project is [hosted on AWS S3](http://pv-estimate.s3-website.eu-north-1.amazonaws.com/).

This project implements an AWS-based version of an Express/Typescript/React stand-alone app located [here](https://github.com/mattburnett-repo/generic_code_challenge_02).

The provided functionality is very minimal:

- The React app is stored as a static asset in AWS S3.
- The React app sends a request to an AWS API Gateway endpoint.
- The API Gateway endpoint sends a request to a [third-party API](https://api.forecast.solar/estimate/52/12/37/0/5.67).
- The third-party API returns raw estimate data to the AWS API Gateway.
- The AWS API Gateway parses and reformats the raw estimate data, and returns it to the React app.
- The React app displays the parsed and formatted data to the user.

## Tech Stack

- React
- AWS
  - S3
  - API Gateway
  - Lambda
- Third-party external API

## Dev Notes

This repo does not provide a 'ready to run' application, meaning that you can't follow the standard process of cloning / installing / running the code.

This repo is simplay a place to archive the assets for the project.

There are probably assets in this repo that are not relevant to the project, since they were copied from the preceeding project found [here](https://github.com/mattburnett-repo/generic_code_challenge_02).

To recreate the project you will need to:

- Build the React app
- Upload the build to an AWS S3 bucket.
- Set up an AWS API Gateway endpoint.
- Create AWS Lambda functions based on the folders in the 'backend/lambdaFunctions' folder.
- Copy the AWS Lambda functions code to their respective folders.
- Confiigure all of the required permissions in AWS IAM.

## To Do

- To Do items are listed in the repo's ['Issues'](https://github.com/mattburnett-repo/pv-estimate/issues) section.
