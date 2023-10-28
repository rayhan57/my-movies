import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SimilarMovies from "../components/SimilarMovies";
import ActorMovies from "../components/ActorMovies";
import DisplayItems from "../components/DisplayItems";
import MyFooter from "../components/MyFooter";

const DetailMovie = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const [actors, setActors] = useState([]);
  const [similar, setSimilar] = useState([]);
  const { movie_id } = useParams();

  const BASE_URL_IMAGE = import.meta.env.VITE_BASE_URL_IMAGE;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const starIcon = <i className="fa-solid fa-star"></i>;

  const roundingVote = (number) => (number ? number.toFixed(1) : "");

  const dateFormat = (date) => {
    if (date) {
      const [year, month, day] = date.split("-");
      const threeDigitMonth = new Date(
        Date.parse(`${month} 1, 2022`)
      ).toLocaleDateString("default", { month: "long" });

      return `${day} ${threeDigitMonth} ${year}`;
    }
  };

  useEffect(() => {
    axios
      .all([
        axios.get(`${BASE_URL}/movie/${movie_id}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }),
        axios.get(`${BASE_URL}/movie/${movie_id}/credits`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }),
        axios.get(`${BASE_URL}/movie/${movie_id}/similar`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }),
      ])
      .then(
        axios.spread((movieResponse, creditsResponse, similarResponse) => {
          setMovieDetail(movieResponse.data);
          setActors(creditsResponse.data.cast);
          setSimilar(similarResponse.data.results);
        })
      )
      .catch((error) => {
        console.error(error);
      });
  }, [movie_id]);

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <Image
              src={`${BASE_URL_IMAGE}${movieDetail.poster_path}`}
              alt={movieDetail.title}
              fluid
            />
          </Col>
          <Col>
            <h3 className="mb-0 mt-3">
              {movieDetail.title}{" "}
              <span className="fs-5 float-end">
                {starIcon} {roundingVote(movieDetail.vote_average)}
              </span>
            </h3>
            <span className="text-muted">
              Release date {dateFormat(movieDetail.release_date)}
            </span>
            <p className="mt-3">{movieDetail.overview}</p>
            <h4>Actors</h4>
            <ActorMovies actors={actors} howMany={5} />
            <h4 className="mt-3">Production</h4>
            <h6 className="text-muted">
              <DisplayItems
                data={movieDetail}
                property={"production_companies"}
              />
            </h6>
            <h4 className="mt-3">Genres</h4>
            <h6 className="text-muted">
              <DisplayItems data={movieDetail} property={"genres"} />
            </h6>
          </Col>
        </Row>
        <Row className="mt-4">
          <h4 className="mb-3">Similar Movies</h4>
          <SimilarMovies data={similar} />
        </Row>
      </Container>
      <MyFooter />
    </>
  );
};

export default DetailMovie;
