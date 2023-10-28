import React from "react";

const MyFooter = () => {
  const socialMediaLinks = [
    {
      icon: "fa-facebook-f",
      title: "Facebook",
      link: "https://www.facebook.com/RAYHAN57/",
    },
    {
      icon: "fa-github",
      title: "GitHub",
      link: "https://github.com/rayhan57",
    },
    {
      icon: "fa-linkedin-in",
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/rayhan-lingga-buana-5054b6259/",
    },
  ];

  return (
    <div className="bg-dark-subtle mt-5 py-5">
      <footer className="text-center">
        <div className="sosmed-icon mb-2">
          {socialMediaLinks.map((socialMedia, index) => (
            <a
              key={index}
              href={socialMedia.link}
              target="_blank"
              title={socialMedia.title}
              className="text-light me-2"
            >
              <i
                className={`fa-brands ${socialMedia.icon} border rounded-circle p-2`}
              ></i>
            </a>
          ))}
        </div>
        ©️Copyright 2023. Rayhan Lingga Buana
      </footer>
    </div>
  );
};

export default MyFooter;
