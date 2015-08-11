# isomorphic500 :: Azkfile.js

With [azk](http://azk.io/), you don't even need Node.js installed on your machine. It can start the application in both development and production modes. It also configures a [ngrok](https://ngrok.com/) system which allows us to expose the site over the web and analyzes all requests made.

### Systems

#### [isomorphic500](http://isomorphic500.dev.azk.io)

- development version
- webpack dev hot loader active

#### [isomorphic500-prod](http://isomorphic500-prod.dev.azk.io)

- production version

#### [ngrok](http://ngrok.dev.azk.io)

- exposes dev version

#### [ngrok-prod](http://ngrok-prod.dev.azk.io)

- exposes production version

#### deploy

- automatic deploys to Digital Ocean

#### fast-deploy

- just update code

--------------------

## Running with azk

### Installing azk

- [Install azk on Linux](http://docs.azk.io/en/installation/linux.html)
- [Install azk on Mac OS X](http://docs.azk.io/en/installation/mac_os_x.html)

- Or simply run:
> You'll need Docker installed if you are using Linux or VirtualBox if you are using Mac OS X

```bash
$ curl -Ls http://azk.io/install.sh | bash
```

### Running isomorphic500 locally

```bash
$ azk start -Rv isomorphic500
```

- [isomorphic500.dev.azk.io](http://isomorphic500.dev.azk.io/)

> If you want to run the production environment, just replace `isomorphic500` by `isomorphic500-prod` in the command above.

### Exposing your app to the web

You can expose your app to the web via a public URL using ngrok:

```bash
$ azk start -Rv ngrok
```

- [ngrok.dev.azk.io ](http://ngrok.dev.azk.io/)

> If you want to expose the app running in production environment, just replace `ngrok` by `ngrok-prod` in the command above.


### Checking logs

```bash
$ azk logs --follow
```

### Deploying to Digital Ocean

```sh
# first you have commit your changes;
# there will git-hook on remote machine

# call this at first time
azk shell deploy

# this command is faster, because does not
# setup/configure the remote machine
azk shell fast-deploy
```

--------------------

### Other azk commands

#### stop all containers

```sh
$ azk stop
```

#### restart all container

```sh
$ azk restart
```

#### restart and reprovision all container

```sh
$ azk restart -Rvv
```

#### check logs

```sh
$ azk logs
```

#### info on containers

```sh
$ azk info
```

--------------------

### azk troubleshooting

*Removing root ownership from files*

Once Docker runs as [root user](https://docs.docker.com/installation/ubuntulinux/#create-a-docker-group) inside container, if you want to access `node_modules` files from your machine, you have to set the proper files ownership.

```bash
# Fix node_modules ownership
$ sudo chown -R `id -un`:`id -gn` node_modules
```

*Further help*

See [official azk troubleshooting](http://docs.azk.io/en/troubleshooting/README.html)

-----------------------
### more on azk

- Official Site
  http://azk.io
- Github
  https://github.com/azukiapp/azk
- Documentation
  http://docs.azk.io
- Images directory created by the azk team
  http://images.azk.io

### Contribute to azk

- Star azk on Github
  https://github.com/azukiapp/azk
- Report an issue
  https://github.com/azukiapp/azk/issues/new
- Help solving a reported issue
  https://github.com/azukiapp/azk/issues
- Check out our awesome sponsors
  http://azk.io/#sponsors

### Stay in touch with the azk team

- Sign up the weekly digest
  http://www.azk.io/#newsletter
- Follow the blog
  https://medium.com/azuki-news
- Talk to our support (chat)
  https://gitter.im/azukiapp/azk (English) e https://gitter.im/azukiapp/azk/pt (Português)
- Facebook
  https://www.facebook.com/azukiapp
- Twitter
  http://twitter.com/azukiapp
