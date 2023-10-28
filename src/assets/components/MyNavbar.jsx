import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const MyNavbar = () => {
  const location = useLocation();
  const [isNavbarFixed, setNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarFixed(true);
      } else {
        setNavbarFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // <Navbar expand="md" className="bg-danger">
    //   <Container>
    //     <Navbar.Brand href="/" className="fw-semibold navbar-brand">
    //       MyMovies
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link
    //           href="/movie/now_playing"
    //           active={location.pathname.includes("/movie/now_playing")}
    //         >
    //           Now playing
    //         </Nav.Link>
    //         <Nav.Link
    //           href="/movie/popular"
    //           active={location.pathname.includes("/movie/popular")}
    //         >
    //           Popular
    //         </Nav.Link>
    //         <Nav.Link
    //           href="/movie/top_rated"
    //           active={location.pathname.includes("/movie/top_rated")}
    //         >
    //           Top rated
    //         </Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>

    <Navbar
      expand="md"
      fixed={isNavbarFixed ? "top" : ""}
      className="bg-danger bg-opacity-75 border-bottom"
    >
      <Container>
        <Navbar.Brand href="/" className="fw-semibold navbar-brand">
          MyMovies
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-md`}
          className="border-0"
        />
        <Navbar.Offcanvas
          className="bg-danger bg-opacity-75 w-75"
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand-md`}
              className="navbar-brand fs-4"
            >
              MyMovies
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start flex-grow-1 pe-3">
              <Nav.Link
                href="/movie/now_playing"
                active={location.pathname.includes("/movie/now_playing")}
              >
                Now Playing
              </Nav.Link>
              <Nav.Link
                href="/movie/popular"
                active={location.pathname.includes("/movie/popular")}
              >
                Popular
              </Nav.Link>
              <Nav.Link
                href="/movie/top_rated"
                active={location.pathname.includes("/movie/top_rated")}
              >
                Top Rated
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
