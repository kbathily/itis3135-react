function initializeGenerateHtmlButton() {
    const button = document.getElementById("generate-html");
    if (!button || button.dataset.htmlHandlerBound === "true") {
        return;
    }

    button.dataset.htmlHandlerBound = "true";

    button.addEventListener("click", () => {
        if (window.IntroFormApp) {
            window.IntroFormApp.handleGenerateHtml();
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeGenerateHtmlButton);
} else {
    initializeGenerateHtmlButton();
}