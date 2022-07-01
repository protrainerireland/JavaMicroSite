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

  distinctMicrositeKeywordList = distinctMicrositeKeywordList.reduce((result, item) => {
      // do a case-insensitive compare to 
      // see if item is alreay in the result array
      if (result.findIndex(resultItem => {
          return resultItem.toLowerCase() == item.toLowerCase();
      }) == -1) {
          result.push(item);
      }
      return result;
  }, []);



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

  //test
  
  let index = msKeywordData.findIndex(keyword => keyword.keyword == site.searchKeywords);

  let primaryKeyword = msKeywordData[index];

  msKeywordData.splice(index, 1);

  msKeywordData.unshift(primaryKeyword);
  
  
    
  


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


  return {
    courses: distinctCourseList, 
    micrositeKeywords: json, 
    msKeywordData, 
    savedSearches
  };
};