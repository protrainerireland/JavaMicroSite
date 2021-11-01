---
layout: landingpage_layout
pagination:
    data: coursesapifull.savedSearches  
    size: 1
    alias: search
permalink: "saved_searches/{{search.location | slug | removeInvalidChars }}/{{search.keyword | slug | removeInvalidChars}}/{{search.title | slug | removeInvalidChars}}.html"
page:
    type: landing
--- 
{{ keyword | json }}
