const arr = document.querySelectorAll("#main-accord");
let userAcceptsStatistics = false;
let userAcceptsMarketing = false;

arr.forEach((accord, index) => {
  const arrow = accord.querySelector(`.ck-arrow-${index + 1}`);
  accord.addEventListener("click", () => {
    arrow.classList.toggle("ck-arrow-icon");
  });
});

function hasAcceptedCookies() {
  return document.cookie.indexOf("cookieConsent=true") !== -1;
}

// Check if user has already accepted cookies
if (hasAcceptedCookies()) {
  // Call GTM to handle accepted cookies
  document.getElementById("cookieBanner").style.display = "none";
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "cookiesAccepted",
  });
}

// switches for marketing and statistics

document
  .getElementById("userAcceptsStatistics")
  .addEventListener("change", function (e) {
    const { checked } = e.target;
    userAcceptsStatistics = checked;
  });
document
  .getElementById("userAcceptsMarketing")
  .addEventListener("change", function (e) {
    const { checked } = e.target;
    userAcceptsMarketing = checked;
  });

// Function to set a cookie with a specific name, value, and expiration time in days
function setCookie(cname, cvalue) {
  var now = new Date();
  var time = now.getTime();
  var expireTime = time + 1000 * 36000;
  now.setTime(expireTime);
  document.cookie =
    cname + "=" + cvalue + ";expires=" + now.toUTCString() + "; path=/";
}

// Function to check if the user has rejected the cookies

document
  .getElementById("rejectCustomizationsBtn")
  .addEventListener("click", function () {
    setCookie("cookieStrictlyNecessary", "true"); // Strictly necessary cookie

    document.getElementById("cookieBanner").style.display = "none";

    // Set main consent cookie after customizations are accepted
    setCookie("cookieConsent", "true"); // Cookie expires in 1 year

    // Call GTM to handle accepted cookies
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "cookiesAccepted",
    });
  });

document
  .getElementById("acceptCustomizationsBtn")
  .addEventListener("click", function () {
    if (userAcceptsStatistics) {
      setCookie("cookieStatistics", "true"); // Cookie expires in 1 year
    }
    if (userAcceptsMarketing) {
      setCookie("cookieMarketing", "true"); // Cookie expires in 1 year
    }
    setCookie("cookieStrictlyNecessary", "true"); // Strictly necessary cookie
    document.getElementById("cookieBanner").style.display = "none";

    // Set main consent cookie after customizations are accepted
    setCookie("cookieConsent", "true"); // Cookie expires in 1 year

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
  setCookie("cookieStrictlyNecessary", "true"); // Strictly necessary cookie
  setCookie("cookieStatistics", "true"); // Cookie expires in 1 year
  setCookie("cookieMarketing", "true"); // Cookie expires in 1 year

  // Set main consent cookie after accepting all cookies
  setCookie("cookieConsent", "true"); // Cookie expires in 1 year

  // Call GTM to handle accepted cookies
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "cookiesAccepted",
  });
});
