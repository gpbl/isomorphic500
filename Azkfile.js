/* global systems sync persistent */

// Documentation: http://docs.azk.io/Azkfile.js

// Adds the systems that shape your system
systems({
  isomorphic500: {
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
    }
  },

  "isomorphic500-prod": {
    extends: "isomorphic500",
    provision: [
      "npm install"
    ],
    scalable: {default: 1},
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
    }
  }

});
