#! /usr/bin/env node

const yargs = require("yargs");
const HTMLParser = require('node-html-parser');

const usage = "\nUsage: Pass a webpage address to scrape for text elements to be transformed into ACF fields.";
const options = yargs  
      .usage(usage)  
      .option("u", {alias:"url", describe: "The URL of the page you want scraped.", type: "String", demandOption: true })                                                                                                    
      .help(true)  
      .argv;

async function process(){
    let page = await fetch(yargs.argv.u)
    .then(response => response.text())
        .then(html => {
            return html;
    })

    const root = HTMLParser.parse(page);

    let allEls = root.querySelectorAll("*");

    let textEls = [];

    for(let el of allEls){
        switch(el.tagName){
            case "H1":
            case "H2":
            case "H3":
            case "H4":
            case "H5":
            case "P":
                textEls.push(el);
                break;
        }
    }

    console.log(textEls)

    return "Done Processing";
}

process().then(value => console.log(value));