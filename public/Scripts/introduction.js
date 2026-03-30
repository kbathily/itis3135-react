const defaultCourses = [
    {
        department: "ITIS",
        number: "3135",
        name: "Front End Web App Development",
        reason: "Interesting class."
    },
    {
        department: "ITCS",
        number: "4122",
        name: "Visual Analytic",
        reason: "Required and interesting class."
    },
    {
        department: "ITCS",
        number: "3155",
        name: "Software Engineering",
        reason: "Required class and interesting."
    },
    {
        department: "ITIS",
        number: "3200",
        name: "Intro to Info Security & Priv",
        reason: "Interesting class."
    }
];

const defaultImageAlt = "selfie of Kalilou Bathily";

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function courseTemplate(course = {}) {
    const department = course.department || "";
    const number = course.number || "";
    const name = course.name || "";
    const reason = course.reason || "";

    return `
        <fieldset class="course-item">
            <legend>Course</legend>
            <p>
                <label>Department<br>
                    <input type="text" name="courseDepartment" value="${escapeHtml(department)}" placeholder="Enter course department" required>
                </label>
            </p>
            <p>
                <label>Number<br>
                    <input type="text" name="courseNumber" value="${escapeHtml(number)}" placeholder="Enter course number" required>
                </label>
            </p>
            <p>
                <label>Name<br>
                    <input type="text" name="courseName" value="${escapeHtml(name)}" placeholder="Enter course name" required>
                </label>
            </p>
            <p>
                <label>Reason<br>
                    <input type="text" name="courseReason" value="${escapeHtml(reason)}" placeholder="Enter reason for taking the course" required>
                </label>
            </p>
            <p>
                <button type="button" class="remove-course">Delete Course</button>
            </p>
        </fieldset>
    `;
}

function buildDisplayName(data) {
    const middle = data.middleName ? ` ${data.middleName}` : "";
    const preferred = data.preferredName ? ` “${data.preferredName}”` : "";
    return `${data.firstName}${middle}${preferred} ${data.lastName} ${data.divider} ${data.mascotAdjective} ${data.mascotAnimal}`;
}

function buildLinksMarkup(links) {
    return links
        .map((link, index) => {
            const separator = index < links.length - 1 ? " |" : "";
            return `<a href="${escapeHtml(link.href)}" target="_blank">${escapeHtml(link.name)}${separator}</a>`;
        })
        .join("\n      ");
}

function buildRenderedIntroMarkup(data) {
    const funnyMarkup = data.funnyThing
        ? `
    <li>
      <strong>Funny/Interesting item to remember me by:</strong>
      ${escapeHtml(data.funnyThing)}
    </li>`
        : "";

    const shareMarkup = data.shareMore
        ? `
    <li>
      <strong>I’d also like to share:</strong>
      ${escapeHtml(data.shareMore)}
    </li>`
        : "";

    const shareParagraph = data.shareMore
        ? `
  <p>
    ${escapeHtml(data.shareMore)}
  </p>`
        : "";

    const courseMarkup = data.courses
        .map((course) => `
        <li><strong>${escapeHtml(course.department)} ${escapeHtml(course.number)} - ${escapeHtml(course.name)}:</strong> ${escapeHtml(course.reason)}</li>`)
        .join("");

    return `
  <h3>${escapeHtml(buildDisplayName(data))}</h3>

  <figure>
    <img src="${escapeHtml(data.pictureSrc)}" alt="${escapeHtml(data.pictureAlt)}">
    <figcaption><i>${escapeHtml(data.pictureCaption)}</i></figcaption>
  </figure>

  <h3>Personal Statement</h3>
  <p>
    ${escapeHtml(data.personalStatement)}
  </p>

  <ul>
    <li>
      <strong>Personal Background:</strong>
      ${escapeHtml(data.personalBackground)}
    </li>
    <li>
      <strong>Academic Background:</strong>
      ${escapeHtml(data.academicBackground)}
    </li>
    <li>
      <strong>Professional Background:</strong>
      ${escapeHtml(data.professionalBackground)}
    </li>
    <li>
      <strong>Primary Work Computer:</strong>
      ${escapeHtml(data.primaryComputer)}
    </li>
    <li>
      <strong>Backup Work Computer &amp; Location Plan:</strong>
      ${escapeHtml(data.backupPlan)}
    </li>
    <li>
      <strong>Courses I’m Taking, &amp; Why:</strong>
      <ol>${courseMarkup}
      </ol>
    </li>${funnyMarkup}${shareMarkup}
  </ul>${shareParagraph}

  <h3>Quote</h3>
  <blockquote>
    “${escapeHtml(data.quoteText)}”
    <footer>— ${escapeHtml(data.quoteAuthor)}</footer>
  </blockquote>

  <h3>Online Profiles</h3>
  <p>
      ${buildLinksMarkup(data.links)}
  </p>

  <p><a href="#" id="reset-output">Reset Form</a></p>`;
}

