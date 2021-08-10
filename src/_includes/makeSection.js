module.exports = {
    makeSection: function(section) {

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
            case "grid":
                html = `<section id="${section.id}" class="section">
                            <div class="container text-center">
                            <h3 class="title text-center">${ section.title }</h3>
                            <div class="row text-center">
                            `;
                section.items.forEach(item=>{
                    html += `<div class="col-md-4 services">
                                <img src="${ item.image }" class="service-img"   alt="">
                                <h4>${ item.title }</h4>
                                <p>${ item.text }</p>
                            </div>`;

                });

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