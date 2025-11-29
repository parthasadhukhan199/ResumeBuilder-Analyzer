<<<<<<< HEAD
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center ">
      <nav className=" w-2/3 bg-gray-700 text-white px-5 flex gap-x-5 items-baseline justify-between">
        <div className="text-4xl font-extrabold">Resume Solution</div>

        <div className=" flex gap-x-10">
          
          <Link className=" text-white font-bold py-3 mx-3" to="about">About</Link>
        </div>
      </nav>

      <div className="w-2/3 h-[80vh] px-4 py-10 ">

      
       <h1  className=" text-4xl my-10 font-bold">Create your Professional Resume --</h1>
            <Link className="bg-blue-400 text-2xl py-2 hover:bg-blue-600 text-white px-5 mx-3 rounded-xl" to="cvbuilder">Build CV</Link>
          <h1  className=" text-4xl my-10 font-bold">Analyze your resume using NLP --</h1>

            <Link className="bg-blue-400 text-2xl py-2 hover:bg-blue-600 text-white px-5 mx-3 rounded-xl" to="cvanalyzer">Analize CV</Link>

      </div>
    </div>
  );
};

export default Landing;
=======
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center ">
      <nav className=" w-2/3 bg-gray-700 text-white px-5 flex gap-x-5 items-baseline justify-between">
        <div className="text-4xl font-extrabold">Resume Solution</div>

        <div className=" flex gap-x-10">
          
          <Link className=" text-white font-bold py-3 mx-3" to="about">About</Link>
        </div>
      </nav>

      <div className="w-2/3 h-[80vh] px-4 py-10 ">

      
       <h1  className=" text-4xl my-10 font-bold">Create your Professional Resume --</h1>
            <Link className="bg-blue-400 text-2xl py-2 hover:bg-blue-600 text-white px-5 mx-3 rounded-xl" to="cvbuilder">Build CV</Link>
          <h1  className=" text-4xl my-10 font-bold">Analyze your resume using NLP --</h1>

            <Link className="bg-blue-400 text-2xl py-2 hover:bg-blue-600 text-white px-5 mx-3 rounded-xl" to="cvanalyzer">Analize CV</Link>

      </div>
    </div>
  );
};

export default Landing;
>>>>>>> e12a0af6194ec1fccde5c37358c4afa1d2864623