function buildHtmlCodeMarkup(data) {
    const courseMarkup = data.courses
        .map((course) => `        <li><strong>${escapeHtml(course.department)} ${escapeHtml(course.number)} - ${escapeHtml(course.name)}:</strong> ${escapeHtml(course.reason)}</li>`)
        .join("\n");

    const funnyMarkup = data.funnyThing
        ? `    <li>\n      <strong>Funny/Interesting item to remember me by:</strong> ${escapeHtml(data.funnyThing)}\n    </li>\n`
        : "";

    const shareMarkup = data.shareMore
        ? `    <li>\n      <strong>I’d also like to share:</strong> ${escapeHtml(data.shareMore)}\n    </li>\n`
        : "";

    const shareParagraph = data.shareMore
        ? `\n<p>${escapeHtml(data.shareMore)}</p>`
        : "";

    const htmlCode = `<h2>Introduction HTML</h2>
<h3>${escapeHtml(buildDisplayName(data))}</h3>
<figure>
    <img src="${escapeHtml(data.pictureSrc)}" alt="${escapeHtml(data.pictureAlt)}">
    <figcaption><i>${escapeHtml(data.pictureCaption)}</i></figcaption>
</figure>
<h3>Personal Statement</h3>
<p>${escapeHtml(data.personalStatement)}</p>
<ul>
    <li>
      <strong>Personal Background:</strong> ${escapeHtml(data.personalBackground)}
    </li>
    <li>
      <strong>Academic Background:</strong> ${escapeHtml(data.academicBackground)}
    </li>
    <li>
      <strong>Professional Background:</strong> ${escapeHtml(data.professionalBackground)}
    </li>
    <li>
      <strong>Primary Work Computer:</strong> ${escapeHtml(data.primaryComputer)}
    </li>
    <li>
      <strong>Backup Work Computer &amp; Location Plan:</strong> ${escapeHtml(data.backupPlan)}
    </li>
    <li>
      <strong>Courses I’m Taking, &amp; Why:</strong>
      <ol>
${courseMarkup}
      </ol>
    </li>
${funnyMarkup}${shareMarkup}</ul>${shareParagraph}
<h3>Quote</h3>
<blockquote>
  “${escapeHtml(data.quoteText)}”
  <footer>— ${escapeHtml(data.quoteAuthor)}</footer>
</blockquote>
<h3>Online Profiles</h3>
<p>${data.links.map((link) => `<a href="${escapeHtml(link.href)}" target="_blank">${escapeHtml(link.name)}</a>`).join(" | ")}</p>`;

    return `<div><pre><code>${escapeHtml(htmlCode)}</code></pre></div><p><a href="#" id="reset-output">Reset Form</a></p>`;
}

