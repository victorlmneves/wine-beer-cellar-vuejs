# Wine & Beer cellar Vue.js App

Simple app listing wines/beers with detail view and option to add new items to the list.

It uses localStorage to store the data and also as state using Vuex. If there's no data on the localStorage with reads an initial list from a local json file.
When add new items to the list, the image is gave on [Cloudinary](https://cloudinary.com/) (a cloud-based image and video management service)
The solution uses Vuex in order to easily be changed to work with an external API removing the code where it saves and read from localStorage or combine them to have persistent state. It allows to reload the item detail page and, also filter and/or sort the item without doing extra requests to the API.
This idea is based on app that will not have an huge quantity of items to list, otherwise it would be better to implement pagination on the API.
If you prefer for an app simple like this and, few products, you can fetch the data from the API and remove the Vuex and implement a simple logic. Check this [reposity](https://github.com/victorlmneves/search-team-vue) for more details.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

___

![Codecov](https://img.shields.io/codecov/c/github/victorlmneves/wine-beer-cellar-vuejs)
