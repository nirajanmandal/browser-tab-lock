document.addEventListener("DOMContentLoaded", () => {
  // Hide the entire page content initially
  // document.body.style.display = "none";
  document.body.style.filter = "blur(1.5rem)";
  document.body.style.pointerEvents = "none";
  document.body.style.cursor = "none";

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "showContent") {
      // Show the page content when the correct password is received
      document.body.style.display = "block";
      document.body.style.filter = "";
      document.body.style.cursor = "";
      document.body.style.pointerEvents = "";
    } else if (message.action === "lockTab") {
      // document.body.style.display = "none";
      document.body.style.filter = "blur(1.5rem)";
      document.body.style.pointerEvents = "none";
      document.body.style.cursor = "none";
      // Additional logic to reset password status or state
    }
  });
});