function buildJsonData(data) {
    return {
        firstName: data.firstName,
        middleName: data.middleName,
        preferredName: data.preferredName,
        lastName: data.lastName,
        divider: data.divider,
        mascotAdjective: data.mascotAdjective,
        mascotAnimal: data.mascotAnimal,
        acknowledgmentStatement: data.acknowledgmentStatement,
        acknowledgmentDate: data.acknowledgmentDate,
        image: data.pictureSrc,
        imageCaption: data.pictureCaption,
        personalStatement: data.personalStatement,
        personalBackground: data.personalBackground,
        academicBackground: data.academicBackground,
        professionalBackground: data.professionalBackground,
        primaryComputer: data.primaryComputer,
        backupPlan: data.backupPlan,
        funnyThing: data.funnyThing,
        shareMore: data.shareMore,
        quote: data.quoteText,
        quoteAuthor: data.quoteAuthor,
        courses: data.courses,
        links: data.links
    };
}

function renderCourses(courses) {
    const container = document.getElementById("courses-container");
    container.innerHTML = courses.map((course) => courseTemplate(course)).join("");
}

function collectLinks() {
    const links = [];
    for (let index = 1; index <= 6; index += 1) {
        const name = document.getElementById(`link-name-${index}`).value.trim();
        const href = document.getElementById(`link-href-${index}`).value.trim();
        if (name && href) {
            links.push({ name, href });
        }
    }
    return links;
}

function collectCourses() {
    return Array.from(document.querySelectorAll(".course-item")).map((courseItem) => ({
        department: courseItem.querySelector('[name="courseDepartment"]').value.trim(),
        number: courseItem.querySelector('[name="courseNumber"]').value.trim(),
        name: courseItem.querySelector('[name="courseName"]').value.trim(),
        reason: courseItem.querySelector('[name="courseReason"]').value.trim()
    }));
}

function collectFormData() {
    const preferredName = document.getElementById("preferred-name").value.trim();
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const pictureCaption = document.getElementById("picture-caption").value.trim();
    const picturePath = document.getElementById("picture-path").value.trim();
    const preview = document.getElementById("picture-preview");

    return {
        firstName,
        middleName: document.getElementById("middle-name").value.trim(),
        preferredName,
        lastName,
        divider: document.getElementById("divider").value.trim(),
        mascotAdjective: document.getElementById("mascot-adjective").value.trim(),
        mascotAnimal: document.getElementById("mascot-animal").value.trim(),
        acknowledgmentStatement: document.getElementById("acknowledgment-statement").value.trim(),
        acknowledgmentDate: document.getElementById("acknowledgment-date").value,
        pictureSrc: preview.dataset.uploadedSrc || picturePath,
        pictureAlt: `selfie of ${firstName} ${lastName}`.trim() || defaultImageAlt,
        pictureCaption,
        personalStatement: document.getElementById("personal-statement").value.trim(),
        personalBackground: document.getElementById("personal-background").value.trim(),
        academicBackground: document.getElementById("academic-background").value.trim(),
        professionalBackground: document.getElementById("professional-background").value.trim(),
        primaryComputer: document.getElementById("primary-computer").value.trim(),
        backupPlan: document.getElementById("backup-plan").value.trim(),
        funnyThing: document.getElementById("funny-thing").value.trim(),
        shareMore: document.getElementById("share-more").value.trim(),
        quoteText: document.getElementById("quote-text").value.trim(),
        quoteAuthor: document.getElementById("quote-author").value.trim(),
        courses: collectCourses(),
        links: collectLinks()
    };
}

function resetImagePreview() {
    const preview = document.getElementById("picture-preview");
    const caption = document.getElementById("picture-preview-caption");
    const path = document.getElementById("picture-path").value.trim();
    const pictureCaption = document.getElementById("picture-caption").value.trim();
    preview.src = path || "images/myphotos/Selfy.jpg";
    preview.alt = defaultImageAlt;
    delete preview.dataset.uploadedSrc;
    caption.innerHTML = `<i>${escapeHtml(pictureCaption || "Enjoying a sunny day at Campus.")}</i>`;
}

function resetToForm() {
    document.getElementById("page-title").textContent = "Introduction Form";
    document.getElementById("output-view").hidden = true;
    document.getElementById("output-view").innerHTML = "";
    document.getElementById("form-view").hidden = false;
    document.getElementById("intro-form").reset();
    renderCourses(defaultCourses);
    resetImagePreview();
}

