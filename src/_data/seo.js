const fs = require('fs');

module.exports = async function() {

    let rawData = fs.readFileSync(`${__dirname}/site.json`);
    let site = JSON.parse(rawData);
    

    return {
        footertext:[
            `We provide expert focused ${site.searchKeywords.join(" and ")} training. For the skills you need, view our courses and contact us.`
        ]    
    }

}
