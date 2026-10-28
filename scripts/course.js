// Replace with the official "Course List Array" from the assignment if it differs.
// Set completed: true for the courses YOU have finished.
const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "Introduces programming concepts and problem solving using Python.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "Introduces HTML and CSS to build and publish simple web pages.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "Teaches how to write and test functions, and how to work with data structures.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "Introduces object-oriented programming with classes.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "Adds JavaScript to create dynamic, responsive web pages.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Web Frontend Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "Builds advanced front-end skills: APIs, performance and accessibility.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

const list = document.querySelector("#course-list");
const creditsOutput = document.querySelector("#credits");
const filterButtons = document.querySelectorAll(".filters button");

function renderCourses(items) {
  list.replaceChildren();

  items.forEach((course) => {
    const li = document.createElement("li");
    li.textContent = `${course.subject} ${course.number}`;
    li.title = course.title;

    if (course.completed) {
      li.classList.add("completed");
      li.textContent = `✓ ${course.subject} ${course.number}`;
      const hidden = document.createElement("span");
      hidden.className = "sr-only";
      hidden.textContent = " (completed)";
      li.append(hidden);
    }

    list.append(li);
  });

  const totalCredits = items.reduce((sum, course) => sum + course.credits, 0);
  creditsOutput.textContent = `The total credits for the courses listed above is ${totalCredits}`;
}

function filterCourses(filter) {
  const items =
    filter === "all"
      ? courses
      : courses.filter((course) => course.subject === filter);
  renderCourses(items);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((b) =>
      b.setAttribute("aria-pressed", String(b === button)),
    );
    filterCourses(button.dataset.filter);
  });
});

filterCourses("all");
