import React from "react";
import { Image } from "react-bootstrap";

const ActorMovies = ({ actors, howMany }) => {
  const BASE_URL_IMAGE = import.meta.env.VITE_BASE_URL_IMAGE;

  return (
    <div className="mt-3 d-flex align-items-center justify-content-between">
      {actors.splice(0, howMany).map((actor, index) => (
        <div key={index} className="me-1">
          <Image
            src={`${BASE_URL_IMAGE}${actor.profile_path}`}
            alt={actor.name}
            width={60}
            className="mb-2"
            roundedCircle
          />
          <br />
          <span>{actor.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ActorMovies;
