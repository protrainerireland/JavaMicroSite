const fs = require('fs');

module.exports = {


    makeSection: function(section) {

        let rawData = fs.readFileSync(`${__dirname}/../_data/site.json`);
        let site = JSON.parse(rawData);


        let html;

        switch (section.type) {
            case 'text':
                html = `<section id="${section.id}" class="section">
                            <h1>${section.title}</h1>
                            <p>${section.content}</p>
                        </section>`;
                break;
            case 'placeholder':
                html = ``;
                break;
            case 'banner':
                html = `<section class="section banner">
                        <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                            <p class="promo-title">${ section.title }</p>
                            <p class="join-title">${ section.subtitle }</p>
                            </div>
                            <div class="col-md-6">
                                <img src="${ section.image }" alt="" class="img-fluid">
                            </div>
                        </div>
                        </div>
                        <!--- Background wave Hero ---->
                        <img src="${ section.background }" class="bottom-img" alt="">
                    </section>`;
                break;
            
            case "keywordtext":

                let defaultTemplate = `${site.searchKeywords[0]} is one of the most popular coding languages in the world. The job market for ${ site.searchKeywords[0] } developers is robust and consistent, making it a great programming language to learn. Our courses can give you the skills you need to work effectively with ${ site.searchKeywords[0] }.  Why attend one of our ${ site.searchKeywords[0] } courses? If you're interested working effectively with ${ site.searchKeywords[0] } to benefit your organisation and to get an edge over your competitors, or simply to learn a highly lucrative skill then you should consider our ${ site.searchKeywords[0] } training course.</p>`
                
                html = `<section id="${section.id}" class="section">
                    <div class="container">
                    <h3 class="title text-center">${ section.title }</h3>
                    <div class="row ${section.imagePosition=="left" ? "flex-row-reverse" :""}">
                        <div class="${section.image ? 'col-md-6' : 'col-md-12'} about">
                        <p class="about-title">${ section.content.title }</p>
                        <p>${ defaultTemplate }</p>
                        </div>`;
                    if (section.image) {
                        html += `<div class="col-md-6">
                                    <img src="${ section.image }" class="img-fluid" alt="">
                                </div>`;
                    }    

                html += `</div>
                    </div>
                </section>`;
                break;

            case "about":
                
                html = `<section id="${section.id}" class="section">
                    <div class="container">
                    <h3 class="title text-center">${ section.title }</h3>
                    <div class="row ${section.imagePosition=="left" ? "flex-row-reverse" :""}">
                        <div class="${section.image ? 'col-md-6' : 'col-md-12'} about">
                        <p class="about-title">${ section.content.title }</p>
                        <p>${ section.content.textFirst }</p>
                        <p>${ section.content.textSecond }</p>
                        <p>${ section.content.textThird }</p>
                        </div>`;
                    if (section.image) {
                        html += `<div class="col-md-6">
                                    <img src="${ section.image }" class="img-fluid" alt="">
                                </div>`;
                    }    

                html += `</div>
                    </div>
                </section>`;
                break;

            case "welcome":
                
                html = `<section id="${section.id}" class="section">
                    <div class="container">
                    <h3 class="title text-center">${ section.title }</h3>
                    <div class="row ${section.imagePosition=="left" ? "flex-row-reverse" :""}">
                        <div class="${section.image ? 'col-md-6' : 'col-md-12'} about">
                        <p class="about-title">${ section.content.title }</p>
                        <p>${ section.content.text }</p>
                        </div>`;
                    if (section.image) {
                        html += `<div class="col-md-6">
                                    <img src="${ section.image }" class="img-fluid" alt="">
                                </div>`;
                    }    

                html += `</div>
                    </div>
                </section>`;
                break;

            case "listwithimage":
                //let list = "<ul>";
                //section.content.list.map(item=>list += `<li>${item}</li>`);
                //list += "</ul>";
                let list = `<ul>${section.content.list.map(item=>`<li>${item}</li>`).join("")}</ul>`;

                html = `<section id="${section.id}" class="section">
                    <div class="container">
                    <h3 class="title text-center">${ section.title }</h3>
                    <div class="row">
                        <div class="col-md-6 about">
                        <p class="about-title">${ section.content.title }</p>
                        ${list}
                        </div>
                        <div class="col-md-6">
                            <img src="${ section.content.image }" class="img-fluid" alt="">
                        </div>
                    </div>
                    </div>
                </section>`;
                break;
            case 'quotes':
                let quotes = section.content.quotes.map(quote => `<div class="col-md-5 testimonials">
                    <p class="feedback">"${quote.text}"</p>
                    <img src="${quote.image}"  alt="">
                    <p class="user-details"><b>${quote.name}</b></p>
                    </div>`).join("");

                html = `<section id="${ section.id }" class="section">
                            <div class="container">
                            <h3 class="title text-center">${ section.text }</h3>
                            <div class="row offset-1">
                                ${quotes}
                            </div>
                            </div>
                        </section>`;
                break;

            default: 
                html = `<section id="${section.id}" class="section"><code>${JSON.stringify(section)}</code></section>`;
                break;
        }
        return html;
    }
}
