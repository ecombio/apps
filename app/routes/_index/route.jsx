import { redirect, Form, useLoaderData } from "react-router";

import { login } from "../../shopify.server";

import styles from "./styles.module.css";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

const FEATURES = [
  {
    title: "Edit content in one place",
    body: "Banners, page copy and product storytelling live in a single editor inside Shopify admin. No code, no developer ticket.",
  },
  {
    title: "Publish when you're ready",
    body: "Draft changes, review them, then publish. Nothing reaches your storefront until you say so.",
  },
  {
    title: "Built for headless stores",
    body: "Your Next.js or Hydrogen storefront reads content from a simple API, so one change updates every site.",
  },
  {
    title: "Stay inside Shopify",
    body: "Sign in once with your Shopify account. Your team gets access through the permissions you already manage.",
  },
];

const STEPS = [
  ["Install the app", "Enter your store address and approve access in Shopify."],
  ["Create your content", "Add banners, pages and copy in the editor."],
  ["Connect your storefront", "Point your site at the content API with one key."],
  ["Publish", "Changes appear on your storefront within seconds."],
];

const FAQ = [
  [
    "Does it work with headless storefronts?",
    "Yes. Content is served through an API, so it works with Next.js, Hydrogen and any other front end that can fetch JSON.",
  ],
  [
    "Do I need a developer?",
    "A developer connects your storefront once. After that, your team edits content without writing code.",
  ],
  [
    "Can I use it on more than one store?",
    "Yes. Install it on each store, and each one keeps its own content.",
  ],
  [
    "What happens if I uninstall?",
    "Your content stops being served and your store data is removed according to Shopify's uninstall process.",
  ],
];

function InstallForm({ id, showForm }) {
  if (!showForm) return null;
  return (
    <Form className={styles.form} method="post" action="/auth/login">
      <label className={styles.label} htmlFor={id}>
        Your store address
      </label>
      <div className={styles.row}>
        <input
          id={id}
          className={styles.input}
          type="text"
          name="shop"
          placeholder="my-store.myshopify.com"
          autoComplete="off"
          required
        />
        <button className={styles.button} type="submit">
          Install app
        </button>
      </div>
      <p className={styles.hint}>
        Free to install. You approve access on Shopify's own screen.
      </p>
    </Form>
  );
}

export default function Landing() {
  const { showForm } = useLoaderData();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#top">
            CMS
          </a>
          <nav className={styles.nav} aria-label="Main">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#faq">FAQ</a>
            <a className={styles.navButton} href="#install">
              Install
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1 className={styles.h1}>
              Edit your store's content without touching code.
            </h1>
            <p className={styles.lead}>
              One editor inside Shopify admin for banners, pages and copy.
              Publish once and every storefront you run updates.
            </p>
            <div id="install">
              <InstallForm id="shop-hero" showForm={showForm} />
            </div>
          </div>

          <div className={styles.mock} aria-hidden="true">
            <div className={styles.mockBar}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.mockBody}>
              <div className={styles.mockSide}>
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className={styles.mockMain}>
                <div className={styles.mockField}>
                  <b>Homepage banner</b>
                  <em>Spring ride sale: up to 30% off</em>
                </div>
                <div className={styles.mockField}>
                  <b>Subheading</b>
                  <em>Free shipping on every scooter</em>
                </div>
                <div className={styles.mockPublish}>Publish</div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.strip}>
          <p>Works with Shopify, Next.js and Hydrogen storefronts.</p>
        </section>

        <section id="features" className={styles.section}>
          <h2 className={styles.h2}>Everything your team needs to update content</h2>
          <div className={styles.features}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.feature}>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className={`${styles.section} ${styles.tinted}`}>
          <h2 className={styles.h2}>Live in four steps</h2>
          <ol className={styles.steps}>
            {STEPS.map(([title, body], i) => (
              <li key={title}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="faq" className={styles.section}>
          <h2 className={styles.h2}>Questions</h2>
          <div className={styles.faq}>
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <h2 className={styles.h2}>Install it on your store</h2>
          <InstallForm id="shop-footer" showForm={showForm} />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>CMS for Shopify</p>
        <p>
          <a href="mailto:support@ecombio.com">Contact support</a>
        </p>
      </footer>
    </div>
  );
}
