import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const SimilarMovies = ({ data }) => {
  const [slidesPerView, setSlidesPerView] = useState(1);

  const BASE_URL_IMAGE = import.meta.env.VITE_BASE_URL_IMAGE;

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setSlidesPerView(3);
    } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      setSlidesPerView(4);
    } else {
      setSlidesPerView(5);
    }
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={20}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode]}
        className="mySwiper px-2"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Link to={`/movie/${item.id}`} className="text-decoration-none">
              <Card className="border-0 rounded-0">
                <Card.Img
                  variant="top"
                  src={`${BASE_URL_IMAGE}${item.poster_path}`}
                />
                <Card.Body className="bg-dark-subtle">
                  <Card.Title>{item.title}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SimilarMovies;
