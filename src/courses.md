---
layout: general_layout
title: Courses
tags: [main]
---

<table class="table">
<thead>
    <tr>
       <th>ID</th><th>Name</th><th>Description</th>
    </tr> 
</thead>
<tbody>
</tbody>

{% for course in coursesapifull.courses %}
<tr>
<td><a href="/courses/{{ course.name | slug }}/">{{ course.id }}</a></td>
<td>{{ course.name }}</td>
<td>{{ course.descrip}}</td>
</tr>
{% endfor %}

</table>



    