function showOutput(title, markup) {
    document.getElementById("page-title").textContent = title;
    document.getElementById("form-view").hidden = true;
    const outputView = document.getElementById("output-view");
    outputView.hidden = false;
    outputView.innerHTML = markup;

    const resetLink = document.getElementById("reset-output");
    if (resetLink) {
        resetLink.addEventListener("click", (event) => {
            event.preventDefault();
            resetToForm();
        });
    }
}
function clearForm() {
    const form = document.getElementById("intro-form");
    Array.from(form.querySelectorAll("input, textarea")).forEach((element) => {
        if (element.type === "checkbox" || element.type === "file") {
            if (element.type === "checkbox") {
                element.checked = false;
            } else {
                element.value = "";
            }
            return;
        }
        element.value = "";
    });

    renderCourses([{}]);
    document.getElementById("picture-preview").src = "";
    document.getElementById("picture-preview").alt = "Uploaded image preview";
    document.getElementById("picture-preview-caption").innerHTML = "<i></i>";
}

function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById("intro-form");
    if (!form.reportValidity()) {
        return;
    }
    showOutput("Introduction Form", buildRenderedIntroMarkup(collectFormData()));
}

function handleGenerateHtml() {
    const form = document.getElementById("intro-form");
    if (!form.reportValidity()) {
        return;
    }
    showOutput("Introduction HTML", buildHtmlCodeMarkup(collectFormData()));
}

function handleGenerateJson() {
    const form = document.getElementById("intro-form");
    if (!form.reportValidity()) {
        return;
    }
    const jsonText = JSON.stringify(buildJsonData(collectFormData()), null, 2);
    showOutput("Introduction JSON", `<div><pre><code>${escapeHtml(jsonText)}</code></pre></div><p><a href="#" id="reset-output">Reset Form</a></p>`);
}

function wireCourseButtons() {
    document.getElementById("courses-container").addEventListener("click", (event) => {
        if (!event.target.classList.contains("remove-course")) {
            return;
        }

        const courseItems = document.querySelectorAll(".course-item");
        if (courseItems.length === 1) {
            courseItems[0].querySelectorAll("input").forEach((input) => {
                input.value = "";
            });
            return;
        }

        event.target.closest(".course-item").remove();
    });

    document.getElementById("add-course").addEventListener("click", () => {
        document.getElementById("courses-container").insertAdjacentHTML("beforeend", courseTemplate());
    });
}

function wireImagePreview() {
    const pictureUpload = document.getElementById("picture-upload");
    const picturePath = document.getElementById("picture-path");
    const pictureCaption = document.getElementById("picture-caption");
    const preview = document.getElementById("picture-preview");
    const caption = document.getElementById("picture-preview-caption");

    picturePath.addEventListener("input", () => {
        if (!preview.dataset.uploadedSrc) {
            preview.src = picturePath.value.trim();
        }
    });

    pictureCaption.addEventListener("input", () => {
        caption.innerHTML = `<i>${escapeHtml(pictureCaption.value.trim())}</i>`;
    });

    pictureUpload.addEventListener("change", () => {
        const [file] = pictureUpload.files;
        if (!file) {
            resetImagePreview();
            return;
        }

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            preview.src = reader.result;
            preview.dataset.uploadedSrc = reader.result;
            preview.alt = file.name;
        });
        reader.readAsDataURL(file);
    });
}

function initializeIntroductionForm() {
    const form = document.getElementById("intro-form");
    if (!form || form.dataset.introInitialized === "true") {
        return;
    }

    form.dataset.introInitialized = "true";

    renderCourses(defaultCourses);
    wireCourseButtons();
    wireImagePreview();
    form.addEventListener("submit", handleSubmit);
    form.addEventListener("reset", () => {
        window.setTimeout(() => {
            renderCourses(defaultCourses);
            resetImagePreview();
        }, 0);
    });
    document.getElementById("clear-form").addEventListener("click", clearForm);

    window.IntroFormApp = {
        collectFormData,
        handleGenerateHtml,
        handleGenerateJson,
        resetToForm
    };
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeIntroductionForm);
} else {
    initializeIntroductionForm();
}