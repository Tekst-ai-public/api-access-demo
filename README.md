# Express Server
This is an example backend for how to interact with api.tekst.ai. It's a basic express app with some middleware and some basic endpoints.

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and set the following environment variables:
```
TEKSTAI_BASE_URL=https://api.tekst.ai:8000/openapi
TEKSTAI_API_KEY=<api-key>
```
Replace `<api-key>` with the actual values provided by the remote API.

## Usage
To start the server, run:

```cmd
npm start
```
The server exposes the following endpoints:

- `GET /test`: Indicates if the server is running.
- `GET /connect`: Returns an oauth url based on a given email and name (in state).
- `GET /callback`: Handles callback requests from the remote API and redirects to http://localhost:3000.
- `POST /send/:id`: Sends an email in the name of the connected account using the tekst.ai api key.
- `GET /integrations`: Retrieves all mail integrations from tekst.ai and returns them to the client.

Note that some endpoints require authentication using an x-api-key header, which is set automatically using the dotenv environment variables.

# React App
Together with this backend, comes a basic frontend, to demonstrate how you could implement the integration.

## Installation
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and set the following environment variables:
```
REACT_APP_SERVER_BASE_URL=http://localhost:8000
```

## Usage
To start the server, run:

```cmd
npm start
```