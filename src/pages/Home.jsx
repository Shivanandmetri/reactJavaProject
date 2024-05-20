import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  const nav = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;
    if (!token) {
      nav("/");
    }
  }, []);
  return (
    <div className="home">
      {/* <marquee>
        <h1 style={{
          color:"#B213EE"
        }}>
          Well Come To <span style={{ color: "#EE1331" }}> Buffer Zero</span>
        </h1>
      </marquee> */}
      <TypeAnimation
        sequence={[
          "Welcome! ",
          2000,
          // "ಸ್ವಾಗತ",
          // 1000,
          // Same substring at the start will only be typed out once, initially
          "ಜ್ಞಾನ ದೇಗುಲವಿದು ಕೈ ಮುಗಿದು ಒಳಗೆ ಬನ್ನಿ 🙏",
          1000, // wait 1s before replacing "Mice" with "Hamsters"
          "ಮಕ್ಕಳಿಗಾಗಿ ಆಸ್ತಿ ಮಾಡಬೇಡಿ ಮಕ್ಕಳನ್ನೇ ಆಸ್ತಿಯನ್ನಾಗಿ ಮಾಡಿ.",
          1000,
          "ಹೆಣ್ಣೊಂದು ಕಲಿತರೆ ಶಾಲೆಯೊಂದು ತೆರೆದಂತೆ.",
          1000,
        ]}
        wrapper="h4"
        speed={50}
        style={{
          fontSize: "2em",
          color: "#8C20EC ",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        repeat={Infinity}
        // cursor={false}
      />
    </div>
  );
};

export default Home;
