# MeteorVR
Web-based, shared (not-yet, WIP), VR experience made with A-frame, React and Meteor.

Working on implementing the ability to join a shared VR scene with your friends. Help WELCOME!

### Quickstart

1. Clone & cd into directory
2. `meteor npm install`
3. `meteor npm start`

Now proceed to http//localhost:3000/meteor-vr

### Deployment setup

Make sure you have MUPx installed globally (npm i -g mupx).

1. `mkdir .deploy/development && cd .deploy/development
2. `mupx init`
3. Open freshly created mup.json and edit it to look like this:

```json
{
  "servers": [
    {
      "host": "46.101.228.59",
      "username": "root",
      "pem": "~/.ssh/id_rsa"
    }
  ],

  "setupMongo": true,

  "appName": "meteor-vr",

  "app": "~/projects/experiments/multiplayer-vr",

  "env": {
    "PORT": 5000,
    "ROOT_URL": "http://experiments.dimensionlab.org/meteor-vr"
  },

  "deployCheckWaitTime": 60,

  "enableUploadProgressBar": true
}
```

Save it and make sure you have SSH keys added to DimensionLab's server.
Now you can deploy with `mupx deploy` command. The server is already configured.
Also, from now on, you don't need to go into .deploy/development folder to start
a deployment process - you just need to be in root folder of this repo and write
`meteor npm run deploy-dev`!

### Something for reference & inspiration

* https://github.com/georational/georational.github.io
* https://github.com/ngokevin/aframe-firebase-component
