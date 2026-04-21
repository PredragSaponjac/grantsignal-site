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

const EXAMPLES = {
  botanical: {
    badge: "From Past Runs",
    title: "Texas oncology-supportive therapeutics",
    subtitle:
      "Previous run for a botanical therapeutic aimed at gut inflammation and chemotherapy-induced toxicity.",
    classification: "Biomedical / therapeutics",
    stage: "Preclinical / translational",
    applicant: "Small business with academic partner likely strongest",
    geography: "Texas flagship programs likely relevant",
    outlook:
      "Likely search path centers on NIH SBIR/STTR, NCI, Texas CPRIT, DoD medical programs, and disease-specific foundations. Expect a short but credible list of high-value opportunities.",
    strong: "4",
    moderate: "3",
    complexity: "High",
    sources: "12+",
    paths: [
      "NIH SBIR/STTR",
      "NCI supportive-care and adverse-sequelae programs",
      "Texas CPRIT translational and oncology pathways",
      "Disease-specific foundations",
    ],
    sponsors: ["NIH SBIR/STTR", "NCI", "CPRIT", "Disease foundations"],
    findings: [
      "State cancer funding emerged as a major advantage because the topic had clear Texas oncology relevance.",
      "Academic partnership materially improved eligibility for stronger-fit opportunities and larger award ceilings.",
      "The most valuable paths were narrow and specific, not broad generic grant directories.",
    ],
  },
  oral: {
    badge: "Narrow Field",
    title: "Nationwide oral health toxicity product",
    subtitle:
      "Previous run for a detox chewing-gum concept linked to buprenorphine-induced dental toxicity.",
    classification: "Medical device / oral health therapeutic",
    stage: "Prototype / preclinical validation",
    applicant: "Small business lead with dental research partner likely optimal",
    geography: "Nationwide federal and private funding prioritized",
    outlook:
      "Funding field is concentrated. The strongest paths likely cluster around NIDCR, NIH small-business mechanisms, and a small number of oral-health programs rather than broad public-health grants.",
    strong: "2",
    moderate: "3",
    complexity: "High",
    sources: "9+",
    paths: [
      "NIDCR small-business and oral-health pathways",
      "NIH SBIR/STTR",
      "Targeted oral-health foundations",
      "Selective state innovation programs",
    ],
    sponsors: ["NIDCR", "NIH SBIR/STTR", "ADA Foundation", "State innovation"],
    findings: [
      "The funding landscape was much narrower than expected, which makes filtering especially valuable.",
      "Federal dental-health routes outranked broader opioid-response programs because the product fit was more precise.",
      "A small-business lead paired with a dental research partner improved the credibility of the strongest routes.",
    ],
  },
  agtech: {
    badge: "Regional Match",
    title: "Midwest functional agriculture ingredient",
    subtitle:
      "Previous run for a nutrition-linked functional ingredient with translational and commercialization potential.",
    classification: "Agriculture / food / nutrition / functional ingredients",
    stage: "Translational / pilot",
    applicant: "Small business or university commercialization office likely best",
    geography: "Regional state flagships likely important alongside USDA pathways",
    outlook:
      "Likely search path includes USDA SBIR, NIFA translational mechanisms, Midwest state innovation bodies, and food or nutrition-adjacent foundations where product-development fit is explicit.",
    strong: "3",
    moderate: "4",
    complexity: "Medium",
    sources: "11+",
    paths: [
      "USDA SBIR and NIFA programs",
      "Regional innovation and commercialization funds",
      "Food and nutrition translational grants",
      "Industry-academic pilot partnerships",
    ],
    sponsors: ["USDA SBIR", "NIFA", "State flagships", "Applied nutrition funds"],
    findings: [
      "Regional state programs mattered more than a nationwide sweep because geography materially changed the best-fit options.",
      "Product-development language outperformed basic nutrition framing when matching to stronger opportunities.",
      "The best route blended agricultural relevance with translational commercialization logic rather than pure academic framing.",
    ],
  },
  ai: {
    badge: "Broad Match",
    title: "Nationwide AI-enabled diagnostics platform",
    subtitle:
      "Previous run for a software-heavy health platform where both digital-health and diagnostic routes were relevant.",
    classification: "Digital health / diagnostics / health IT",
    stage: "Prototype / pilot",
    applicant: "Small business lead with clinical validation partner likely strongest",
    geography: "Nationwide federal, foundation, and strategic state programs relevant",
    outlook:
      "This is broader than a single-disease therapeutic search, so the preview shows multiple viable channels. The paid report would separate true diagnostic fits from generic AI or software noise.",
    strong: "4",
    moderate: "5",
    complexity: "Medium",
    sources: "14+",
    paths: [
      "NSF and federal innovation pathways",
      "NIH digital health and diagnostics programs",
      "State commercialization funds",
      "Foundation or challenge-based opportunities",
    ],
    sponsors: ["NSF", "NIH digital health", "State commercialization", "Challenge funds"],
    findings: [
      "Broad AI terminology created a noisy landscape, so the report separated real diagnostics fit from generic software opportunities.",
      "Clinical validation partnerships made the strongest opportunities more plausible and defensible.",
      "The final shortlist was smaller than the raw search universe, which is exactly where the value is created.",
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
