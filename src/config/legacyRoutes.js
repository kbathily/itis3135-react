const htmlRouteMap = {
    "index.html": "/",
    "contract.html": "/contract",
    "survey.html": "/survey",
    "cards.html": "/cards",
    "inventory.html": "/inventory",
    "documentation.html": "/documentation",
    "product.html": "/product",
    "gallery.html": "/gallery",
    "highlight.html": "/highlight",
    "website_evaluations.html": "/website_evaluations",
    "instructions.html": "/instructions",
    "intro_form.html": "/intro_form",
    "hobby/index.html": "/hobby",
    "hobby/": "/hobby",
    "hobby": "/hobby"
};

export function mapLegacyHrefToRoute(rawHref) {
    if (!rawHref) {
        return null;
    }

    const href = rawHref.trim();
    const lowered = href.toLowerCase();

    if (
        lowered.startsWith("http://") ||
        lowered.startsWith("https://") ||
        lowered.startsWith("mailto:") ||
        lowered.startsWith("tel:") ||
        lowered.startsWith("#") ||
        lowered.startsWith("javascript:")
    ) {
        return null;
    }

    const withoutLeading = lowered.replace(/^\.\//, "").replace(/^\//, "");
    const sanitized = withoutLeading.split("?")[0].split("#")[0];

    if (htmlRouteMap[sanitized]) {
        return htmlRouteMap[sanitized];
    }

    return null;
}

export function mapLegacyAssetUrl(rawUrl) {
    if (!rawUrl) {
        return rawUrl;
    }

    const url = rawUrl.trim();
    const lowered = url.toLowerCase();

    if (
        lowered.startsWith("http://") ||
        lowered.startsWith("https://") ||
        lowered.startsWith("data:") ||
        lowered.startsWith("blob:") ||
        lowered.startsWith("#") ||
        lowered.startsWith("/")
    ) {
        return url;
    }

    if (url.startsWith("../")) {
        return url.replace(/^\.\.\//, "/");
    }

    return `/${url.replace(/^\.\//, "")}`;
}
