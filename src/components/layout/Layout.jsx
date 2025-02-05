import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../assets/styles/pages/management.css";

function Layout({ children }) {
  const [isMini, setIsMini] = useState(false);

  const toggleSidebar = () => {
    setIsMini((prev) => !prev);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} isMini={isMini} />
      <Sidebar isMini={isMini} />
      <div id="content" className={isMini ? "show-more" : ""}>
        {children}
      </div>
    </>
  );
}

export default Layout;