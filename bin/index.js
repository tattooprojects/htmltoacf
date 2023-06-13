#! /usr/bin/env node

const yargs = require("yargs");
const HTMLParser = require('node-html-parser');
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet('1234567890abcdef', 10)

const usage = "\nUsage: Pass a webpage address to scrape for text elements to be transformed into ACF fields.";
const options = yargs  
      .usage(usage)  
      .option("u", {alias:"url", describe: "The URL of the page you want scraped.", type: "string", demandOption: true })
      .option("p", {alias:"page", describe: "The name of the page you're importing.", type: "string", demandOption: true })
      .option("i", {alias:"htmlID", describe: "The ID of the particular parent element you want to scrape. If not provided, it will scrape the entire document.", type: "string", demandOption: false})                                      
      .help(true)  
      .argv;

async function process(){
    let page = await fetch(yargs.argv.u)
    .then(response => response.text())
        .then(html => {
            return html;
    })

    const root = HTMLParser.parse(page);

    let allEls;

    if(yargs.argv.i != undefined){
        let parentEl = root.getElementById(`${yargs.argv.i}`)
        allEls = parentEl.querySelectorAll("*");
    }
    else {
        allEls = root.querySelectorAll("*");
    }

    let importBlock = {
        "key": "group_6458fccb6b51d",
        "title": yargs.argv.p,
        "fields": [],
        "menu_order": 0,
        "position": "normal",
        "style": "default",
        "label_placement": "top",
        "instruction_placement": "label",
        "hide_on_screen": "",
        "active": true,
        "description": "",
        "show_in_rest": 0,
        "show_in_graphql": 1,
        "graphql_field_name": yargs.argv.p.trim(),
        "map_graphql_types_from_location_rules": 0,
        "graphql_types": ""
    };

    let headerIterator = 1;
    let paragraphIterator = 1;

    let field;

    for(let el of allEls){
        switch(el.tagName){
            case "H1":
            case "H2":
            case "H3":
            case "H4":
            case "H5":
                field = {
                    "key": `field_${nanoid(13)}`,
                    "label": `Header ${headerIterator}`,
                    "name": `header_${headerIterator}`,
                    "aria-label": "",
                    "type": "text",
                    "instructions": "",
                    "required": 0,
                    "conditional_logic": 0,
                    "wrapper": {
                        "width": "",
                        "class": "",
                        "id": ""
                    },
                    "show_in_graphql": 1,
                    "default_value": el.text,
                    "maxlength": "",
                    "placeholder": "",
                    "prepend": "",
                    "append": ""
                }
                importBlock.fields.push(field);
                headerIterator++;
                break;
            case "P":
                field = {
                    "key": `field_${nanoid(13)}`,
                    "label": `Paragraph ${paragraphIterator}`,
                    "name": `paragraph_${paragraphIterator}`,
                    "aria-label": "",
                    "type": "textarea",
                    "instructions": "",
                    "required": 0,
                    "conditional_logic": 0,
                    "wrapper": {
                        "width": "",
                        "class": "",
                        "id": ""
                    },
                    "show_in_graphql": 1,
                    "default_value": el.text,
                    "maxlength": "",
                    "placeholder": "",
                    "prepend": "",
                    "append": ""
                }
                importBlock.fields.push(field);
                paragraphIterator++;
                break;
        }
    }

    return JSON.stringify(importBlock);
}

process().then(value => console.log(value));
