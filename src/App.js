import React, { useRef, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("research");

  // Sitelerin bilgileri
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

        // Formu mode'a göre kontrol et
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
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Multi-Site Search</h2>

      {/* Arama kutusu */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={query}
          placeholder="Search all platforms..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearchAll}>Search All</button>
      </div>

      {/* Mod seçimi */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          <input
            type="radio"
            value="research"
            checked={mode === "research"}
            onChange={() => setMode("research")}
          />
          Araştırma
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="radio"
            value="shopping"
            checked={mode === "shopping"}
            onChange={() => setMode("shopping")}
          />
          Alışveriş
        </label>
      </div>

      {/* Araştırma siteleri */}
      {mode === "research" && (
        <>
          {[
            "reddit",
            "google",
            "youtube",
            "twitter",
            "wikipedia",
            "pinterest",
            "linkedin",
            "instagram",
          ].map((site) => (
            <div
              key={site}
              onClick={() => toggleSite(site)}
              style={{
                border: sites[site].enabled
                  ? "2px solid green"
                  : "2px dashed gray",
                padding: "10px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              <h3>Search {site.charAt(0).toUpperCase() + site.slice(1)}</h3>
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
                    : ""
                }
              >
                <input
                  type="text"
                  name={site === "youtube" ? "search_query" : "q"}
                  placeholder={`Search ${site}...`}
                />
                <button type="submit">Search {site}</button>
              </form>
            </div>
          ))}
        </>
      )}

      {/* Alışveriş siteleri */}
      {mode === "shopping" && (
        <>
          {["trendyol", "hepsiburada", "n11", "amazon", "aliexpress", "temu"].map((site) => (
            <div
              key={site}
              onClick={() => toggleSite(site)}
              style={{
                border: sites[site].enabled
                  ? "2px solid green"
                  : "2px dashed gray",
                padding: "10px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              <h3>Search {site.charAt(0).toUpperCase() + site.slice(1)}</h3>
              <form
                ref={sites[site].ref}
                target="_blank"
                action={
                  site === "trendyol"
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
                <input type="text" name="q" placeholder={`Search ${site}...`} />
                <button type="submit">Search {site}</button>
              </form>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
