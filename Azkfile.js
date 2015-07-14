/* global systems sync persistent path */

// Documentation: http://docs.azk.io/Azkfile.js

// Adds the systems that shape your system
systems({
  "isomorphic500-dev": {
    // Dependent systems
    depends: [],

    // More images:  http://images.azk.io
    image: {docker: "azukiapp/node:0.12"},

    // Steps to execute before running instances
    // use reprovision to run again: `azk restart -R`
    provision: [
      "npm install"
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    command: "npm run dev",

    // wait for port inside container
    wait: {retry: 20, timeout: 1000},
    mounts: {
      "/azk/#{manifest.dir}": sync("."),
      "/azk/#{manifest.dir}/node_modules": persistent("#{manifest.dir}/node_modules")
    },
    scalable: {default: 1},
    http: {
      domains: ["#{system.name}.#{azk.default_domain}"]
    },
    ports: {
      http: "3000/tcp",
      hot: "3001:3001/tcp"
    },
    envs: {
      HOST_NAME: "#{system.name}.#{azk.default_domain}",
      NODE_ENV: "dev",
      PORT: "3000",
      HOST: "0.0.0.0"
    },
    export_envs: {
      APP_URL: "#{azk.default_domain}:#{net.port.http}"
    }
  },

  "isomorphic500-prod": {
    extends: "isomorphic500-dev",
    provision: [
      "npm install"
    ],
    scalable: { default: 0, limit: 1 },
    command: "npm run build && npm run prod",
    wait: {retry: 40, timeout: 1000},
    ports: {
      http: "8080/tcp"
    },
    envs: {
      HOST_NAME: "#{system.name}.#{azk.default_domain}",
      NODE_ENV: "production",
      PORT: "8080",
      HOST: "0.0.0.0"
    },
    export_envs: {
      APP_URL: "#{azk.default_domain}:#{net.port.http}"
    }
  },

  "ngrok-dev": {
    // Dependent systems
    depends: ["isomorphic500-dev"],
    image: {docker: "azukiapp/ngrok"},

    // Mounts folders to assigned paths
    mounts: {
      // equivalent persistent_folders
      "/ngrok/log": path("./log")
    },
    scalable: { default: 0, limit: 1 },

    // do not expect application response
    wait: false,
    http: {
      domains: ["#{system.name}.#{azk.default_domain}"]
    },
    ports: {
      http: "4040"
    },
    envs: {
      NGROK_CONFIG: "/ngrok/ngrok.yml",
      NGROK_LOG: "/ngrok/log/ngrok.log"
    }
  },

  "ngrok-prod": {
    // Dependent systems
    depends: ["isomorphic500-prod"],
    image: {docker: "azukiapp/ngrok"},

    // Mounts folders to assigned paths
    mounts: {
      // equivalent persistent_folders
      "/ngrok/log": path("./log")
    },
    scalable: { default: 0, limit: 1 },

    // do not expect application response
    wait: false,
    http: {
      domains: ["#{system.name}.#{azk.default_domain}"]
    },
    ports: {
      http: "4040"
    },
    envs: {
      NGROK_CONFIG: "/ngrok/ngrok.yml",
      NGROK_LOG: "/ngrok/log/ngrok.log"
    }
  }

});
