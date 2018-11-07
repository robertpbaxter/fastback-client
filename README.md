# Fastback Mobile Feedback (front end)

This repo represents the front end React application created by Robert Baxter of Eleven Fifty Academy. This half of a full stack project was submitted on week 8 in completion of the Blue Badge phase of Eleven Fifty's JavaScript boot camp.

View the deployed application (in its current state) at <a href="https://fastback-mobile-feedback.herokuapp.com">https://fastback-mobile-feedback.herokuapp.com</a>

Back-end repository: <a href="https://github.com/robertpbaxter/fastback-server">https://github.com/robertpbaxter/fastback-server</a>

# Features:

- Single page app format with a central switch statement that renders one of four possible interfaces:

  - Public: A login/signup interface
  - Student: A list of assignments (by instructor) with inputs for submitting responses and a grade value if (assigned)
  - Instructions: A table of assignments (create, edit, delete) with modal for fetching student submissions and assigning grades
  - Admins: A list of all users for assigning upgrading user credentials (for assigning new instructors) or deleting users

- Authentication required for all queries to the back end (JWT credentials circulated throughout components by way of Context)

- Reusable component for substituting foreign keys with data (e.g. showing first and last names associated with assignments or submissions)

* Sample student credentials:

  - email: `student@student.com`
  - password: `student`

* Sample instructor credentials:

  - email: `instructor@instructor.com`
  - password: `instructor`

* Sample admin credentials:

  - by request only
