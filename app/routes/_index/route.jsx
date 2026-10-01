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

export default function Landing() {
  const { showForm } = useLoaderData();

  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <p className={styles.brand}>CMS</p>

        <h1 className={styles.heading}>
          Edit your store's content without touching code.
        </h1>
        <p className={styles.tagline}>
          Update pages, banners and copy from inside Shopify admin, and see the
          changes on your storefront right away.
        </p>

        {showForm && (
          <Form className={styles.form} method="post" action="/auth/login">
            <label className={styles.label} htmlFor="shop">
              Your store address
            </label>
            <div className={styles.row}>
              <input
                id="shop"
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
          </Form>
        )}

        <ul className={styles.list}>
          <li>
            <strong>Edit in one place.</strong> Change content from a single
            screen in your admin.
          </li>
          <li>
            <strong>Publish when ready.</strong> Nothing goes live until you
            say so.
          </li>
          <li>
            <strong>Stay in Shopify.</strong> No separate login, and no code
            changes.
          </li>
        </ul>
      </div>
    </main>
  );
}
