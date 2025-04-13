import React, { useRef, useState } from "react";

function App() {

  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("research");

  const [sites, setSites] = useState({
    reddit: { enabled: true, ref: useRef() },
    google: { enabled: true, ref: useRef() },
    youtube: { enabled: true, ref: useRef() },
    twitter: { enabled: true, ref: useRef() },
    trendyol: { enabled: true, ref: useRef() },
    hepsiburada: { enabled: true, ref: useRef() },
    n11: { enabled: true, ref: useRef() },
    amazon: { enabled: true, ref: useRef() },
    aliexpress: { enabled: true, ref: useRef() },
    temu: { enabled: true, ref: useRef() },
    wikipedia: { enabled: true, ref: useRef() },
    pinterest: { enabled: true, ref: useRef() },
    linkedin: { enabled: true, ref: useRef() },
    instagram: { enabled: true, ref: useRef() },
  });

  const siteIcons = {
    reddit: "fab fa-reddit",
    google: "fab fa-google",
    youtube: "fab fa-youtube",
    twitter: "fab fa-twitter",
    wikipedia: "fas fa-globe",
    pinterest: "fab fa-pinterest",
    linkedin: "fab fa-linkedin",
    instagram: "fab fa-instagram",

    trendyol: "fas fa-shopping-bag",
    hepsiburada: "fas fa-store",
    n11: "fas fa-tag",
    amazon: "fab fa-amazon",
    aliexpress: "fas fa-globe-asia",
    temu: "fas fa-box-open",
  };

  const toggleSite = (siteName) => {
    setSites((prev) => ({
      ...prev,
      [siteName]: {
        ...prev[siteName],
        enabled: !prev[siteName].enabled,
      },
    }));
  };


  const handleSearchAll = () => {
    Object.entries(sites).forEach(([name, site]) => {
      if (site.enabled) {
        const input = site.ref.current?.querySelector("input");
        if (input) input.value = query;

        const isResearch =
          name === "reddit" ||
          name === "google" ||
          name === "youtube" ||
          name === "twitter" ||
          name === "wikipedia" ||
          name === "pinterest" ||
          name === "linkedin" ||
          name === "instagram";

        const isShopping =
          name === "trendyol" ||
          name === "hepsiburada" ||
          name === "n11" ||
          name === "amazon" ||
          name === "aliexpress" ||
          name === "temu";

        if (
          (mode === "research" && isResearch) ||
          (mode === "shopping" && isShopping)
        ) {
          site.ref.current?.submit();
        }
      }
    });
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4">Multi-Site Search</h2>

      <div className="mb-3 d-flex justify-content-center gap-2">
        <input
          type="text"
          value={query}
          className="form-control w-50"
          placeholder="Search all platforms..."
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearchAll();
            }
          }}
        />
        <button className="btn btn-primary" onClick={handleSearchAll}>
          Search All
        </button>
      </div>

      <div className="btn-group mb-3" role="group">
        <input
          type="radio"
          className="btn-check"
          name="searchMode"
          id="research"
          autoComplete="off"
          checked={mode === "research"}
          onChange={() => setMode("research")}
        />
        <label className="btn btn-outline-primary" htmlFor="research">Research</label>

        <input
          type="radio"
          className="btn-check"
          name="searchMode"
          id="shopping"
          autoComplete="off"
          checked={mode === "shopping"}
          onChange={() => setMode("shopping")}
        />
        <label className="btn btn-outline-primary" htmlFor="shopping">Shopping</label>
      </div>

      <div className="row g-3 justify-content-center">
        {(mode === "research"
          ? [
            "reddit",
            "google",
            "youtube",
            "twitter",
            "wikipedia",
            "pinterest",
            "linkedin",
            "instagram",
          ]
          : [
            "trendyol",
            "hepsiburada",
            "n11",
            "amazon",
            "aliexpress",
            "temu",
          ]
        ).map((site) => (
          <div key={site} className="col-12 col-sm-6 col-md-4">
            <div
              onClick={() => toggleSite(site)}
              className={`p-3 h-100 border rounded shadow-sm ${sites[site].enabled ? "border border-4 border-primary "
                : "border border-4 border-secondary "
                }`}
              style={{
                cursor: "pointer"
              }}
            >
              <h5 className="mb-3 d-flex align-items-center justify-content-center gap-2">
                <i className={`${siteIcons[site]} fa-lg`}></i>
                {site.charAt(0).toUpperCase() + site.slice(1)}
              </h5>

              <form
                ref={sites[site].ref}
                target="_blank"
                action={
                  site === "reddit"
                    ? "https://www.reddit.com/search"
                    : site === "google"
                      ? "https://www.google.com/search"
                      : site === "youtube"
                        ? "https://www.youtube.com/results"
                        : site === "twitter"
                          ? "https://twitter.com/search"
                          : site === "wikipedia"
                            ? `https://en.wikipedia.org/wiki/Special:Search?search=${query}`
                            : site === "pinterest"
                              ? `https://www.pinterest.com/search/pins/?q=${query}`
                              : site === "linkedin"
                                ? `https://www.linkedin.com/search/results/all/?keywords=${query}`
                                : site === "instagram"
                                  ? `https://www.instagram.com/explore/tags/${query}/`
                                  : site === "trendyol"
                                    ? "https://www.trendyol.com/sr"
                                    : site === "hepsiburada"
                                      ? "https://www.hepsiburada.com/ara"
                                      : site === "n11"
                                        ? "https://www.n11.com/arama"
                                        : site === "amazon"
                                          ? `https://www.amazon.com.tr/s?k=${query}`
                                          : site === "aliexpress"
                                            ? `https://www.aliexpress.com/wholesale?SearchText=${query}`
                                            : site === "temu"
                                              ? `https://www.temu.com/search?q=${query}`
                                              : ""
                }
              >
                <input
                  className="form-control mb-2 w-75 mx-auto"
                  type="text"
                  name={site === "youtube" ? "search_query" : "q"}
                  placeholder={`Search ${site}...`}
                  defaultValue={query}
                />
                <button type="submit" className="btn btn-outline-primary w-75 mx-auto">
                  Search {site}
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
