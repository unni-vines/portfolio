
document.addEventListener("DOMContentLoaded", function () {

  const links = document.querySelectorAll("a");

  links.forEach(function (link) {

    link.addEventListener("click", function (e) {

      const url = this.getAttribute("href");

      // Ignore empty links
      if (!url) return;

      // Ignore external actions
      if (
        url.startsWith("#") ||
        url.startsWith("mailto:") ||
        url.startsWith("tel:") ||
        url.startsWith("javascript:") ||
        this.target === "_blank" ||
        this.hasAttribute("download")
      ) {
        return;
      }

      // Ignore Ctrl, Shift and middle-click
      if (
        e.ctrlKey ||
        e.shiftKey ||
        e.metaKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }

      const destination = new URL(
        url,
        window.location.href
      );

      // Ignore external websites
      if (destination.origin !== window.location.origin) {
        return;
      }

      // Ignore same-page navigation
      if (
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search
      ) {
        return;
      }

      e.preventDefault();

      // Start exit animation
      document.body.classList.add("page-leaving");

      // Navigate after animation
      setTimeout(function () {
        window.location.href = destination.href;
      }, 450);

    });

  });

});
