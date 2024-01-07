import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Search from "./Components/Search/Search";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { v4 as uuidv4 } from "uuid";
import ImageContainer from "./Components/ImageContainer/ImageContainer";

function App() {
  const [randomDataArray, setRandomData] = useState([]);
  const [searchDataArray, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const body = {
      headers: {
        Authorization: `Client-ID JLG2my6265GxYGDQzPO9sPhpU5uQHQq-z4_Z6QLCuM4`,
      },
    };
    const client_id = "JLG2my6265GxYGDQzPO9sPhpU5uQHQq-z4_Z6QLCuM4";
    const firstData = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos/?page=${page}&per_page=20`,
          body
        );
        console.log(res.data);
        if (page > 1) {
          setRandomData([...randomDataArray, ...res.data]);
        } else {
          setRandomData(res.data);
        }
      } catch (error) {
        console.log("le bhai tera error: ", error);
      }
    };
    if (searchTerm === "") {
      firstData();
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight +
          1 >=
          document.documentElement.scrollHeight &&
        searchTerm === ""
      ) {
        setPage((prev) => prev + 1);
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="heading">
        <h1>Infinite Image Gallery</h1>
      </div>
      <Search
        setSearchData={setSearchData}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <div className="results">
        {randomDataArray.length !== 0 && searchTerm === "" ? (
          randomDataArray.map((item) => {
            const newId = uuidv4();
            return <ImageContainer key={newId} item={item} />;
          })
        ) : searchDataArray !== 0 ? (
          searchDataArray.map((item) => {
            const newId = uuidv4();
            return <ImageContainer key={newId} item={item} />;
          })
        ) : (
          <ShimmerSimpleGallery card imageHeight={300} caption />
        )}
      </div>
    </div>
  );
}

export default App;
