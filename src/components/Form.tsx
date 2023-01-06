import type { Component } from "solid-js";
import * as c from "./Form.css";

const Form: Component = () => {
  return (
    <div class={c.parent}>
      <div class={c.sidebar}>sidebar</div>
      <div class={c.fields}>fields</div>
      <div class={c.actions}>actions</div>
    </div>
  );
};

export default Form;
