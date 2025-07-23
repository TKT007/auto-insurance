import { useLocation } from "react-router-dom";

const NewsHeader = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-news-red shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              INSURANCE NEWS
            </h1>
            {isHomePage && (
              <div className="hidden md:flex items-center bg-breaking-news text-white px-3 py-1 text-sm font-semibold animate-pulse">
                BREAKING
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="/" 
              className="text-white hover:text-gray-200 font-medium transition-colors"
            >
              HOME
            </a>
            <div className="w-px h-4 bg-white/30"></div>
            <span className="text-white/80 text-sm font-medium">
              LIVE COVERAGE
            </span>
          </nav>
        </div>
      </div>
      
      {/* Breaking news ticker */}
      {isHomePage && (
        <div className="bg-news-dark text-white py-2 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center">
              <span className="bg-breaking-news text-white px-2 py-1 text-xs font-bold mr-4 flex-shrink-0">
                BREAKING NEWS
              </span>
              <div className="whitespace-nowrap animate-marquee">
                New Policy Makes Auto Insurance So Cheap, Drivers Are Saving Hundreds Per Month • Revolutionary Website Cuts Insurance Costs By Up To 70%
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NewsHeader;