import Header from "./customComponents/header";
import Content from "./customComponents/content";

function App() {
  return (
    <div className="h-screen w-full bg-gray-200 overflow-y-auto">
      <Header />
      <Content />
    </div>
  );
}

export default App;
