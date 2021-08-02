---
layout: general_layout
title: Courses
tags: [main]
---

<hr class="my-2">
<h1>{{ site.organisation.keyword }} Courses</h1>

<table class="table">
<thead>
    <tr>
       <th>Name</th><th>Description</th>
    </tr> 
</thead>
<tbody>
</tbody>

{% for course in coursesapifull.courses %}
<tr>
<td><a href="/courses/{{ course.name | slug }}/">{{ course.name }}</a></td>
<td>{{ course.descrip}}</td>
</tr>
{% endfor %}

</table>



    


