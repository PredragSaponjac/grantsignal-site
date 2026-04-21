const topicInput = document.getElementById("topic-input");
const locationInput = document.getElementById("location-input");
const applicantInput = document.getElementById("applicant-input");
const orderButton = document.getElementById("preview-button");
const reportSection = document.getElementById("report");
const exampleButtons = Array.from(document.querySelectorAll(".example-item"));

const topicClass = document.getElementById("topic-class");
const topicStage = document.getElementById("topic-stage");
const topicApplicant = document.getElementById("topic-applicant");
const topicGeo = document.getElementById("topic-geo");
const topicOutlook = document.getElementById("topic-outlook");
const outlookBadge = document.getElementById("outlook-badge");
const fundingPaths = document.getElementById("funding-paths");
const strongFitCount = document.getElementById("strong-fit-count");
const moderateFitCount = document.getElementById("moderate-fit-count");
const complexityLevel = document.getElementById("complexity-level");
const sourceCount = document.getElementById("source-count");
const reportTitle = document.getElementById("report-title");
const exampleTitle = document.getElementById("example-title");
const exampleSubtitle = document.getElementById("example-subtitle");
const sponsorStrip = document.getElementById("sponsor-strip");
const findingList = document.getElementById("finding-list");
const excerptText = document.getElementById("excerpt-text");
const teaserList = document.getElementById("teaser-list");

const EXAMPLES = {
  botanical: {
    badge: "Completed Report",
    title: "Texas botanical therapeutics",
    subtitle:
      "Excerpted from a completed Texas report for a proprietary botanical blend aimed at gut inflammation and chemotherapy-induced toxicity.",
    classification: "Biomedical / therapeutics",
    stage: "Preclinical / translational",
    applicant: "Hybrid small business plus academic partnership",
    geography: "Texas flagship programs likely relevant",
    outlook:
      "Completed report surfaced a narrow but credible set of higher-value paths centered on CPRIT, NIH SBIR/STTR, DoD medical programs, NCI adverse-sequelae funding, and disease-specific foundations.",
    strong: "4",
    moderate: "2",
    complexity: "High",
    sources: "14",
    paths: [
      "CPRIT oncology and translational funding",
      "NIH SBIR/STTR",
      "NCI supportive-care and adverse-sequelae programs",
      "DoD CDMRP inflammatory and cancer programs",
      "Disease-specific foundations",
    ],
    sponsors: ["CPRIT", "NIH SBIR/STTR", "NCI", "DoD CDMRP"],
    findings: [
      "State cancer funding emerged as a major advantage because the topic had clear Texas oncology relevance.",
      "Academic partnership materially improved eligibility for stronger-fit opportunities and larger award ceilings.",
      "The strongest paths were specific and high-fit rather than broad generic grant directories.",
    ],
    excerpt:
      "The completed report narrowed the field to a small set of stronger-fit programs where Texas oncology relevance, preclinical stage, and partnership structure materially changed eligibility and usefulness.",
    opportunities: [
      {
        name: "CPRIT Individual Investigator Research Awards",
        detail: "Open now / Texas academic lead required",
      },
      {
        name: "NIH SBIR/STTR Omnibus",
        detail: "Upcoming / Small business route",
      },
      {
        name: "NCI Therapy-Induced Adverse Sequelae",
        detail: "Open now / Mechanistic preclinical fit",
      },
    ],
  },
  oral: {
    badge: "Completed Report",
    title: "Oral toxicity intervention",
    subtitle:
      "Excerpted from the same completed report for a detox chewing-gum concept linked to buprenorphine-induced dental toxicity.",
    classification: "Oral health / consumer therapeutic",
    stage: "Prototype / preclinical validation",
    applicant: "Small business lead with dental research partner likely optimal",
    geography: "Texas-based search, but strongest routes were federal",
    outlook:
      "Completed report showed a highly centralized funding field. The real value came from narrowing the search to the few paths that actually matched the product and excluding visible but irrelevant opioid-response funding.",
    strong: "1",
    moderate: "1",
    complexity: "High",
    sources: "10",
    paths: [
      "NIDCR oral-health pathways",
      "NIH SBIR/STTR",
      "Targeted oral-health foundation awards",
      "Dental research partnership route",
    ],
    sponsors: ["NIDCR", "NIH SBIR/STTR", "ADA Foundation", "Dental partners"],
    findings: [
      "The funding landscape was much narrower than expected, which makes filtering especially valuable.",
      "NIDCR-related routes outranked broader opioid-response programs because the product fit was far more precise.",
      "Texas opioid settlement funding looked adjacent on the surface but was excluded as a structural mismatch for this R&D topic.",
    ],
    excerpt:
      "The completed report showed that the oral-toxicity concept lived in a tightly constrained funding landscape, where the real value came from excluding visible but structurally mismatched opioid-response funding and focusing on the few routes that actually fit.",
    opportunities: [
      {
        name: "NIH SBIR/STTR Omnibus (NIDCR route)",
        detail: "Upcoming / Primary large-scale path",
      },
      {
        name: "ADA Foundation Promising Researcher Award",
        detail: "Supplemental / Small academic award",
      },
      {
        name: "Texas opioid settlement funding",
        detail: "Excluded / Structural mismatch for R&D",
      },
    ],
  },
};

