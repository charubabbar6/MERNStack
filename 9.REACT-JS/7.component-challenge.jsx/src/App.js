import "./App.css";
import ProfileAbout from "./components/ProfileAbout";
import ProfileImage from "./components/ProfileImage";
import ProfileName from "./components/ProfileName";
import ProfileRole from "./components/ProfileRole";
import Profileicons from "./components/Profileicons";
function App() {
  return (
    <div>
      <div className="instagram-post-1">
        <div className="akar-iconstwitter-fill" />

        <section className="post-frame">
          <div className="post-frame-child" />
          <div className="rectangle-shape-parent">
            <div className="rectangle-shape" />
            <div className="wrapper-ellipse-shape">
              {/* Image component */}
              <ProfileImage image="https://cdn.pixabay.com/photo/2023/02/23/12/47/women-7808776_1280.jpg" />
            </div>
          </div>
          <div className="secondary-frame">
            <div className="title-text-parent">
              <div className="title-text">
                {/* profile name component */}
                <ProfileName name="Charu Babbar" />
                {/* profile role */}
                <ProfileRole role="MERN Stack Developer" />
              </div>
              <div className="personal-choice">
                <div className="vertical-line" />
                {/* About */}
                <ProfileAbout />
              </div>
            </div>
            <div className="brand-frame">
              {/* Social icons */}
              <Profileicons />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
