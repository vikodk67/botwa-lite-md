const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const express = require('express')
const app = express()
const port = 3000
const wikiped = async (text) => {
axios.get('https://id.wikipedia.org/wiki/'+ text)
    .then((response) => {
        let $ = cheerio.load(response.data);
        let articles = [];
        
        $('#mw-content-text').each((index, element) => {
        var result = $(element).find('div.mw-parser-output p:nth-child(6)').text().trim()
            articles.push({
            result
            });
        });
        console.log(articles)
        // file tempnya
        fs.writeFile('./data/temp.json', JSON.stringify(articles), (error) => {
            if (error) throw error;
        })
    })
    .catch((error) => {
        console.log(error);
    });
}
// BY VIKO VERSION 1.0.0 WIKI API
module.exports = wikiped