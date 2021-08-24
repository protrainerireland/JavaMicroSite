const fetch = require("node-fetch");

const Cache = require("@11ty/eleventy-cache-assets");
const fs = require('fs');


//const site = JSON.parse(json);

module.exports = async function() {

  let rawData = fs.readFileSync(`${__dirname}/site.json`);
  let site = JSON.parse(rawData);

  let url = `https://professional.ie/api/getCoursesForKeywordsFull.php?keywords[]=${site.searchKeywords.join("&keywords[]=")}`;

  console.log(url);

  let json = await Cache(url, {
    duration: "1m", 
    type: "json"
  });


    // map the results from the courses full api 
    // need to remove duplicates

  // the courses api returns an array

  let data = [
    {
      keyword:"java",
      title: "Java", 
      landingpagetext: "", 
      paragraphs: [], 
      courses:[
        {
          name: "Java Course 1", 
          id: 5001
        }, 
        {
          name: "Java Course 2", 
          id: 5002
        }
      
      ]
    }, 
    {
      keyword:"ejb", 
      title:"Ejb", 
      paragraphs: [], 
      courses:[
        {
          name: "EJB Course 1", 
          id: 6001
        }, 
        {
          name: "Java Course 1", 
          id: 5001
        }, 
        {
          name: "EJB Course 2", 
          id: 6002
        }
      ]
    }
  ];


  distinctCourseList = json.flatMap(keyword => keyword.courses)
                           .filter((course, index, courses) => courses.findIndex(c=>c.id==course.id) == index);

  
  return {
    courses: distinctCourseList
  };

  // GitHub API: https://developer.github.com/v3/repos/#get
  /*
  return fetch(`https://professional.ie/api/getCoursesFull.php?keywords=JavaScript`)
    .then(res => res.json()) // node-fetch option to transform to json
    .then(json => {

      console.log(json.courses.length);

      // prune the data to return only what we want
      return {
        courses: json.courses
      };
    });
  */
};