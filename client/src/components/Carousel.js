import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

const Carousel = ({ images, source }) => {
  return (
    <>
      {source === "local" && (
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
          data-pause="false"
          data-touch="true"
          data-interval="2000"
        >
          <ol className="carousel-indicators">
            {images.map((image, index) => (
              <li
                key={image + index}
                data-target="#carouselExampleIndicators"
                data-slide-to={index}
                className={`${index === 0 ? "active" : ""}`}
              ></li>
            ))}
          </ol>
          <div className="carousel-inner">
            {images.map((image, index) => (
              <div
                className={`carousel-item  ${index === 1 ? "active" : ""}`}
                key={image + index}
              >
                <Link to={`/`}>
                  <img
                    src={image}
                    alt="Product display"
                    className="shadow img-fluid d-block w-100"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {source === "cloudinary" && (
        <div
          id="carouselExampleIndicators"
          className="carousel slide carousel-fade"
          data-ride="carousel"
          data-pause="false"
          data-interval="2000"
          data-touch="true"
        >
          <ol className="carousel-indicators">
            {images.map((image, index) => (
              <li
                key={image + index}
                data-target="#carouselExampleIndicators"
                data-slide-to={index}
                className={`${index === 0 ? "active" : ""}`}
              ></li>
            ))}
          </ol>
          <div className="carousel-inner">
            {images.map((image, index) => (
              <div
                className={`carousel-item  ${index === 0 ? "active" : ""}`}
                key={image + index}
              >
                <Image
                  cloudName="psalmzie"
                  // src={image}
                  publicId={image}
                  alt="Product display"
                  className="img-fluid shadow-sm rounded"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
