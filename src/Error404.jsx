import { Link } from "react-router";

/** Shown when no route matches the current URL. */
export default function Error404() {
  return (
    <>
      <h1>404 – Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go back home</Link>
    </>
  );
}
