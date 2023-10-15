const { log } = console;

import { Render } from "../js/market-Render";
import { renderData } from "../js/market-renderData";

const app = new Render("app");
const API_LOCAL = "../js/beer.json";
const API_DATA = "https://api.sampleapis.com/beers/ale";
const API_DOLAR = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

app.fetchData(API_DATA, API_DOLAR, renderData);