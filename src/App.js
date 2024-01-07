import { useEffect, useState } from "react";
import axios from 'axios';
import "./App.css";
import Search from "./Components/Search/Search";
import { ShimmerSimpleGallery } from "react-shimmer-effects";

function App() {
  const [randomDataArray, setRandomData] = useState([]);
  const [searchDataArray, setSearchData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // const body = {
    //   headers: {
    //     Authorization: `Client-ID JLG2my6265GxYGDQzPO9sPhpU5uQHQq-z4_Z6QLCuM4`,
    //   },
    // };
    const client_id = "JLG2my6265GxYGDQzPO9sPhpU5uQHQq-z4_Z6QLCuM4";
    const firstData = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos/?client_id=${client_id}&page=${page}&per_page=20`
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
    firstData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight +
          1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    });
  }, []);

  return (
    <div className="App">
      <Search setSearchData={setSearchData} />
      <div className="results">
        {randomDataArray.length !== 0 ? (
          randomDataArray.map((item) => {
            return (
              <div className="imageContainer">
                <img src={item["urls"]["regular"]} alt="" />
                <div className="imageDetails">
                  <p className="name">{item.user.first_name}</p>
                  <p className="description">{item.description}</p>
                  <p className="date">{item.created_at}</p>
                </div>
              </div>
            );
          })
        ) : (
          <ShimmerSimpleGallery card imageHeight={300} caption />
        )}
      </div>
    </div>
  );
}

export default App;
