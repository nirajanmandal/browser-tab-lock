document.addEventListener("DOMContentLoaded", () => {
  const openTabButton = document.getElementById("openTabButton");
  const passwordInput = document.getElementById("passwordInput");
  const statusMessage = document.getElementById("statusMessage");
  const lockTabButton = document.getElementById("lockTabButton");

  const passwordLink = document.getElementById("passwordLink");
  const passwordFields = document.getElementById("passwordFields");
  const newPasswordInput = document.getElementById("newPasswordInput");
  const confirmPasswordInput = document.getElementById("confirmPasswordInput");
  const setPasswordButton = document.getElementById("setPasswordButton");

  passwordLink.addEventListener("click", (event) => {
    event.preventDefault();
    passwordFields.style.display = "block";
  });

  setPasswordButton.addEventListener("click", () => {
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    console.log(newPassword);
    if (newPassword === confirmPassword) {
      console.log(confirmPassword);
      chrome.storage.local.set({ password: newPassword }, () => {
        passwordFields.style.display = "none";
        statusMessage.textContent = "Password saved.";
      });
    } else {
      statusMessage.textContent = "Password mismatched.";
    }
  });

  openTabButton.addEventListener("click", () => {
    const enteredPassword = passwordInput.value;
    chrome.tabs.query({ pinned: true, active: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        const tabId = tabs[0].id;
        chrome.runtime.sendMessage(
          {
            action: "validatePassword",
            tabId: tabId,
            password: enteredPassword,
          },
          (response) => {
            if (response.valid) {
              chrome.runtime.sendMessage({
                action: "openTab",
                tabId: tabId,
                url: "https://discord.com",
                password: enteredPassword,
              });
              window.close(); // Close the popup after opening the tab
            } else {
              statusMessage.textContent = "Incorrect password. Try again.";
            }
          }
        );
      }
    });
  });

  lockTabButton.addEventListener("click", () => {
    chrome.tabs.query({ pinned: true, active: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        const tabId = tabs[0].id;
        chrome.runtime.sendMessage({ action: "lockTab", tabId: tabId });
        // Additional logic as needed
        statusMessage.textContent = "Tab locked.";
      }
    });
  });
});
