import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import hero1 from "../images/bg/hero1.jpg";
import hero2 from "../images/bg/hero2.jpg";
import hero3 from "../images/bg/hero3.jpg";

const HeroCarousel = () => {
  const images = [hero1, hero2, hero3];
  return (
    <>
      <Carousel pause="hover" controls={false} interval={2000} >
        {images.map((image) => (
          <Carousel.Item key={image}>
            <Link to={`/`}>
              <Image
                src={image}
                alt={image}
                fluid
                className="shadow img-fluid"
              />
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default HeroCarousel;
