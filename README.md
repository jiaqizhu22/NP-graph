# NP-graph Live 
Developer: Jiaqi Zhu *Software Engineering Student @UNSW

Backend: fastapi
Frontend: React, Vis.js


## Backend Commands
$ mkdir my_project && cd my_project
$ virtualenv project_env

Start virtual env:
$ source project_env/bin/activate
or 
$  . project_env/bin/activate
(project_env) $ pip install fastapi uvicorn[standard]

$ uvicorn main:app --reload
$ curl -X 'GET' \
  'http://127.0.0.1:8000/' \
  -H 'accept: application/json'

(project_env) $ deactivate

## Requirements
pip3 freeze > requirements.txt