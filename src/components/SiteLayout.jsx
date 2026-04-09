import { Children } from "react";
import { NavLink, Outlet } from "react-router-dom";

const primaryLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/contract", label: "Contract" },
    { to: "/survey", label: "Survey" },
    { to: "/cards", label: "Cards" },
    { to: "/inventory", label: "Inventory" },
    { to: "/documentation", label: "Documentation" },
    { to: "/product", label: "Product" },
    { to: "/gallery", label: "Gallery" },
    { to: "/highlight", label: "Highlight" },
    { to: "/website_evaluations", label: "Website Evaluations" },
    { to: "/instructions", label: "Instructions" },
    { to: "/intro_form", label: "Intro Form" },
    { href: "/bathilydesigns.net/index.html", label: "Client Site" },
    { to: "/hobby", label: "Hobby" },
    { href: "/stuff/This%20is%20%F0%9F%91%8DGriGrI.htm", label: "CRAP Page" }
];

function LinkGroup({ children }) {
    return Children.toArray(children)
        .flatMap((item, index) => {
            const parts = [item];
            if (index < Children.count(children) - 1) {
                parts.push(
                    <span className="nav-separator" key={`sep-${index}`} aria-hidden="true">
                        |
                    </span>
                );
            }
            return parts;
        });
}

export default function SiteLayout() {
    return (
        <>
            <header>
                <h1>Bathily&apos;s Brave Kudu</h1>
                <nav className="primary-nav" aria-label="Primary navigation">
                    <LinkGroup>
                        {primaryLinks.map((link) => (
                            link.to ? (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    end={link.end}
                                    className={({ isActive }) => (isActive ? "active" : "")}
                                >
                                    {link.label}
                                </NavLink>
                            ) : (
                                <a key={link.href} href={link.href}>
                                    {link.label}
                                </a>
                            )
                        ))}
                    </LinkGroup>
                </nav>
            </header>

            <Outlet />

            <footer>
                <p>
                    <a href="https://github.com/kbathily" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <span aria-hidden="true"> | </span>
                    <a href="https://webpages.charlotte.edu/kbathily" target="_blank" rel="noopener noreferrer">Faculty Page</a>
                    <span aria-hidden="true"> | </span>
                    <a href="https://kbathily.github.io" target="_blank" rel="noopener noreferrer">GitHub.io</a>
                    <span aria-hidden="true"> | </span>
                    <a href="https://itis3135-react-swart-theta.vercel.app/" target="_blank" rel="noopener noreferrer">ITIS3135@Vercel</a>
                    <span aria-hidden="true"> | </span>
                    <a href="https://www.linkedin.com/in/bathily-bathily-a34b893a7/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <span aria-hidden="true"> | </span>
                    <a href="https://www.freecodecamp.org/bathily" target="_blank" rel="noopener noreferrer">freeCodeCamp</a>
                    <span aria-hidden="true"> | </span>
                    <a
                        href="https://www.freecodecamp.org/certification/bathily/responsive-web-design-v9"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        freeCodeCamp Certification
                    </a>
                </p>
                <p>
                    Page designed by{" "}
                    <a href="/bathilydesigns.net/index.html" target="_blank" rel="noopener noreferrer">
                        Bathily Designs
                    </a>{" "}
                    &copy; 2026
                </p>
            </footer>
        </>
    );
}
