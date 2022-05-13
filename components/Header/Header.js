import { Carousel } from "react-bootstrap";

const Header = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/hero-bg.jpg"
          alt="First slide"
          height="500px"
        />
        <Carousel.Caption>
          <h3 className="text-primary">Learning that gets you going</h3>
          <p>Skills for your present (and your future). Get started.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/hero-bg.jpg"
          alt="First slide"
          height="500px"
        />
        <Carousel.Caption>
          <h3 className="text-primary">Unlock the power in you</h3>
          <p>Let's start learning.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Header;
