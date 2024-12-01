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
curl 'https://www.crudcrud.com/api/b0f6d15d7364406397b9dc3370edf1f9/services' -X POST --data-raw '{"service": "Service 1"}' -H 'Content-Type: application/json'
curl 'https://www.crudcrud.com/api/b0f6d15d7364406397b9dc3370edf1f9/services' -X POST --data-raw '{"service": "Service 2"}' -H 'Content-Type: application/json'
```

## Using

By navigating to http://localhost:3000/contractors a list of contractors will be presented. A new contractor can be added with the "Add" button on the top. A form will be presented, where name, telephone, email and services have to be filled. All fields are required. The telephone has to be a number between 9 and 11 digits and can start with a plus (+) sign. The email has to have an alphanumeric username, an "at" sign (@), a domain, and finish with ".com". At least one service has to be selected to create a contractor. After submitting, the user will be redirected to the contractors list with a message confirming the operation was successful.

From the list, a contractor can be viewed by pressing the "View" button on the corresponding row. All fields can be viewed there, and we go to the edit page with the "Edit" button. There’s also a button to go to a summary page that lists only the name and the service the contractor provides, in case that information wishes to be shared.

## Local version

There‘s an option to use the local storage instead of an external API to make things simpler. You just have to go to http://localhost:3000 and click on the local option. And to load service you just have to run the command `localStorage.setItem('/services', JSON.stringify([{service:"Service 1"}, {service:"Service 2"}]))`, where "Service 1" and "Service 2" can be replaced with the desired services.
