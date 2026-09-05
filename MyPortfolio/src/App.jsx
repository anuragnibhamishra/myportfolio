import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import ScrollProgress from "./components/ScrollProgress";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { Analytics } from "@vercel/analytics/next"

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default function App() {
  const [booting, setBooting] = useState(true);
  const finish = useCallback(() => setBooting(false), []);

  return (
    <>
      <Analytics />
      <div className="site-grid" aria-hidden />
      <div className="accent-glow" aria-hidden />
      <div className="grain" aria-hidden />
      <AnimatePresence>{booting ? <LoadingScreen onDone={finish} /> : null}</AnimatePresence>
      {!booting ? (
        <BrowserRouter>
          <ScrollProgress />
          <CustomCursor />
          <AppRoutes />
        </BrowserRouter>
      ) : null}
    </>
  );
}
