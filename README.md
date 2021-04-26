# Frontend exercise

> a simple team Overview app

- Build with `Create React App` and `Typescript`

## [Live Demo](https://frontend-exercise-jun.vercel.app/)

## Usage

Prerequisites: `node > v12 `

1. Clone this repo

```shell
> git clone https://github.com/gjuoun/frontend-exercise.git
```

2. Install dependencies

```
> npm install
```

3. Run the app

```
> npm start
```

4. Go to `http://localhost:3000` to view the app

To test the app:

```
> npm test
```

## About this project

This project is intended to be my submission to a code test from Tempo.io. The goal is to build a team overview web app.

As I'm pretty familiar with react and typescript, then I chose `create-react-app --template typescript` as the project boilerplate, and `react-bootstrap` as the UI framework.

The app looks straightforward, but the trickiest part is state management, I assumed this project is to be an enterprise-ready app, so that I used `react-redux` but actually it's not necessary.

Anyway, it's there; if you want to skip the redux part, please ignore the`./src/redux` folder.

### Important files to look at

- `./src/pages/routes.tsx`

  - routes for the whole app

- `./src/pages/Overview.tsx`

  - home page for `localhost:3000/`

- `./src/pages/Team.tsx`

  - team page for `localhost:3000/team/:teamId`

- `./src/hooks/*.ts`

  - are custom hooks for fetching users and teams from the backend then return useful data with proper loading state.

- `./src/type/*.ts`
  - see the definitions of `User` and `Team` interfaces
