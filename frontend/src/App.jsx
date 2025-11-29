
import CVAnalyzer from './pages/CVAnalyzer'
import CVBuilder from './pages/CVbuilder'

import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import About from './pages/About';

const App = () => {
  return (
    <div>

      <Routes>
        <Route path="/cvbuilder" element={<CVBuilder />} />
        <Route path="/cvanalyzer" element={<CVAnalyzer />} />
        <Route path="/about" element={<About/>} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>

    
  )
}

export default App
