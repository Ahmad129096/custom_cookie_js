const arr = document.querySelectorAll("#main-accord");

arr.forEach((accord, index) => {
  const arrow = accord.querySelector(`.arrow-${index + 1}`);
  accord.addEventListener("click", () => {
    arrow.classList.toggle("arrow-icon");
  });
});

// Function to set a cookie with a specific name, value, and expiration time in days
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to check if the user has accepted cookies
function hasAcceptedCookies() {
  return document.cookie.indexOf("cookieConsent=true") !== -1;
}

document
  .getElementById("rejectCustomizationsBtn")
  .addEventListener("click", function () {
    setCookie("cookieStrictlyNecessary", "true", 365); // Strictly necessary cookie

    // Close the popup
    // Hide popup logic here

    // Set main consent cookie after customizations are accepted
    setCookie("cookieConsent", "true", 365); // Cookie expires in 1 year

    // Call GTM to handle accepted cookies
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "cookiesAccepted",
    });
  });

document
  .getElementById("acceptCustomizationsBtn")
  .addEventListener("click", function () {
    console.log("here", userAcceptsStatistics, userAcceptsMarketing);
    if (userAcceptsStatistics) {
      setCookie("cookieStatistics", "true", 365); // Cookie expires in 1 year
    }
    if (userAcceptsMarketing) {
      setCookie("cookieMarketing", "true", 365); // Cookie expires in 1 year
    }
    setCookie("cookieStrictlyNecessary", "true", 365); // Strictly necessary cookie

    // Close the popup
    // Hide popup logic here

    // Set main consent cookie after customizations are accepted
    setCookie("cookieConsent", "true", 365); // Cookie expires in 1 year

    // Call GTM to handle accepted cookies
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "cookiesAccepted",
    });
  });
// });

// Event listener for Accept All button click
document.getElementById("acceptAllBtn").addEventListener("click", function () {
  document.getElementById("cookieBanner").style.display = "none";
  setCookie("cookieStrictlyNecessary", "true", 365); // Strictly necessary cookie
  setCookie("cookieStatistics", "true", 365); // Cookie expires in 1 year
  setCookie("cookieMarketing", "true", 365); // Cookie expires in 1 year

  // Set main consent cookie after accepting all cookies
  setCookie("cookieConsent", "true", 365); // Cookie expires in 1 year

  // Call GTM to handle accepted cookies
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "cookiesAccepted",
  });
});

// Check if user has already accepted cookies
if (hasAcceptedCookies()) {
  // Call GTM to handle accepted cookies
  document.getElementById("cookieBanner").style.display = "none";
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "cookiesAccepted",
  });
} else {
  // Show cookie consent banner
  //   document.getElementById("cookieBanner").style.display = "block";
}
