import React, { useEffect, useState } from "react";
import MyNavbar from "../components/MyNavbar";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import ListFilm from "../components/ListFilm";
import MyPagination from "../components/MyPagination";
import MyFooter from "../components/MyFooter";

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getData = () => {
    axios
      .get(`${BASE_URL}/movie/now_playing`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          page: activePage,
        },
      })
      .then((response) => {
        setTotalPages(response.data.total_pages);
        setNowPlaying(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, [activePage]);

  return (
    <>
      <MyNavbar />
      <Container className="mt-4">
        <Row>
          <h2 className="text-center">Now Playing</h2>
          {nowPlaying.map((item, index) => (
            <Col className="g-3" key={index} xs={4} md={3}>
              <ListFilm item={item} />
            </Col>
          ))}
        </Row>
        <Row className="py-4">
          <MyPagination
            data={nowPlaying}
            activePage={activePage}
            setActivePage={setActivePage}
            totalPages={totalPages}
          />
        </Row>
      </Container>
      <MyFooter />
    </>
  );
};

export default NowPlaying;
