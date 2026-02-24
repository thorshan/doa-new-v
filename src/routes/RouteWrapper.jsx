import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Processing from "../ui/loaders/Processing";

const RouteWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <Processing />}
      
      <div 
        className={`transition-opacity duration-700 ease-in-out ${
          loading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default RouteWrapper;