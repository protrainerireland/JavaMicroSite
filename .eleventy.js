let branding = require('./src/_data/branding.json');
let fs = require('fs');
let { makeSection, slugify, asAccordion } = require('./src/_includes/makeSection');


module.exports = function(config) {

    /* config.addFilter("makeSection", function(content) {
        return `<div>
                    <h1>${content.title}</h1>
                    <p>${content.text}</p>
                </div>`;
    }); */

    config.addFilter("json", function(item){
        return JSON.stringify(item);
    });

    config.addFilter("makebold", function(item){
        return `<b>${item}</b>`;
    })

    // this filter is to fix the problem with the Azure and other MS courses where there is a : in the name
    config.addFilter("removeInvalidChars", function(filename) {
        return filename.replace(/:/ig, "-");
    });

    config.addFilter("slugify", slugify);
    
    config.addFilter("asAccordion", asAccordion);
    
    config.addPassthroughCopy({"./src/img/*.*": "img"});
    
    config.addPassthroughCopy({"./src/img/testimonials/*.*": "img/testimonials"});
    config.addPassthroughCopy({"./src/css/*.*": "css"});
    config.addPassthroughCopy({"./src/js/*.*": "js"});
    

    config.setTemplateFormats("html,njk,md,svg");

    config.addFilter("makeSection", makeSection);

    config.addFilter("convertLineBreaks", function(text) {
        return text.replace(/\r\n/g, "<br>");
    })

    return {
        templateFormats: ["html", "njk", "svg"], 
        dir: {
            input: './src', 
            output: './build', 
            layouts: '/_includes/layout'
        }
    };
};
    return {
        dir: {
            input:'./src', 
            output: './build'
        }
    };
