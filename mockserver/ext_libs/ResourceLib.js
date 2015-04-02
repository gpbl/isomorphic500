import path from "path";
import { find } from "lodash";

import data from "./resources.json";

const ResourceLib = {

  sendAllUsers(req, res) {
    res.send({
      users: data.users
    });
  },

  sendUser(req, res) {
    const username = req.params.username;
    const user = find(data.users, {
      username: username
    });
    if (user) {
      res.send(user);
    }
    else {
      res.status(404).send({
        type: "RESOURCE_RESPONSE",
        message: `A user with username "${username}" does not exists.`,
        statusCode: 404
      });
    }
  },

  sendAllPhotos(req, res) {
    res.send({
      photos: data.photos
    });
  },

  sendPhoto(req, res) {
    const id = req.params.id;
    const photo = find(data.photos, {
      id: parseInt(id)
    });
    if (photo) {
      res.send(photo);
    }
    else {
      res.status(404).send({
        type: "RESOURCE_RESPONSE",
        message: `A photo with id "${id}" does not exists.`,
        statusCode: 404
      });
    }
  },

  sendAsset(req, res) {
    res.sendFile(path.resolve(__dirname, `../assets/${req.params.name}`), (err) => {
      if (err) {
        if (err.status === 404) {
          res.status(404).send("File not found.");
        } else {
          res.status(500).send(err.message);
        }
      }
    });
  }

};


export default ResourceLib;
