## Note
https://streamhub.co.uk/
https://streamhub.breezy.hr/p/7ac016f72eed01-full-stack-engineer-automation-ai-evaluation

### Order
As part of this stage, we'd like you to complete our QA Automation Assessment, which is attached to this email. The assessment has been designed to reflect the type of work our QA Engineers do at Streamhub and covers UI automation using Playwright and Cucumber, API testing, SQL challenges, and an AI-assisted engineering exercise.

Please read the assessment instructions carefully before you begin.

Once you have completed the assessment, please:

Push your solution to GitHub.
Reply to this email with the GitHub repository link.
Include your test execution results, as outlined in the assessment.
There is no expectation that your solution will be perfect. We're interested in understanding how you approach problems, structure your automation framework, write clean and maintainable code, and apply sound engineering judgement.

If you have any questions while working on the assessment, please don't hesitate to get in touch.
### AI first tackle
**Assessment Overview**  
The PDF defines a full‑stack QA automation task that can be completed by choosing **Section A** (web UI + API + SQL) *or* **Section B** (API + UI + SQL). Each section requires:

1. **Implementation** – a small web app or API.  
2. **Playwright‑Cucumber test framework** – page‑object model, separate feature/step‑definition files, environment‑driven config, resilient locators.  
3. **AI self‑healing exercise** – deliberately add brittle locators and document a repair workflow.  
4. **SQL‑based data‑validation scenarios** – write queries, capture schema & results.  
5. **GitHub submission** – full repo with README, setup guide, test reports (HTML, screenshots, logs).  

#### 1. Software Dependencies  

| Category | Packages / Tools | Version (latest stable) | Why needed |
|----------|------------------|------------------------|------------|
| **Runtime** | **Node.js** (>= 20) | Provides the JavaScript/TypeScript runtime for Playwright and Cucumber. |
| **Test framework** | **Playwright** (`@playwright/test`) | Browser automation, network intercepts, built‑in test runner. |
| | **Cucumber.js** (`@cucumber/cucumber`) | BDD feature files, step definitions. |
| | **Playwright‑Cucumber** integration (`playwright-cucumber`) or custom glue code | Connects Cucumber steps to Playwright actions. |
| | **ts-node** (if using TypeScript) | Executes TS without pre‑compilation. |
| **Build / Lint** | **TypeScript** (optional but recommended) | Improves type safety for page objects. |
| | **ESLint** + **Prettier** | Code quality & formatting. |
| **Environment config** | **dotenv** (`dotenv`) | Loads `.env` with base URL, credentials, etc. |
| **AI self‑healing** | **Claude Code** (or any LLM with CLI/API) | Generates and patches locators. |
| **API server (Section B)** | **Express** (`express`) or **Fastify** | Minimal HTTP server for custom endpoints. |
| | **json-server** (quick mock API alternative) | If a full Express app is overkill. |
| **Database (SQL part)** | **SQLite** (file‑based) or **PostgreSQL** (Docker) | Stores sample tables for round‑trip and IPL‑streak queries. |
| | **SQL.js** (in‑browser) – optional for quick demo | Allows running SQL without a server. |
| **Reporting** | **playwright-html-reporter** (built‑in) | Generates HTML test report with screenshots. |
| **Version control** | **Git** + **GitHub CLI** (`gh`) | Repo creation, push, issue handling. |
| **CI (optional)** | **GitHub Actions** | Automates test run on each push. |
| **Documentation** | **Markdown** (README, self‑healing spec) | Human‑readable deliverables. |
| **Utility** | **jq** (CLI JSON processor) – for API response validation in scripts | Simple assertions without extra libs. |

All dependencies are installable via `npm` (or `yarn`). A `package.json` will lock exact versions.

#### 2. High‑Level Plan  

