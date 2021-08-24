const fs = require('fs');

module.exports = async function() {

    let rawData = fs.readFileSync(`${__dirname}/site.json`);
    let site = JSON.parse(rawData);
    

    return {
        footertext:[
            `We provide ${site.searchKeywords.join(" and ")} training`, 
            `Contact us for all your ${site.searchKeywords.join(" and ")} training`
        ]    
    }

}
