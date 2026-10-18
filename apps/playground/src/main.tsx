import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./page";
import "@nezui/ui/styles.css";
import "./page.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode><App /></StrictMode>,
);
