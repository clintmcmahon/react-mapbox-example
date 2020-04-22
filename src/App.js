import React from 'react';
import Districts from "./Districts";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Minnesota Congressional Districts</h1>
        <h3>Data as of 2019</h3>
      </header>
      <div className="body">
        <Districts />
      </div>
      <footer>
        <a
            className="App-link"
            href="https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Data provided by the United States Census. 
          </a>
      </footer>
    </div>
  );
}

export default App;
