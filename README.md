# Local Bytes 🍔

## ⚠️ Project Status

This project is no longer under active development and is not currently maintained.

✨ [LIVE DEMO](https://kazvee.github.io/localbytes) ✨

## Description & Use Case
Local Bytes is a lightweight, responsive food discovery app. Search by dish or cuisine to discover recommended items across a variety of food spots, including restaurants, bakeries, grocery stores, and more!

## Screenshots

### Mobile View
![Local Bytes Mobile View](docs/Local_Bytes_Mobile.png)

### Desktop View
![Local Bytes Desktop View](docs/Local_Bytes_Desktop.png)

## Data Update Flow 
Food spot data is handled via a straightforward CSV-to-JSON workflow:
* **Shared CSV**: Users maintain a shared CSV file of visited places (restaurants, bakeries, grocery stores, etc.) with favourite items and location details. When new entries are added, the CSV is added to `src/data` for the next app refresh.
* **Conversion to JSON**: Before running or building the app, the CSV is converted to JSON using the built-in utility (`npm run convert`). This JSON is what the app reads at runtime.
* **Static site usage**: The app renders food spot data directly from the JSON. No database is required, keeping the site fast and mobile-friendly.

### Workflow Diagram 📑
```mermaid
flowchart TD
    style CSV fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style Converter fill:#fce7f3,stroke:#ec4899,stroke-width:2px
    style JSON fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style App fill:#d1fae5,stroke:#10b981,stroke-width:2px
    style Contributor1 fill:#fef2f2,stroke:#ef4444,stroke-width:2px
    style Contributor2 fill:#fef2f2,stroke:#ef4444,stroke-width:2px

    Contributor1["🐦 Contributor 1"] --> CSV["📂 Shared CSV File"]
    Contributor2["🐿️ Contributor 2"] --> CSV
    CSV --> Converter["✨ CSV-to-JSON Converter"]
    Converter --> JSON["📄 Generated JSON"]
    JSON --> App["💻 Local Bytes App"]
```

## Built With 👩‍💻
* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Bootstrap](https://getbootstrap.com/)
* [Fuse.js](https://fusejs.io/) for fuzzy search
* CSV-to-JSON conversion utility
* [Umami](https://umami.is/) (privacy-friendly analytics)  
* [Cloudflare Web Analytics](https://www.cloudflare.com/products/web-analytics/)  

## Thanks & Acknowledgements 🤗
* [Hamburger](https://icons8.com/icon/H9McyiOAZ5XF/hamburger), [GitHub](https://icons8.com/icon/I7n6n02hutM5/github), and [Search](https://icons8.com/icon/hO06R7BwJumP/search) icons by [Icons8](https://icons8.com)

## Installation 💻 
* Clone this repo to your local machine. 
* Install dependencies: `npm i` (or `npm install`). 
* Create file `localbytes.csv` inside `src/data`, using `example.localbytes.csv` as a reference to ensure correct headers and formatting. 

### Start the Development Server 
* Run `npm run dev`. 
* The development app will be served at [http://localhost:5173](http://localhost:5173/). 

### Build the Production-Ready Application 
* Run `npm run build`. 
* Static pages ready for deployment will be generated inside the dist folder. 

#### Start the Production Server 
* Run `npm run preview`. 
* The production app will be served at [http://localhost:4173](http://localhost:4173/).