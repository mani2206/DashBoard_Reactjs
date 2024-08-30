import Homepage from "./Components/Homepage";
import Sidebar from "./Components/Sidebar";

export default function App() {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <Homepage />
    </div>
  );
}
