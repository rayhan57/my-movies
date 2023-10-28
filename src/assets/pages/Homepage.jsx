import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import ListFilm from "../components/ListFilm";
import MyNavbar from "../components/MyNavbar";
import SliderImages from "../components/SliderImages";
import MySearch from "../components/MySearch";
import MyFooter from "../components/MyFooter";

const Homepage = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getData = (endpoint, setState) => {
    axios
      .get(`${BASE_URL}/movie/${endpoint}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          page: 1,
        },
      })
      .then((response) => {
        setState(response.data.results.slice(0, 12));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData("now_playing", setNowPlaying);
    getData("popular", setPopular);
    getData("top_rated", setTopRated);
    getData("upcoming", setUpcoming);
  }, []);

  const renderMovies = (movies) => {
    return movies.map((item, index) => (
      <Col className="g-3" key={index} xs={4} md={3}>
        <ListFilm item={item} />
      </Col>
    ));
  };

  return (
    <>
      <MyNavbar />
      <SliderImages />
      <Container className="mt-4">
        <Row>
          <MySearch />
        </Row>
        <Row className="mt-3">
          <h2>Now Playing</h2>
          {renderMovies(nowPlaying)}
        </Row>

        <Row className="mt-3">
          <h2>Popular</h2>
          {renderMovies(popular)}
        </Row>

        <Row className="mt-3">
          <h2>Top Rated</h2>
          {renderMovies(topRated)}
        </Row>

        <Row className="mt-3">
          <h2>Upcoming</h2>
          {renderMovies(upcoming)}
        </Row>
      </Container>
      <MyFooter />
    </>
  );
};

export default Homepage;
