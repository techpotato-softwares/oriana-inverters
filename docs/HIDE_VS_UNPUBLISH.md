# Hiding content vs unpublishing

Editors can take content off the public site without deleting it. Which control to use depends on what you are editing.

## Hide on website (checkbox)

A **Hide on website** checkbox appears on categories, downloads, page sections, list items, and layout blocks. Ticking it keeps everything in the CMS but stops visitors from seeing it. Untick it to bring the content back. Nothing is lost either way. Hidden list items show a **Hidden** badge on their row in the editor so they are easy to spot.

| Where | What hiding does |
|-------|------------------|
| **Catalogue → Categories** (sidebar) | Removes the category everywhere: Products menu, catalogue tabs, category, series, and product pages (they return 404), home tiles that link to it, and footer links to it. Products keep their data. |
| **Catalogue → Downloads** (sidebar) | Removes the document from the downloads page. The file itself is still reachable at its direct URL. |
| **Home** | Each section has its own toggle (Introduction, Scenarios, Vision & mission, Impact, Product categories, Why Oriana, Green mission, News, Follow). Items inside each section can also be hidden one by one. |
| **About, Support, Sustainability, Careers, Partners, Contact** | Section toggles where a section maps to one block on the page, plus per-item toggles on cards, links, stats, steps, directors, and similar lists. |
| **Site settings → Footer** | Hide a whole footer column, a single footer link, a legal link, or a social link. Social links also feed the home “Follow Oriana” section. |
| **Pages → Content layout** | Every layout block has a toggle, and so do the cards, stats, sections, and columns inside blocks. |

When a list has items but **every** item is hidden, that part of the page disappears. It does not fall back to the built-in copy. A list that is simply left empty still shows the built-in copy, as before.

## Unpublish (draft status)

Products, Solutions, Case studies, FAQs, Jobs, Awards, Partners, Distributors, Videos, Certifications, Warranty plans, Sustainability reports, Posts, and Pages have drafts. To take one of these off the site, open it and use **Unpublish** (or save it as a draft). These collections do not get a separate hide checkbox, because Unpublish already does the same job.

## Which to use

- To take a whole document off the site and it has drafts: **Unpublish**.
- To take a category, download, section, block, or list item off the site: **Hide on website**.
- To remove something permanently: **Delete**. This is the only option that loses data.

## Deploying the schema

The hide checkboxes add new database columns, so the schema has to be pushed **with force** on every environment. A plain `schema:push` skips the push when the core tables already exist.

- **Deploy workflow:** RDS environments always force the push. For an external database, run the deploy with the `force_schema_push` input set to `true`.
- **By hand:**

  ```bash
  cd apps/cms && PAYLOAD_FORCE_SCHEMA_PUSH=true npm run schema:push
  ```

Push the schema before, or together with, the code deploy. If the new code runs against the old schema, CMS reads fail until the push runs. Marketing pages fall back to their built-in copy, and pages built from layout blocks may not load at all.
