document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".toggle-button");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var content = this.nextElementSibling;
      var isExpanded = this.getAttribute("aria-expanded") === "true";

      content.style.display = isExpanded ? "none" : "block";
      this.setAttribute("aria-expanded", !isExpanded);
    });
  });
});
