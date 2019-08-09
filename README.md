# UTSC Biology Curriculum Map

This project is to rewrite the current [UTSC Biology Curriculum Map](https://www.utsc.utoronto.ca/biosci/sites/utsc.utoronto.ca.biosci/files/docs/bio_curr_map.html) from Flash to HTML5

## Technologies
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for [Node.js](https://nodejs.org/en/)
* [Cytoscape.js](http://js.cytoscape.org/) - An open-source graph theory (a.k.a. network) library written in JS
* [EJS](https://ejs.co/) - Embedded JavaScript templating

## Development Setup
1. Install [Node.js](https://nodejs.org/en/)
2. Clone this repository
3. Install program dependencies.
```
$ cd html5browser
$ npm install
```
4. (Optional) Create _.env_ file. Currently  _.env_ file is optional, developer can use it to specify the following values:
```
PORT={the port that the web server will run behind, default is 3000}
WEB_NAME={the name that will be shown in the browser tab of this websit, default is "UTSC Biology Curriculum Map"}
HOME_HEADER={the header line that will be shown in the home page, default is "UTSC Department of Biological Sciences"}
```

## Run Application Locally
After setting up the environment as above. Run `npm start` inside repository will start the web sever behind PORT (default is 3000). User then can access the website with devices connected to the local internet: `http://[host local ip address]:[PORT]`
