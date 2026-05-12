(function () {
  var tabs = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".panel");
  var mark = document.querySelector(".mark");
  var yearEl = document.getElementById("year");

  function showTab(id) {
    panels.forEach(function (panel) {
      var match = panel.id === "panel-" + id;
      panel.classList.toggle("is-visible", match);
      if (match) {
        panel.removeAttribute("hidden");
        panel.focus({ preventScroll: true });
      } else {
        panel.setAttribute("hidden", "");
      }
    });
    tabs.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-tab") === id);
    });
    history.replaceState(null, "", "#" + id);
  }

  tabs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      showTab(btn.getAttribute("data-tab"));
    });
  });

  document.querySelectorAll("[data-tab]").forEach(function (el) {
    if (el.classList.contains("tab")) return;
    el.addEventListener("click", function (e) {
      e.preventDefault();
      showTab(el.getAttribute("data-tab"));
    });
  });

  mark.addEventListener("click", function (e) {
    e.preventDefault();
    showTab("home");
  });

  var hash = (location.hash || "").replace("#", "").trim();
  var valid = ["home", "company", "portfolio", "contact"];
  showTab(valid.indexOf(hash) !== -1 ? hash : "home");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var name = fd.get("name") || "";
      var email = fd.get("email") || "";
      var subject = fd.get("subject") || "";
      var body = fd.get("body") || "";
      var action = form.getAttribute("action") || "mailto:hello@jasho.example";
      var q =
        "subject=" +
        encodeURIComponent(String(subject)) +
        "&body=" +
        encodeURIComponent(
          "お名前: " + name + "\nメール: " + email + "\n\n" + String(body)
        );
      window.location.href = action + "?" + q;
    });
  }
})();
