import type { ParentComponent } from "solid-js";
import * as c from "./Layout.css";

const Layout: ParentComponent = (props) => (
  <div class={c.parent}>
    <main>{props.children}</main>
    <footer>
      <div class="attribution">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
        >
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </div>
    </footer>
  </div>
);

export default Layout;
