import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReadingProgressBar from "./ReadingProgressBar";
import MobileStickyCTA from "./MobileStickyCTA";
import AnnouncementTicker from "./AnnouncementTicker";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <ReadingProgressBar />
      <AnnouncementTicker />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <div className="cv-auto">
        <Footer />
      </div>
      <MobileStickyCTA />
    </div>
  );
};

export default Layout;
