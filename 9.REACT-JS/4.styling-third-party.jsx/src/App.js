const App = () => {
  //?Tail Wind css
  // return <h1 class="text-3xl font-bold underline">Hello world!</h1>;
  //?React Bootstarp
  // return (
  //   <div class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
  //     <img
  //       class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
  //       src="/lion-3372720_640.jpg"
  //       alt="Woman's Face"
  //     />
  //     <div class="text-center space-y-2 sm:text-left">
  //       <div class="space-y-0.5">
  //         <p class="text-lg text-black font-semibold">Charu Babbar</p>
  //         <p class="text-slate-500 font-medium">Product Engineer</p>
  //       </div>
  //       <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
  //         Message
  //       </button>
  //     </div>
  //   </div>
  // );
  //?Bootstarp(Either use Tail-wind or Bootstarp,can't use together at same time to avoid inconsistency)
  return (
    <div>
      <div className="alert alert-primary" role="alert">
        A simple primary alert—check it out!
      </div>
      <div className="alert alert-secondary" role="alert">
        A simple secondary alert—check it out!
      </div>
      <div className="alert alert-success" role="alert">
        A simple success alert—check it out!
      </div>
      <div className="alert alert-danger" role="alert">
        A simple danger alert—check it out!
      </div>
      <div className="alert alert-warning" role="alert">
        A simple warning alert—check it out!
      </div>
      <div className="alert alert-info" role="alert">
        A simple info alert—check it out!
      </div>
      <div className="alert alert-light" role="alert">
        A simple light alert—check it out!
      </div>
      <div className="alert alert-dark" role="alert">
        A simple dark alert—check it out!
      </div>
    </div>
  );
};
export default App;
