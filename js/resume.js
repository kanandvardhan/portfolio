(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#sideNav",
  });
})(jQuery); // End of use strict

fetch("../data/projects.json")
  .then((response) => response.json())
  .then((projectsData) => {
    // Function to create project HTML
    function createProjectHTML(project) {
      return `
        <div class="col-12 col-sm-6 col-lg-4 resume-item d-flex flex-column flex-md-row mb-5">
           <div class="resume-content mr-auto">
              <a href="${project.link}" target="_blank" class="project-open">
                 <div class="position-relative">
                    <img src="${
                      project.image
                    }" class="img-thumbnail img-fluid card-img-top" alt="${
        project.name
      }" />
                    <div class="img-overlay">
                       <p class="text-center">Open</p>
                    </div>
                 </div>
                 <h3 class="mb-0">${project.name}</h3>
                 <div class="subheading mb-3">
                    ${project.technologies
                      .map(
                        (tech) =>
                          `<i class="devicon-${tech.toLowerCase()} colored">&nbsp;</i>`
                      )
                      .join("")}
                 </div>
              </a>
              <p>${project.description}</p>
           </div>
        </div>
     `;
    }

    // Render projects
    const projectsContainer = document.querySelector(".projects-row");
    projectsData.forEach((project) => {
      projectsContainer.innerHTML += createProjectHTML(project);
    });
  })
  .catch((error) => console.error("Error fetching projects data:", error));
