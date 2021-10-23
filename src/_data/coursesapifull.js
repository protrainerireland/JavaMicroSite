const fetch = require("node-fetch");

const Cache = require("@11ty/eleventy-cache-assets");
const fs = require('fs');


//const site = JSON.parse(json);

module.exports = async function() {

  let rawData = fs.readFileSync(`${__dirname}/site.json`);
  let site = JSON.parse(rawData);

  //let url = `https://professional.ie/api/getCoursesForKeywordsFull.php?keywords[]=${site.searchKeywords.join("&keywords[]=")}`;
  let url = `http://professional.ie/api/getCoursesForKeywordsFull.php?keywords[]=${site.searchKeywords.join("&keywords[]=")}`;

  console.log(url);

  let json = await Cache(url, {
    duration: "1m", 
    type: "json"
  });


  distinctCourseList = json.flatMap(keyword => keyword.courses)
                           .filter((course, index, courses) => courses.findIndex(c=>c.id==course.id) == index);

  distinctMicrositeKeywordList = json.flatMap(keyword=> keyword.microsite_keywords)
                          .filter((mskeyword, index, list) => list.indexOf(mskeyword) == index)
                          .filter((mskeyword)=>mskeyword != "");


  console.log(distinctMicrositeKeywordList);

  
  url = `http://professional.ie/api/getLandingPageTextForKeywords.php?keywords[]=${distinctMicrositeKeywordList.join("&keywords[]=")}`;

  console.log(url);

  json = await Cache(url, {
    duration: "1m", 
    type: "json"
  });

  let msKeywordData = json.map(keyword=> {
    return {
      keyword: keyword.keyword, 
      paragraphs: keyword.paragraphs, 
      courses: distinctCourseList.filter(course=>course.searchWords.includes(keyword.keyword))
    }
  });


    //let savedSearches = site.searchLocations.flatMap(location=> msKeywordData.map(keyword => {
    let savedSearches = msKeywordData.flatMap(keyword=> {
      return site.searchLocations.map(location => {

        return {
          keyword: `${keyword.keyword} Training`, 
          location, 
          title: `${keyword.keyword} Training Courses ${location}`, 
          courses: keyword.courses, 
          paragraphs: keyword.paragraphs
        }
      });
    
  });

  /*
  console.log(savedSearches.flatMap(entry => {
    console.log(entry);
    return {
      location: entry.location, 
      ...entry.msKeywordData
    }
  }));
  */

  return {
    courses: distinctCourseList, 
    micrositeKeywords: json, 
    msKeywordData, 
    savedSearches
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