let branding = require('./src/_data/branding.json');
let fs = require('fs');
let { makeSection, slugify } = require('./src/_includes/makeSection');


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

    config.addFilter("asAccordion", function(searches) {

        //console.log(searches);

        let topics = searches.reduce((result, current, index) => {

            let keyword = slugify(current.keyword);
            if (result[keyword]) {
                result[keyword].push(current);
            } else {
                result[keyword] = [current];
            }
            return result;
        }, {});

        //console.log(topics);
        //console.log(Object.keys(topics));

        let cards = Object.keys(topics).map((topicName, index) => {
            //console.log(topicName);
            let topic = topics[topicName];
            //console.log(topic);

            let courses = topic.map(course=>{
                return `<div><a href="/saved_searches/${course.location}/${slugify(course.keyword)}/${slugify(course.title)}.html">${course.title}</a></div>`;
            });
            let card = `<div class="card">
                            <div class="card-header" id="headingOne">
                                <h2 class="mb-0">
                                    <button class="btn btn-block text-left" type="button" data-toggle="collapse" 
                                        data-target="#${slugify(topicName, true)}" aria-expanded="${index==0}" aria-controls="collapseOne">
                                    ${ topic[0].keyword }
                                    </button>
                                </h2>
                            </div>    
                            <div id="${slugify(topicName, true)}" class="collapse ${index == 0 ? 'show' :''}" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body">
                                    ${courses.join("")}
                                </div>
                            </div>
                        </div>`;
            return card;
        });

        /*
        let cards = `<div class="card">
                        <div class="card-header" id="headingOne">
                            <h2 class="mb-0">
                            <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Collapsible Group Item #1
                            </button>
                            </h2>
                        </div>                
                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                            Some placeholder content for the first accordion panel.
                            </div>
                        </div>
                    </div>`;
        */

        return `<div class="accordion" id="accordionExample">
                    ${cards.join("")}
                </div>`;
            
    });

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
