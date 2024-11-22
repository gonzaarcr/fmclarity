## Getting Started

Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API url

The api url is in `src/app/types/constants.ts`. There is one default but it probably reach the request limits, here are a few more for quick access:

```
https://crudcrud.com/api/4a00d681944840d5a49ec80b8fcdcc64
https://crudcrud.com/api/5c6d699832694beb8d412e941f289d0d
https://crudcrud.com/api/5f0b338348d0437caffd2507bbfbd8e6
https://crudcrud.com/api/6f119e9025ec415780dcbc1859aae4c2
```

## Populate the services

There‘s no UI to add a service, this request can be used for that

```
curl 'https://www.crudcrud.com/api/4a00d681944840d5a49ec80b8fcdcc64/services' -X POST --data-raw '{ services: ["Service 1", "Service 2"]}' -H 'Content-Type: application/json' 
```