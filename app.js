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
const headlineList = document.getElementById("headline-list");
const miniOpportunityTable = document.getElementById("mini-opportunity-table");
const excerptLead = document.getElementById("excerpt-lead");
const excerptQuote = document.getElementById("excerpt-quote");
const nextStepList = document.getElementById("next-step-list");

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
      "CPRIT was described in the completed report as the most aggressive capital deployment vehicle for oncology-related life sciences in Texas, with up to $1.2 million over four years.",
      "The report emphasized that private companies cannot lead the CPRIT IIRA mechanism, so a Texas academic partner is structurally required.",
      "The NCI PAR-25-145 path was presented as direct mechanistic validation funding for microbiome modulation, cytokine suppression, and mucosal barrier restoration work.",
    ],
    headlines: [
      "7 verified non-dilutive opportunities across 3 tiers.",
      "CPRIT IIRA deadline April 28, 2026 and academic partnership required.",
      "DoD CDMRP FY26 appropriation surged to $1.27B, with Inflammatory Bowel Disease explicitly listed.",
    ],
    opportunities: [
      {
        name: "CPRIT IIRA",
        status: "Open now",
        deadline: "2026-04-28",
      },
      {
        name: "NIH SBIR/STTR Omnibus",
        status: "Upcoming",
        deadline: "2026-09-05",
      },
      {
        name: "NCI PAR-25-145",
        status: "Open now",
        deadline: "2026-06-05",
      },
    ],
    quoteLead: "Strategic highlight from the completed report",
    quote:
      "CPRIT represents the most aggressive capital deployment vehicle for oncology-related life sciences in Texas, offering up to $1.2 million over four years through Individual Investigator Research Awards. Capturing this funding requires immediate execution of a Sponsored Research Agreement with a Texas academic institution.",
    nextSteps: [
      "Engage MD Anderson, Baylor, or UT Health Houston immediately for the CPRIT IIRA route.",
      "Register in eBRAP ahead of the expected CDMRP pre-application window in May or June 2026.",
      "Finalize preliminary mechanistic data needed for the June 5 NCI PAR-25-145 submission.",
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
      "The report explicitly said the funding ecosystem for Program 2 is highly centralized and presented only two highlights to avoid artificially padding the analysis.",
      "NIDCR was described as the monolithic funder for dental pharmacology and oral health innovation in the United States for this use case.",
      "Texas opioid settlement funds were presented as a critical misalignment because no competitive RFA track was designed to fund preclinical pharmacological R&D.",
    ],
    headlines: [
      "The report said fewer than 5 truly strong opportunities existed for the combined portfolio, especially for Program 2.",
      "Program 2's path was described as narrow, with NIH NIDCR SBIR Omnibus as the definitive large-scale vehicle.",
      "Texas opioid settlement funding was ruled out as structurally inaccessible for this R&D topic.",
    ],
    opportunities: [
      {
        name: "NIH SBIR/STTR Omnibus",
        status: "Upcoming",
        deadline: "2026-09-05",
      },
      {
        name: "ADA Foundation Award",
        status: "Upcoming",
        deadline: "Spring 2026",
      },
      {
        name: "Texas opioid settlement",
        status: "Excluded",
        deadline: "N/A",
      },
    ],
    quoteLead: "Program 2 positioning from the completed report",
    quote:
      "NIDCR operates as the monolithic funder for dental pharmacology and oral health innovation in the United States. Program 2 represents exactly the functional consumer health product NIDCR seeks to commercialize. The September 5, 2026 SBIR deadline is the optimal target.",
    nextSteps: [
      "Verify SAM.gov, UEI, and SBA registry status early so the September SBIR window is not blocked administratively.",
      "Identify a dental research collaborator such as UT Health San Antonio School of Dentistry for the STTR-aligned route.",
      "Avoid Texas opioid settlement grant chasing for this topic; the completed report treated that path as an exclusion, not an opportunity.",
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
  renderList(headlineList, config.headlines, "");
  excerptLead.textContent = config.quoteLead;
  excerptQuote.textContent = config.quote;
  renderList(nextStepList, config.nextSteps, "");

  miniOpportunityTable.innerHTML = "";
  const headerRow = document.createElement("div");
  headerRow.className = "mini-opportunity-row mini-opportunity-head";
  ["Program", "Status", "Deadline"].forEach((label) => {
    const span = document.createElement("span");
    span.textContent = label;
    headerRow.appendChild(span);
  });
  miniOpportunityTable.appendChild(headerRow);

  config.opportunities.forEach((opportunity) => {
    const row = document.createElement("div");
    row.className = "mini-opportunity-row";
    [opportunity.name, opportunity.status, opportunity.deadline].forEach((value) => {
      const span = document.createElement("span");
      span.textContent = value;
      row.appendChild(span);
    });
    miniOpportunityTable.appendChild(row);
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
