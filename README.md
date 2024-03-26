# ✨ Ecommerce Platform (Next.JS + TS)

Welcome to this **ecommerce app** app repository, built with Next.JS and Typescript, and of course, with a flavour of tons of awesome community open source packages.

So, while learning something new, I wanted to embrace the adventure of creating this project.

I wanted to create an app similar to Shopify but small in size, keeping the concept of creating a platform where users can create their virtual stores in one place, without worrying about the infrastructure management, layout customization or anything else.

You can find the API source code [here](https://github.com/KainNhantumbo/sales-api) to learn more about the features implementation on the backend.

**Access this app live at: [https://sales-app-demo.vercel.app](https://sales-app-demo.vercel.app)**

## 📷 **Here are some screenshots:**

![](./src/assets/1.png?raw=true)
![](./src/assets/2.png?raw=true)
![](./src/assets/3.png?raw=true)
![](./src/assets/4.png?raw=true)
![](./src/assets/5.png?raw=true)

## 🌠 Project status

Note: This project still under development and not all of the features stated before may be already available yet. Further details of its building, software architecture and features will be given as the app grows.

## 🌳 Project structure

```
$PROJECT_ROOT
│
├── public
└── src
    ├── assets
    ├── components
    ├── config
    ├── context
    ├── lib
    ├── pages
    ├── shared
    ├── styles
    └── types
```

## 🐾 Project Stack

- **Typescript** - a superset language of Javascript that provides typechecking.
- **Vite** - a next generation frontend tooling.
- **React.JS** - library used to build big, fast Web apps with JavaScript.
- **Styled Components** - library to write styles for components.
- **Node.JS** - javascript runtime.
- **Framer-motion** - for advanced layout animations.
- **Tanstack Query (known as React Query)** - library that simplifies query management, state and caching.
- **Editor.JS** - enables an advanced text editing in textarea with plugins (give it a try).
- **React Gallery** - a library that adds a wrapper to present images.

## 🎊 Features Log

### - Version v0.27.0 (beta) [First Release]

- **Accessability and layout**: added support dark and light themes. Users can change theme manually or based on operating system color scheme.

- **Feed**: users can create, favorite and share posts, then publish on a feed available for the public.

- **Denounce system**: users can denounce products that doesn't meet the community guidelines, contain offensive or inappropriate content.

- **Cart**:

  1. added support to manage (add, remove and update) cart items.
  2. added support to favorite products.
  3. cart state is stored on local storage.

- **Stores**:

  1. Added support manage store products, search other stores and visualize their metrics.
  2. Added support to create and customize store profile, cover image and insert details.
  3. Support to manually activate or deactivate store (modifies public visibility of the store and all products in it).
  4. Stores can be verified (e.g. store certification).

- **Users**:

  1. Users can have a customizable profile, including profile and cover images.
  2. Handle user login, registration and authentication with jwt (JSON web tokens) strategy.
  3. Users can sign a monthly subscription to maintain then stores active;
  4. View list of favorite products.
  5. Users can share public products on social media.

- **Built-in comments system**: users can now add comments to products.

- **Server API**: Store all data in Mongo DB, handled by a separated Node.JS with Express.JS server application.

## 🏗️ Testing and Local Setup

Make sure you have installed **Node.js (v18.17.0 or later recommended) which also comes with npm v9.6.7**.\
In the project directory, you can run in terminal:

```bash
 npm run dev
```

Runs the app in the development mode and the server will reload when you make changes to the source code.

```bash
npm run build
```

Builds the app for production to the **dist folder**.

```bash
npm run start
```

Builds and starts the server in production.

## ☘️ Find me!

📭 E-mail: [nhantumbok@gmail.com](nhantumbok@gmail.com 'Send an e-mail')\
📚 Github: [https://github.com/KainNhantumbo](https://github.com/KainNhantumbo 'See my github profile')\
📑 Portfolio: [https://codenut-dev.vercel.app](https://codenut-dev.vercel.app 'See my portfolio website')\
✒️ My Blog: [https://codenut-dev.vercel.app/en/blog](https://codenut-dev.vercel.app/en/blog 'Visit my blog site')

#### If you like this project, let me know by leaving a star on this repository so I can keep improving this app.😊😘

Best regards, Kain Nhantumbo.\
✌️🇲🇿 **Made with ❤ Next.JS and Typescript**

## 📜 License

Licensed under Apache License 2.0. All rights reserved.\
Copyright &copy; 2024 Kain Nhantumbo.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
