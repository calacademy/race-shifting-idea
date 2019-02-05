# race-shifting-idea
React UI for "Race: A Shifting Idea" touchscreen interactive in "Skin"
exhibit.

## Installation

Clone race-shifting-idea repo locally.

Unpack node modules via Yarn:

```
$ cd race-shifting-idea
$ yarn
```

Find .env files in team Google Drive:
```
+-- DME: Web & Interactive
|   +-- Exhibit Interactives
|   |   +-- Skin Exhibit
|   |   |   +-- Race: A Shifting Idea
|   |   |   |   +-- Technical
```

Copy .env files into root of local race-shifting-idea project

## Build Notes

### .env.production variable for webpack module bundler build
The URL for the events data feed is saved as global REACT_APP_EVENTS_REST_URL
variable expected by webpack prod distribution builds. The variable is
saved in local .env.production file in project root and excluded from repo.

## Development and Production Builds

Webpack build init scripts in package.json. Webpack config for 'start' script
automatically rebuilds to '/build' on src edit. Run local webserver on /build
dir for dev work (browser auto-refresh in place). While 'start' script is
running, Webpack will use development variable in .env.development file (see
  above). Stop 'start' script and run 'build' script to build app to /build
  using production variable in .env.production file (prior to deployment).

```
yarn start
yarn build
```

## Deploy Notes

The deploy script deletes s3://race-shifting-idea.calacademy.org content and
copies local build folder contents to s3://race-shifting-idea.calacademy.org.

```
yarn deploy
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
