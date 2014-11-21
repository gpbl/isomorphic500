# react-express-template

* Use of webpack with webpack hot reload
* Server-side rendered components


# Running

```bash
node server
```

# Building

Run the gulp build task to create a build. The task compiles the client's javascript files with webpack and divide them in two chunks: `lib.js` (containing the common libraries) and `main.js` (containing the app). 

```bash
# Create a build in the /build directory
gulp build

cd build

# Download packages 
NODE_ENV=production npm install

# Run the built server
NODE_ENV=production node server
``` 
