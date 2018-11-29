#!/bin/bash

# Get current environment from arguments or git
if [ $1 ]
then
  environment=$1
  branch=`git symbolic-ref --short HEAD`

  echo && echo "Environment: $environment"
  echo "Branch you're in: $branch"
  echo "Do you want to continue? (y/n)"
  read cont
  if [ $cont = "y" ]
  then

    # Set bucket and region based on environment
    case $environment in
      dev  )
        bucket="s3://dev.7greenlights.com"
        region="us-east-1"
        buildcommand="build-dev";;
      production )
        bucket="s3://www.7greenlights.com"
        region="us-east-1"
        buildcommand="build";;
      * )
        echo "Invalid environment parameter. Options are: 'dev', 'staging' and 'production'"
        exit;;
    esac

    # Build the app
    npm run "$buildcommand"

    # Deploy files on ./public to bucket
    flags="--region $region --acl public-read --delete"
    aws s3 sync public $bucket $flags --cache-control "public, no-cache, max-age=43200"

  else
    echo "Bye then!"
  fi
else
  echo && echo "You must specify an environment as the first parameter. Options are: 'dev', 'staging' and 'production'"
fi


