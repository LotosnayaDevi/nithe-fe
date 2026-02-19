import "./styles/main.css";
import { initNav } from "./lib/router";
import { mountNav } from "./components/nav";

document.addEventListener("DOMContentLoaded", () => {
  mountNav();
  initNav();
});
