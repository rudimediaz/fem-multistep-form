import type { Component } from "solid-js";
import Layout from "./components/Layout";
import * as c from './App.css';


const App: Component = () => {
  return (
    <Layout>
      <div class={c.parent}  >
        <div>form</div>
      </div>
    </Layout>
  );
};

export default App;
