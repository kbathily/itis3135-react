function initializeGenerateJsonButton() {
    const button = document.getElementById("generate-json");
    if (!button || button.dataset.jsonHandlerBound === "true") {
        return;
    }

    button.dataset.jsonHandlerBound = "true";

    button.addEventListener("click", () => {
        if (window.IntroFormApp) {
            window.IntroFormApp.handleGenerateJson();
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeGenerateJsonButton);
} else {
    initializeGenerateJsonButton();
}