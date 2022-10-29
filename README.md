# Udacity-ImageProcessingAPI

This project was created as part of the Udacity Full Stack JavaScript Developer Nanodegree. The intent was to create an Image Processing API that would provide a scaled image given a width and height.

## Setup and Run

1. Clone the repository to your local machine.
2. Run `npm install` to install the necessary packages.
3. Run `npm start` to build the code and start the server.

- Run tests with `npm test`.
- Start the server in developer mode with `npm dev-start`. This will start the server with [nodemon](https://nodemon.io/), so that saving changes to any files will restart the server with the new changes included.

## Implementation

The following endpoints can be accessed (assumes you're using the default server URL - `http://localhost:3000`):

- http://localhost:3000/api/image
  - Responds with a JSON body indicating the names of the images you can reference.
- http://localhost:3000/api/image?name={image name}
  - Responds with the full-size image requested.
- http://localhost:3000/api/image?name={image name}&width={width}&height={height}
  - Responds with the specified image scaled to the given width and height.
  - If the `name` is not provided, it will respond with a scaled `placeholder.jpeg`.
  - If the `height` is not provided, it will use `width` in its place and respond with a square image (`width` x `width`).
  - If the `width` is not provided, it will use `height` in its place and respond with a square image (`height` x `height`).
- http://localhost:3000/\*
  - Any other endpoint requested will respond with a message stating the "Endpoint does not exist".

## Technical Details

The image assets are stored in the `src/assets` folder. When requested for a resize, the server will look to see if a resized image already exists instead of recreating it. These scaled files are stored in `src/assets/thumbnails/{width}/{height}` and can be deleted as needed. The server uses [sharp](https://sharp.pixelplumbing.com/) for image manipulation.

## Packages Used

- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Express](https://expressjs.com/)
- [Jasmine](https://jasmine.github.io/)
- [Nodemon](https://nodemon.io/)
- [Sharp](https://sharp.pixelplumbing.com/)
