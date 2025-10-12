import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      role="contentinfo"
      className="mt-10 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
    >
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 grid gap-6 sm:grid-cols-3 items-center">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="w-10 h-10 text-purple-600"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" />
              <path d="M7 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M7 16h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-purple-600">plumdejour</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Daily logs, local-first</p>
          </div>
        </div>

        <nav aria-label="Footer navigation" className="flex justify-center">
          <ul className="flex flex-wrap gap-4 text-sm">
            <li>
              <a
                href="https://github.com/vatsark9/plumdejour"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-600 transition-colors"
              >
                Source
              </a>
            </li>
            <li>
              <a
                href="#contributing"
                className="hover:text-purple-600 transition-colors"
              >
                Contributing
              </a>
            </li>
            <li>
              <a
                href="#issues"
                className="hover:text-purple-600 transition-colors"
              >
                Report an issue
              </a>
            </li>
            <li>
              <a
                href="LICENSE"
                className="hover:text-purple-600 transition-colors"
              >
                License
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex justify-end items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="https://github.com/vatsark9/plumdejour"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open project on GitHub"
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.6 3 8.5 7.2 9.9.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.3-3.5-1.3-.5-1.2-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 1.8 0 2.3-1.5.9-3.6.6-4.5.3.3-.7.8-1.1 1.5-1.4-2.2-.2-4.5-1.1-4.5-5 0-1.1.4-2 1-2.8-.1-.3-.4-1.3.1-2.6 0 0 .9-.3 3 .9.9-.2 1.9-.3 2.9-.3 1 0 2 .1 2.9.3 2.1-1.2 3-1 3-1 .5 1.3.2 2.3.1 2.6.6.8 1 1.7 1 2.8 0 3.9-2.3 4.8-4.6 5 .8.4 1.5 1.2 1.5 2.5v3.7c0 .3.2.6.7.5 4.2-1.4 7.2-5.3 7.2-9.9C23 5.3 18.2.5 12 .5z" />
              </svg>
            </a>
            <a
              href="mailto:hello@plumdejour.app"
              aria-label="Contact via email"
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 8.5v7A2.5 2.5 0 005.5 18h13A2.5 2.5 0 0021 15.5v-7" />
                <path d="M21 6.5L12 13 3 6.5" />
              </svg>
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="text-sm px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            aria-label="Back to top"
            title="Back to top"
          >
            Back to top
          </button>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <span>© {year} plumdejour — Made with 💜 · Built with React & Vite</span>
          <span className="mt-2 sm:mt-0">Privacy: local-first · Data stored in your browser</span>
        </div>
      </div>
    </footer>
  );
}
