import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Image, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const MySearch = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [formSearch, setFormSearch] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const BASE_URL_IMAGE = import.meta.env.VITE_BASE_URL_IMAGE;

  const getYear = (date) => `(${new Date(date).getFullYear()})`;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${BASE_URL}/search/movie`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          query: formSearch,
        },
      })
      .then((response) => {
        setSearchResult(response.data.results.slice(0, 6));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control
            placeholder="Search..."
            name="search"
            autoComplete="off"
            required
            value={formSearch}
            onChange={(e) => setFormSearch(e.target.value)}
            onKeyUp={handleSubmit}
          />
          <Button type="submit" variant="outline-danger">
            Search
          </Button>
        </InputGroup>
        <div className="dropdown-list bg-dark-subtle">
          {searchResult.map((item, index) => (
            <div key={index} className="py-2 border-bottom search-item">
              <Link
                to={`/movie/${item.id}`}
                className="text-decoration-none text-light"
              >
                <div className="item-list">
                  <Image
                    src={`${BASE_URL_IMAGE}${item.poster_path}`}
                    alt={item.title}
                    width={50}
                    fluid
                  />{" "}
                  {item.title}{" "}
                  <span className="fw-medium">
                    {getYear(item.release_date)}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Form>
    </>
  );
};

export default MySearch;