function renderList(listNode, items, className) {
  listNode.innerHTML = "";
  items.forEach((item) => {
    const child = document.createElement(className === "sponsor-tag" ? "span" : "li");
    child.className = className;
    child.textContent = item;
    listNode.appendChild(child);
  });
}

function renderExample(key) {
  const config = EXAMPLES[key];
  if (!config) return;

  exampleButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.example === key);
  });

  exampleTitle.textContent = config.title;
  exampleSubtitle.textContent = config.subtitle;
  topicClass.textContent = config.classification;
  topicStage.textContent = config.stage;
  topicApplicant.textContent = config.applicant;
  topicGeo.textContent = config.geography;
  topicOutlook.textContent = config.outlook;
  outlookBadge.textContent = config.badge;
  strongFitCount.textContent = config.strong;
  moderateFitCount.textContent = config.moderate;
  complexityLevel.textContent = config.complexity;
  sourceCount.textContent = config.sources;

  renderList(fundingPaths, config.paths, "");
  renderList(sponsorStrip, config.sponsors, "sponsor-tag");
  renderList(findingList, config.findings, "");
  excerptText.textContent = config.excerpt;

  teaserList.innerHTML = "";
  config.opportunities.forEach((opportunity) => {
    const item = document.createElement("div");
    item.className = "teaser-item";

    const strong = document.createElement("strong");
    strong.textContent = opportunity.name;

    const span = document.createElement("span");
    span.textContent = opportunity.detail;

    item.appendChild(strong);
    item.appendChild(span);
    teaserList.appendChild(item);
  });
}

function updatePlannedReport() {
  const topic = topicInput.value.trim().toLowerCase();
  const location = locationInput.value;
  let label = "Funding Report";

  if (topic.includes("botanical") || topic.includes("chemotherapy") || topic.includes("gut")) {
    label = "Botanical Therapeutics Funding Report";
  } else if (topic.includes("oral") || topic.includes("dental") || topic.includes("gum")) {
    label = "Oral Health Funding Report";
  } else if (topic.includes("ai") || topic.includes("software")) {
    label = "Technology Funding Report";
  } else if (topic.includes("food") || topic.includes("nutrition") || topic.includes("ingredient")) {
    label = "Agriculture and Functional Ingredient Funding Report";
  }

  reportTitle.textContent = `${location}-Based ${label}`;
}

exampleButtons.forEach((button) => {
  button.addEventListener("click", () => renderExample(button.dataset.example));
});

topicInput.addEventListener("input", updatePlannedReport);
locationInput.addEventListener("change", updatePlannedReport);
applicantInput.addEventListener("change", updatePlannedReport);
orderButton.addEventListener("click", () => {
  updatePlannedReport();
  reportSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

renderExample("botanical");
updatePlannedReport();
