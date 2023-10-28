import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

const ListFilm = ({ item }) => {
  const [genres, setGenres] = useState([]);

  const BASE_URL_IMAGE = import.meta.env.VITE_BASE_URL_IMAGE;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const starIcon = <i className="fa-solid fa-star"></i>;

  const getGenre = () => {
    axios
      .get(`${BASE_URL}/movie/${item.id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        const resultGenres = response.data.genres.map((genre) => genre.name);
        setGenres(resultGenres.slice(0, 1));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getGenre();
  }, []);

  return (
    <Card style={{ height: "100%" }}>
      <Card.Img
        variant="top"
        src={`${BASE_URL_IMAGE}${item.poster_path}`}
        alt={item.title}
      />
      <Card.Body className="px-2 d-flex justify-content-between flex-column">
        <Card.Title className="cad-title">{item.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted fw-normal card-subtitle">
          {item.vote_average} {starIcon}
          <span className="float-end">{genres}</span>
        </Card.Subtitle>
        <div className="d-grid gap-2">
          <Button variant="danger" size="sm" href={`/movie/${item.id}`}>
            Look
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ListFilm;
