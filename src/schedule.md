---
layout: schedule_layout
title: Schedule
tags: [ main ]
page:
    type: schedule
---


<hr class="my-2">
<h1>{{ site.searchKeywords | join }} Course Schedule</h1>

<table class="table">
<thead>
    <tr>
       <th>Name</th><th>Description</th><th>Location</th>
    </tr> 
</thead>
<tbody>
</tbody>
</tbody>
</table>





{% for course in coursesapifull.courses %}
<div>
<h2>{{ course.name }}</h2>
<a href="/courses/{{ course.name | slug }}/">Course Details</a>

{% for instance in course.schedule %}
{{ instance.date }} - 
{{ instance.location }}
{% endfor %}

{% endfor %}
  

</div>
