import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Button, Image } from "react-bootstrap";
import axios from "axios";

const SliderImages = () => {
  const [sliderImages, setSliderImages] = useState([]);

  const BASE_URL_IMAGE = import.meta.env.VITE_BASE_URL_IMAGE;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/trending/movie/day`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setSliderImages(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const dateFormat = (date) => {
    const [year, month, day] = date.split("-");

    const threeDigitMonth = new Date(
      Date.parse(`${month} 1, 2022`)
    ).toLocaleDateString("default", { month: "short" });

    return `${day} ${threeDigitMonth} ${year}`;
  };

  const truncateText = (text) => {
    const words = text.split(" ");
    let truncatedText = text;

    if (window.innerWidth <= 767) {
      truncatedText = words.slice(0, 20).join(" ");
    } else if (window.innerWidth <= 1024) {
      truncatedText = words.slice(0, 30).join(" ");
    } else {
      truncatedText = words.slice(0, 50).join(" ");
    }

    return `${truncatedText}...`;
  };

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      speed={1000}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {sliderImages.slice(0, 5).map((item, index) => (
        <SwiperSlide key={index}>
          <Image
            className="trending-image"
            src={`${BASE_URL_IMAGE}${item.backdrop_path}`}
            alt={item.title}
            fluid
          />
          <div className="slide-text">
            <h3 className="mb-0">{item.title}</h3>
            <span className="text-muted">
              Release date {dateFormat(item.release_date)}
            </span>
            <p className="mt-2">{truncateText(item.overview)}</p>
            <Button variant="danger" size="sm" href={`/movie/${item.id}`}>
              Read more
            </Button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderImages;
