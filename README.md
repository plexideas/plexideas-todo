# Plexideas TODO

This is my pet-project - simple task manager. Tech stack: React, Redux, React Route, Google Auth and etc.

## Usage

To run this project you need:

```sh
$ yarn inastall
```

change config in ./server/config/keys.ts

```js
// Google credential
export const GOOGLE = {
  CLIENT_ID: "your google id",
  CLIENT_SECRET: "your google secret",
  CALLBACK_URL: "you google url"
};

// Setup mongodb connection
export const MONGODB = {
  MONGODB_URI: `you mongodb url`,
};

export const SESSION = {
  COOKIE_KEY: "thisappisawesome"
};
```

then need run:
```sh
yarn development
```

ps: prod build hasn't completed yet


## License

[MIT](LICENSE) © Sergei Sakharobskii
