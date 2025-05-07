import "./App.css";
import Main from "./components/Main";
import { motion } from "framer-motion";
//import Cursor from "./scripts/Cursor";

function App() {
  return (
    <motion.div
      className="App w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      exit={{ opacity: 0 }}
    >
      <Main />
    </motion.div>
  );
}

export default App;
