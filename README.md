# Important!

We are still heavily developing on this tool. There is an NPM package registered but this is to protect the project name not begin available at time of release!

# mgs
The Mango ICT - CLI helps you create and deploy mango websites to the mangoictcloud.com.

[![NPM Version][npm-image]][npm-url]
[![Node Version][node-image]][node-url]
  
## Installation
To install the Mango ICT - CLI you just need to type in the following.

```
npm install mgs -g
```

Creating a mango website is very easy, first make a new directory.

```
mkdir testsite
cd testsite
```

Now lets add a MangoICT user to your project to be able to upload to the server.

```
mgs addUser
```

Start with the mangoboilerplate for your MangoICT website, lets initialise the new project.

```
mgs init
```

Now lets push this baby to the mangoictcloud.com cloud webserver.

```
mgs push
```

And there you go.. You have just build your first juicy mango website.
Do you have changes? Just use the push command to commit your changes to the server.

## License

  [Apache 2.0](LICENSE)
  
[npm-image]: https://img.shields.io/badge/npm-v2.7.4-brightgreen.svg
[npm-url]: https://npmjs.org/package/mgs
[node-image]: https://img.shields.io/badge/node-v0.12.2-brightgreen.svg
[node-url]: https://npmjs.org/package/mgs
