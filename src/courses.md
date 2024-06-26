---
layout: general_layout
title: Courses
description: Training Courses
tags: [main]
page:
    type: home
---


<hr class="my-2">
<<<<<<< HEAD
<h1>{{ site.searchKeywords[0] }} Courses</h1>
=======
<h1>{% for keyword in site.searchKeywords %} {{ keyword }} {% endfor %} Training Courses</h1>
>>>>>>> 73ae52c3737501bc0189ad99266d2613d7cb51de

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



    


