import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mapLegacyAssetUrl, mapLegacyHrefToRoute } from "../config/legacyRoutes.js";

function rewriteMainDom(mainElement) {
    mainElement.querySelectorAll("a[href]").forEach((anchor) => {
        const route = mapLegacyHrefToRoute(anchor.getAttribute("href"));
        if (route) {
            anchor.setAttribute("href", route);
            anchor.setAttribute("data-router-link", "true");
        }
    });

    mainElement.querySelectorAll("img[src], source[src], source[srcset]").forEach((element) => {
        if (element.hasAttribute("src")) {
            element.setAttribute("src", mapLegacyAssetUrl(element.getAttribute("src")));
        }
        if (element.hasAttribute("srcset")) {
            element.setAttribute("srcset", mapLegacyAssetUrl(element.getAttribute("srcset")));
        }
    });
}

function appendScripts(scriptPaths) {
    return scriptPaths.map((path) => {
        const script = document.createElement("script");
        script.src = path;
        script.async = false;
        document.body.appendChild(script);
        return script;
    });
}

export default function LegacyPage({ sourcePath, scripts = [] }) {
    const navigate = useNavigate();
    const [content, setContent] = useState({ title: "", html: "", error: "" });
    const contentRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        async function loadLegacyPage() {
            try {
                const response = await fetch(sourcePath);
                if (!response.ok) {
                    throw new Error(`Unable to load ${sourcePath}`);
                }

                const htmlText = await response.text();
                const doc = new DOMParser().parseFromString(htmlText, "text/html");
                const title = doc.querySelector("title")?.textContent?.trim() || "ITIS 3135";
                const main = doc.querySelector("main");

                if (!main) {
                    throw new Error(`Missing <main> in ${sourcePath}`);
                }

                rewriteMainDom(main);

                if (!cancelled) {
                    setContent({ title, html: main.innerHTML, error: "" });
                }
            } catch (error) {
                if (!cancelled) {
                    setContent({
                        title: "ITIS 3135",
                        html: "",
                        error: error instanceof Error ? error.message : "Failed to load page"
                    });
                }
            }
        }

        loadLegacyPage();

        return () => {
            cancelled = true;
        };
    }, [sourcePath]);

    useEffect(() => {
        if (content.title) {
            document.title = content.title;
        }
    }, [content.title]);

    useEffect(() => {
        const container = contentRef.current;
        if (!container) {
            return undefined;
        }

        function onClick(event) {
            const target = event.target;
            if (!(target instanceof Element)) {
                return;
            }

            const anchor = target.closest("a[data-router-link='true']");
            if (!anchor) {
                return;
            }

            event.preventDefault();
            const href = anchor.getAttribute("href");
            if (href) {
                navigate(href);
            }
        }

        container.addEventListener("click", onClick);
        return () => {
            container.removeEventListener("click", onClick);
        };
    }, [navigate, content.html]);

    useEffect(() => {
        if (!scripts.length || !content.html) {
            return undefined;
        }

        const injectedScripts = appendScripts(scripts);
        return () => {
            injectedScripts.forEach((script) => script.remove());
        };
    }, [scripts, content.html]);

    return (
        <main>
            {content.error ? <p>{content.error}</p> : <div ref={contentRef} dangerouslySetInnerHTML={{ __html: content.html }} />}
        </main>
    );
}
