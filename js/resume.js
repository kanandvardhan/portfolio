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

fetch("https://kanandvardhan.github.io/data/projects.json")
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
                      .map((tech) => {
                        iconName = tech
                          .replace("devicon-", "")
                          .replace("colored", "")
                          .replace("-plain", "")
                          .replace("-wordmark", "")
                          .replace("-original", "")
                          .trim();

                        capitalizeIconName =
                          iconName.charAt(0).toUpperCase() + iconName.slice(1);

                        return `<i  data-toggle="tooltip"
                          data-placement="bottom"
                          title=${capitalizeIconName} class="devicon-${tech.toLowerCase()} colored">&nbsp;</i>`;
                      })
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

// EMAIL CONTACT

$("#myForm").on("submit", function (event) {
  event.preventDefault(); // prevent reload

  var name = $("#name");
  var email = $("#email");
  var subject = $("#subject");
  var message = $("#message");
  var messageError = $("#messageError");
  var submitButton = $(".btnContact");

  // Change button text to "Sending"
  submitButton.val("Sending...");

  // Perform form validation
  var isValid = validateForm();

  if (!isValid) {
    // Reset button text on validation failure
    submitButton.val("Send Message");
    return;
  }

  var formData = new FormData(this);
  formData.append("service_id", "service_06275ve");
  formData.append("template_id", "template_gktw59p");
  formData.append("user_id", "tzMIRTToAGvXUNfY0");

  $.ajax("https://api.emailjs.com/api/v1.0/email/send-form", {
    type: "POST",
    data: formData,
    contentType: false, // auto-detection
    processData: false, // no need to parse formData to string
  })
    .done(function () {
      name.val("");
      email.val("");
      subject.val("");
      message.val("");
      // Reset button text on successful submission
      submitButton.val("Message Sent!").css("background-color", "#7adc35");
      // alert("Your message is sent!");
    })
    .fail(function (error) {
      messageError.text("Oops... Something went wrong, please try again");
      // Reset button text on failure
      submitButton.val("Send Message");
    });
});

function validateForm() {
  var name = $("#name").val();
  var email = $("#email").val();
  var subject = $("#subject").val();
  var message = $("#message").val();

  var nameError = $("#nameError");
  var emailError = $("#emailError");
  var subjectError = $("#subjectError");
  var messageError = $("#messageError");

  // Reset error messages
  nameError.text("");
  emailError.text("");
  subjectError.text("");
  messageError.text("");

  var isValid = true;
  var errorMessages = [];

  // Basic form validation
  if (name.trim() === "") {
    nameError.text("Name is required");
    errorMessages.push("Name is required");
    isValid = false;
  }

  if (email.trim() === "") {
    emailError.text("Email is required");
    errorMessages.push("Email is required");
    isValid = false;
  } else {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.text("Invalid email");
      errorMessages.push("Invalid email");
      isValid = false;
    }
  }

  if (subject.trim() === "") {
    subjectError.text("Subject is required");
    errorMessages.push("Subject is required");
    isValid = false;
  }

  if (message.trim() === "") {
    messageError.text("Message is required");
    errorMessages.push("Message is required");
    isValid = false;
  }

  // Display all error messages together
  if (!isValid) {
    // alert("Please fix the following errors:\n" + errorMessages.join("\n"));
  }

  return isValid; // Form is valid
}

// Add attributes to devicons
$(function () {
  $("i[class^='devicon-']").each(function () {
    var iconName = $(this)
      .attr("class")
      .replace("devicon-", "")
      .replace("colored", "")
      .replace("-plain", "")
      .replace("-wordmark", "")
      .replace("-original", "")
      .trim();

    var capitalizeIconName =
      iconName.charAt(0).toUpperCase() + iconName.slice(1);
    $(this).attr({
      "data-toggle": "tooltip",
      "data-placement": "bottom",
      title: capitalizeIconName,
    });
  });

  // Initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();
});

window.addEventListener("scroll", handleScroll);

function handleScroll() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;

  var progressBar = document.getElementById("progressBar");

  // Check screen width and add/remove class accordingly
  if (window.innerWidth < 991) {
    progressBar.classList.add("stick-to-left");
    progressBar.style.width = "";
    progressBar.style.height = scrolled + "%";
  } else {
    progressBar.classList.remove("stick-to-left");
    progressBar.style.height = "";
    progressBar.style.width = scrolled + "%";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", function () {
    scrollToTopBtn.classList.toggle("active", window.scrollY > 400);
  });

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
