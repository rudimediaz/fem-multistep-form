import type { Component } from "solid-js";
import Layout from "./components/Layout";
import * as c from "./App.css";
import Form from "./components/Form";

const App: Component = () => {
  return (
    <Layout>
      <div class={c.parent}>
        <Form />
      </div>
    </Layout>
  );
};

export default App;
