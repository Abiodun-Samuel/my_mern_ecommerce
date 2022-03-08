import loader from "../images/icon/loading.svg";

const Loader = ({ smallPage, fullPage, imgHeight }) => {
  return (
    <>
      {fullPage && (
        <div
          className="d-flex justify-content-center align-items-center fade show"
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(255,255,255,0.4)",
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <div>
            <img
              className="img-fluid shadow"
              src={loader}
              alt="Loading..."
              style={{
                borderRadius: "50%",
                padding: "5px",
                height: imgHeight,
                width: imgHeight,
              }}
            />
          </div>
        </div>
      )}
      {smallPage && (
        <div
          className="d-flex justify-content-center align-items-center fade show"
          style={
            {
              // height: "100vh",
              // width: "100vw",
              // backgroundColor: "rgba(255,255,255,0.4)",
              // position: "absolute",
              // top: 0,
              // bottom: 0,
              // right: 0,
              // left: 0,
            }
          }
        >
          <div>
            <img
              className="img-fluid shadow"
              src={loader}
              alt="Loading..."
              style={{
                borderRadius: "50%",
                padding: "5px",
                height: imgHeight,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

Loader.defaultProps = {
  imgHeight: "",
};

export default Loader;
