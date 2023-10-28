import React, { useEffect, useState } from "react";
import MyNavbar from "../components/MyNavbar";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import ListFilm from "../components/ListFilm";
import MyPagination from "../components/MyPagination";
import MyFooter from "../components/MyFooter";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getData = () => {
    axios
      .get(`${BASE_URL}/movie/popular`, {
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
        setPopular(response.data.results);
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
          <h2 className="text-center">Popular</h2>
          {popular.map((item, index) => (
            <Col className="g-3" key={index} xs={4} md={3}>
              <ListFilm item={item} />
            </Col>
          ))}
        </Row>
        <Row className="py-4">
          <MyPagination
            data={popular}
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

export default Popular;
