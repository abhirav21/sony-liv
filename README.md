# Sony live MetaData Cms
> For consolidating the input from various sources into a centralized Content Management System (CMS).

## Table of Contents
* [General Info](#general-information)
* [Frameworks Used](#frameworks-used)
* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)
* [Contact](#contact)


## General Information
- Contains REST Apis for creating/ingesting/updating/deleting/getting metadata


## Frameworks Used
- Nestjs - version 10.0.0

## Features
- RBAC implemented for creating/reading/updating/deleting metadata
- Provides role-specific outputs based on access levels
- Supported Roles : "Admin", "Editor", "Viewer"
- Integrated Swagger for better api documentation (http://localhost:3000/metadata/api)


## Setup
Please follow instructions for setup :

1. Clone this project and use the command `npm install` to initiate installation.

2. Start the project using `npm run start`. The default port is 3000. The project will be accessible on `http://localhost:3000/metadata/api`

3. Sample data will automatically be initialized into the in-memory db using a contructor.


Swagger is available on {host}/api

## Usage

To get all metadata, the GET Curl looks like the following : 

Example curl for getting all metadata 

`curl -X 'GET' 'localhost:3000/metadata' \
--header 'role: Admin' '
`

curl for get deleting metadata by id
`curl -X 'DELETE' \
  'http://localhost:3000/metadata/54a9ae93-984b-484a-ae64-f0d6d52187fa' \
  -H 'accept: */*' \
  -H 'role: Admin'`


curl for getting metadata by Id
`
curl -X 'GET' \
  'http://localhost:3000/metadata/e468389f-5f55-412b-a27c-d383eb3c923b' \
  -H 'accept: */*' \
  -H 'role: Admin'`
  
curl for getting metadata by movie name

`curl -X 'GET' \
  'http://localhost:3000/metadata/name/The%20Matrix' \
  -H 'accept: */*' \
  -H 'role: Admin'`

curl for modifying metadata by id

`curl -X 'PUT' \
  'http://localhost:3000/metadata/417d2b3a-217d-4498-9c7e-38577efee31c' \
  -H 'accept: */*' \
  -H 'role: Admin' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": "Tranformers 3"
}'`

Alternatively swagger can be used for API reference (http://localhost:3000/metadata/api).



## Contact
Created by abhirav - feel free to contact me at `abhirav_sharma@yahoo.com`!

