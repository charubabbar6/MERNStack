import Userprofile from "./components/UserProfile";
const App = () => {
  return (
    <div>
      {/* call/render the component */}
      <Userprofile
        name="Charu Babbar"
        email="charubabbar6@gmail.com"
        location="Ireland"
        about="I am java developer."
      />
      <Userprofile
        name="Arjun Chanana"
        email="aj@gmail.com"
        location="USA"
        about="I am baby."
      />
      <Userprofile
        name="Sushant Chanana"
        email="sc@gmail.com"
        location="Singapore"
        about="I am a Engineer."
      />
    </div>
  );
};
export default App;
