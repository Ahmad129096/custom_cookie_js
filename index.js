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
  return document.cookie.indexOf("cookie_consent=true") !== -1;
}

// Check if user has already accepted cookies
if (hasAcceptedCookies()) {
  // Call GTM to handle accepted cookies
  document.getElementById("cookieBanner").style.display = "none";
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "consent_update" });
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
    setCookie("ad_storage", "denied");
    setCookie("security_storage", "denied");
    setCookie("analytics_storage", "denied");
    setCookie("functionality_storage", "denied");
    setCookie("personalization_storage", "denied");
    setCookie("cookieStrictlyNecessary", "granted");

    document.getElementById("cookieBanner").style.display = "none";

    // Set main consent cookie after customizations are accepted
    setCookie("cookie_consent", "true");

    // Call GTM to handle accepted cookies
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "consent_update" });
  });

document
  .getElementById("acceptCustomizationsBtn")
  .addEventListener("click", function () {
    if (userAcceptsStatistics && userAcceptsMarketing) {
      window.dataLayer.push({
        event: "virtualPageGA4",
        pagePath: "{{pagePath}}",
        pageTitle: "{{pageTitle}}",
      });
    }

    // statistic cookies
    if (userAcceptsStatistics) setCookie("analytics_storage", "granted");
    else setCookie("analytics_storage", "denied");

    // marketing cookies
    if (userAcceptsMarketing) setCookie("ad_storage", "granted");
    else setCookie("ad_storage", "denied");

    setCookie("cookieStrictlyNecessary", "granted"); // Strictly necessary cookie

    document.getElementById("cookieBanner").style.display = "none";

    // Set main consent cookie after customizations are accepted
    setCookie("cookie_consent", "true");
    setCookie("functionality_storage", "denied");
    setCookie("personalization_storage", "denied");
    setCookie("security_storage", "denied");

    // Call GTM to handle accepted cookies
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "consent_update" });
  });
// });

// Event listener for Accept All button click
document.getElementById("acceptAllBtn").addEventListener("click", function () {
  document.getElementById("cookieBanner").style.display = "none";
  setCookie("ad_storage", "granted");
  setCookie("security_storage", "denied");
  setCookie("analytics_storage", "granted");
  setCookie("functionality_storage", "denied");
  setCookie("personalization_storage", "denied");
  setCookie("cookieStrictlyNecessary", "granted"); // Strictly necessary cookie

  // Set main consent cookie after accepting all cookies
  setCookie("cookie_consent", "true");

  // Call GTM to handle accepted cookies
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "consent_update" });
});