| Phase | Goal | Concrete Tasks | Deliverables |
|-------|------|----------------|--------------|
| **0 – Repo Setup** | Establish base project structure | 1. Create GitHub repo `<username>/streamhub‑qa‑assessment`.<br>2. Initialize `npm init -y`.<br>3. Add `.gitignore` (node_modules, env files, build artifacts).<br>4. Commit empty `README.md`. | Repo URL, initial commit. |
| **1 – Choose Section** | Decide between A or B (based on personal preference). | 1. Write a short decision note in README. | README updated with chosen section. |
| **2 – Core Application** | Build the required web app or API. | **If Section A:**<br>• Scaffold a minimal React/Next.js (or plain HTML/JS) app with a dashboard, a filterable report view, and a chart (Chart.js).<br>**If Section B:**<br>• Scaffold an Express API with 2‑3 endpoints (GET list, GET by id, POST create) supporting query params (filter, sort, pagination).<br>• Provide mock JSON data files. | Source code, `README` instructions to run (`npm install && npm start`). |
| **3 – Database for SQL Tests** | Provide data for round‑trip and IPL‑streak queries. | 1. Create `sqlite` DB file `assessment.db`.<br>2. Write schema scripts `schema.sql` and seed data `seed.sql` for both scenarios.<br>3. Add a small Node script `run-sql.js` to execute queries for verification. | `assessment.db`, SQL scripts, execution helper. |
| **4 – Playwright‑Cucumber Framework** | Set up test skeleton respecting the spec. | 1. Install `@playwright/test`, `@cucumber/cucumber`, `dotenv`.<br>2. Create folder layout:<br>```\nfeatures/\n   *.feature\nsteps/\n   *.steps.ts\npages/\n   *.page.ts\nconfig/\n   playwright.config.ts\n.env.example\n```<br>3. Configure `playwright.config.ts` to read `BASE_URL` from `.env`.<br>4. Implement a **sample resilient locator** (`getByRole`, `getByTestId`). | Fully functional test harness, ready to add scenarios. |
| **5 – Feature Implementation** | Write the required test cases. | **Section A:**<br>• Feature files for dashboard navigation, input‑validation, chart visibility.<br>• Corresponding step definitions invoking page‑object methods.<br>• Add 3‑5 deliberately brittle locators (e.g., deep CSS path) in one page object. <br>**Section B:**<br>• Feature files for API happy‑path, invalid‑param cases, and UI EMI‑calculator scenarios.<br>• Steps using Playwright’s API testing (`request`). | Feature files, step definitions, updated page objects (including brittle locators). |
| **6 – AI Self‑Healing Documentation** | Explain how to repair brittle locators with Claude Code. | 1. Write `SELF_HEALING.md` describing:<br>   • Detection (Playwright test failure logs, locator screenshot).<br>   • Prompt to Claude Code (e.g., “Replace this brittle CSS selector with a role‑based selector”).<br>   • Validation (rerun failing test, diff screenshots).<br>2. (Optional) Provide a tiny script `heal.js` that sends the selector to Claude Code via its CLI and patches the source file. | `SELF_HEALING.md`, optional `heal.js`. |
| **7 – Test Execution & Reporting** | Run all tests, collect artefacts. | 1. Execute `npx playwright test --reporter=html`.<br>2. Capture HTML report, screenshots, and console logs.<br>3. Store them under `reports/`. | `reports/` folder with HTML, PNGs, logs. |
| **8 – CI Integration (optional but impressive)** | Automate verification on push. | 1. Add `.github/workflows/ci.yml` that installs deps, runs `npm test`, and uploads the HTML report as an artifact. | GitHub Action workflow. |
| **9 – Final Documentation** | Produce a comprehensive README. | Sections: project overview, setup, running the app, executing tests, AI self‑healing workflow, SQL query verification, CI usage, known limitations. | Updated `README.md`. |
| **10 – Submission** | Push everything and share the link. | 1. Commit all files.<br>2. Push to GitHub.<br>3. Verify repository is public.<br>4. Provide the URL. | Public repo URL. |

**Estimated Timeline (single developer)**  

| Day | Activities |
|-----|------------|
| 1 | Repo creation, decide section, scaffold app/API. |
| 2 | Build minimal UI or API, set up SQLite schema & seed data. |
| 3 | Install Playwright/Cucumber, create framework skeleton. |
| 4 | Write feature files & step definitions (including brittle locators). |
| 5 | Implement AI self‑healing documentation + optional script. |
| 6 | Run tests, fix failures, generate reports. |
| 7 | Add CI workflow, final README polishing. |
| 8 | Final review, push, share link. |

Total **≈ 8 working days** (≈ 1 week) with 4‑hour daily effort; can be compressed if needed.

#### 3. Immediate Next Steps (you can start now)  

1. **Create the GitHub repository** and clone it locally.  
2. **Add a `.gitignore`** (node_modules, .env, reports, *.db).  
3. **Choose Section A or B** and note the choice in README.  
4. **Run `npm init -y`** and install core dev dependencies:  

```bash
npm i -D @playwright/test @cucumber/cucumber dotenv typescript ts-node eslint prettier
npm i @playwright/test  # also pulls browsers
```  

5. **Create the folder skeleton** (`features/`, `steps/`, `pages/`, `config/`).  

From here you can progressively flesh out the web app/API, the database, and the test framework.

**Feel free to ask for any of the concrete scaffolding commands, sample code snippets, or clarification on any of the steps above.**

## Prosit
### mots à définir
- playwright : an E2E testing tool for web app
- Page Object Model : a design pattern(architecture) to write test automation
- locators (!= selectors) : selector wrapper leading to the web element and exposed with an API
	- role/label/text-based or data-testid type of locators
- selectors : finds an element on a page (text selectors, accessibilty selectors)
- self-healing
- cucumber API : testing tool
- SQL patterns or SQL streak scenario
### Context
the company wants a high-end test automation architecture with defined features ans specifications.
### Problematic
How to cowork with AI to build ganular test automation framework, thus leading AI to learn the process to become autonomous on testing.
### Needs/constraints
- dynamic/resilient locators and no CSS/XPath selectors
- a working webapp + API
- implement Playwright
	- separate feature
	- step definition
	- POM files
	- with env config
### Livrable

### Plan 
- [ ] debunk the subject + create a CER
- [ ] setup tools : playwright (?+ MCP for Hermes)
- [ ] describe the framework i want to AI
	- for : separate feature, page object Model files, step definitions, env config
	- with dynamic selectors (no CSS/XPath) and self healing locators
	- with role/label/text-based or data-testid locators
	- with Playwright/Cucumber API and/or SQL patterns
- [ ] Hermes iteration  : fix bugs, add scenarios, explainations of Playwright/Cucumber API, SQL patterns, hallu selectors/API, bad locator start, subtle logic bugs
- [ ] write 5 incorrect tests
- [ ] plan/note for boken : detection, prompt approach, validation 
- [ ] apply fix for a working POC (bonus)
- [ ] a note of how I use AI
	- main agent and sidechat for small explanations and brittle of code
