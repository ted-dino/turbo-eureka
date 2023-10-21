<h1 align="center">Tedflix (Yet Another Netflix clone)</h1>


<div align="center">
  <h3>
    <a href="https://weath3r-app.netlify.app/">
      Demo
    </a>
  </h3>
</div>

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Acknowledgements](#acknowledgements)
- [TODO's](#todo-list)
- [License](#license)

<!-- OVERVIEW -->

## Overview

![image](https://github.com/ted-dino/turbo-eureka/assets/84649871/81c7ddeb-57bc-45dd-9371-c6c2d77e49cf)

### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [Nextjs 13 App Directory](https://nextjs.org/docs)
- [Tailwind](https://tailwindcss.com/)
- [TMDB API](https://www.themoviedb.org/)
- [shadcn](https://ui.shadcn.com/)
- [Tantack Query](https://tanstack.com/query/latest/docs/react/overview)
- [Drizzle ORM](https://orm.drizzle.team/)
- [jose](https://github.com/panva/jose)
- [argon2](https://github.com/ranisalt/node-argon2)
- [Neon](https://neon.tech/)

## Features

Enjoy a seamless movie-watching experience with Tedflix, where you can effortlessly create and manage personalized playlists while exploring a vast library of your favorite films.

## How To Use

<!-- For example: -->

To use the TMDB API, obtain your API key [here](https://developer.themoviedb.org/reference/intro/getting-started).

For the DATABASE URL, sign up on [Neon](https://neon.tech/) and retrieve your connection string.

As for the Video Streaming API, you can choose one that suits your needs. An example is [vidsrc](https://vidsrc.me/).

After completing the setup, you can clone and run this application. To get started, make sure you have [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) installed on your computer. Node.js includes [npm](http://npmjs.com). Here are the steps from your command line:

```bash
# Clone this repository
$ git clone https://github.com/ted-dino/turbo-eureka.git

# Change directory
$ cd turbo-eureka

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

## Acknowledgements
- [react query run only when submit function is called](https://stackoverflow.com/questions/75592894/react-query-call-only-when-submit-function-is-called)
- [import Image with different name](https://stackoverflow.com/questions/71905267/can-i-import-next-image-with-a-different-name)
- [update a query param using next js 13 app directory](https://github.com/vercel/next.js/discussions/47583)
- [spinner component](https://codepen.io/ahopkins/pen/gPKzqY)
- [netflix like search input](https://codepen.io/lbnt/pen/jOPgrjV)
- [react hook form and zod validation](https://blog.bitsrc.io/react-form-validation-5aa06193bec4)
- [setting up neon database and drizzle](https://www.youtube.com/watch?v=NfVELsEZFsA&t=6592s)
- [set cookie on login](https://github.com/mehmetpekcan/nextjs-13-jwt-auth-example/blob/master/src/app/api/login/route.js)

## TODO List
- Refactor the code for improved maintainability and performance.
- Implement a mechanism to prevent users from clicking on other media items while content is loading.
- Address and fix the issue of iframe content blinking or flickering.
- Synchronize tabs for consistent user experience.
- Implement mobile navigation to ensure a seamless experience on small screens.

## License

Tedflix is licensed under the MIT License - see the [LICENSE](https://github.com/ted-dino/turbo-eureka/blob/main/LICENSE) file for details.

