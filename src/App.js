import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import IPGeolocation from "./ipGeoLocation";
import { GetSearchResult, GetTopResults } from "./newsAPI";

function App() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topResults, setTopResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const results = await GetSearchResult(IPGeolocation());
      //const results = await GetSearchResult(query);

      setArticles(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopResult = async () => {
    const countrycode = "us";
    console.log("Got Top Result");
    try {
      const result = await GetTopResults(countrycode);
      setTopResults(result);
    } catch (error) {
      console.error("Error Fetching Top Results");
    }
  };

  useEffect(() => {
    handleTopResult();
  }, []);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const renderArticles = (articleList) => {
    return articleList.map((article, index) => (
      <div key={index} className="col-md-4 mb-4">
        <Card className="card h-100">
          {article.urlToImage && (
            <Card.Img variant="top" src={article.urlToImage} alt="News Image" />
          )}
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>{article.description}</Card.Text>
            <a
              href={article.url}
              className="card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </Card.Body>
        </Card>
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>News Search App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter search query"
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="row">
        {articles.length > 0
          ? renderArticles(articles)
          : renderArticles(topResults)}
      </div>
    </div>
  );
}

export default App;
