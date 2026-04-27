import { Navigate, Route, Routes } from "react-router-dom";
import LegacyPage from "./components/LegacyPage.jsx";
import SiteLayout from "./components/SiteLayout.jsx";
import SlideshowPage from "./pages/SlideshowPage.jsx";
import "./styles/default.css";
import "./styles/card.css";
import "./styles/app.css";

function App() {
    return (
        <Routes>
            <Route element={<SiteLayout />}>
                <Route index element={<LegacyPage sourcePath="/legacy/index.html" />} />
                <Route path="contract" element={<LegacyPage sourcePath="/legacy/contract.html" />} />
                <Route path="survey" element={<LegacyPage sourcePath="/legacy/survey.html" />} />
                <Route path="cards" element={<LegacyPage sourcePath="/legacy/cards.html" />} />
                <Route path="inventory" element={<LegacyPage sourcePath="/legacy/inventory.html" />} />
                <Route path="documentation" element={<LegacyPage sourcePath="/legacy/documentation.html" />} />
                <Route path="product" element={<LegacyPage sourcePath="/legacy/product.html" />} />
                <Route path="gallery" element={<LegacyPage sourcePath="/legacy/gallery.html" />} />
                <Route path="slideshow" element={<SlideshowPage />} />
                <Route path="highlight" element={<LegacyPage sourcePath="/legacy/highlight.html" />} />
                <Route path="website_evaluations" element={<LegacyPage sourcePath="/legacy/website_evaluations.html" />} />
                <Route path="instructions" element={<LegacyPage sourcePath="/legacy/instructions.html" />} />
                <Route
                    path="intro_form"
                    element={
                        <LegacyPage
                            sourcePath="/legacy/intro_form.html"
                            scripts={["/Scripts/introduction.js", "/Scripts/generate_json.js", "/Scripts/generate_html.js"]}
                        />
                    }
                />
                <Route path="hobby" element={<LegacyPage sourcePath="/legacy/hobby/index.html" />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}

export default App;
