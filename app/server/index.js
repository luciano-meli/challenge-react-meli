require("@babel/register");
require("@babel/polyfill");
require.extensions[".scss"] = () => {};
const axios = require("axios");
const path = require("path");
const { getItem, getItemListening } = require("./services/item-services");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
var express = require("express");
var server = express();
const template = require("./template");
const Home = require("../shared/components/pages/home");
const Search = require("../shared/components/pages/search");
const Vip = require("../shared/components/pages/vip");
const { default: Axios } = require("axios");
const { response } = require("express");
const favicon = require("serve-favicon");

server.use("/", express.static(path.join(__dirname, "../../build")));
server.use("/static", express.static(path.join(__dirname, "../static")));
server.use(favicon(path.join(__dirname, "../static", "favicon.ico")));

server.get("/", function (req, res) {
  res.send(
    template(
      "home",
      ReactDOMServer.renderToString(React.createElement(Home, {}, null))
    )
  );
});

server.get("/api/items", (req, res) => {
  const query = req.query.q;
  getItemListening(query)
    .then((response) => res.json(response))
    .catch((err) => res.sendStatus(500, err));
});

server.get("/api/items/:id", (req, res) => {
  const id = req.params.id;
  getItem(id)
    .then((response) => res.json(response))
    .catch((err) => res.sendStatus(500, err));
});

server.get("/items", function (req, res) {
  const query = req.query.search;
  const props = {};
  axios
    .get("http://localhost:3000/api/items/", { params: { q: query } })
    .then((response) => {
      props.items = response.data.items;
      props.breadcrumb = response.data.breadcrumb;
      res.send(
        template(
          "search",
          ReactDOMServer.renderToString(
            React.createElement(Search, { ...props }, null)
          )
        )
      );
    })
    .catch((e) => console.error(e));
});

server.get("/items/:id", function (req, res) {
  const itemId = req.params.id;
  const props = {};
  axios
    .get(`http://localhost:3000/api/items/${itemId}`)
    .then((response) => {
      props.itemData = response.data;
      res.send(
        template(
          "vip",
          ReactDOMServer.renderToString(
            React.createElement(Vip, { ...props }, null)
          )
        )
      );
    })
    .catch((e) => console.error(e));
});

server.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
