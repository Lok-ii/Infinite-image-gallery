import React, { useEffect, useState } from "react";
import axios from "axios";
import "./search.css";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [previousSeach, setPreviousSearch] = useState("");
  const [searchCount, setSeachCount] = useState(0);

  const searchImages = (e) => {
    e.preventDefault();
    setSeachCount((prev) => prev + 1);
    setPreviousSearch(searchTerm);
  };

  const getSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${searchTerm}`,
          {
            headers: {
              Authorization: `Client-ID JLG2my6265GxYGDQzPO9sPhpU5uQHQq-z4_Z6QLCuM4`,
            },
          }
        );

        console.log(response.data.results);
        if (searchTerm !== previousSeach) {
          props.setSearchData((prev) => {
            let newData = [...prev, ...response.data.results];
            return newData;
          });
        } else {
          props.setSearchData(response.data.results);
        }
      } catch (error) {
        console.error("le bhai tera error: ", error);
      }
    };
    if (searchTerm !== "") {
      fetchData();
    } else {
      props.setSearchData((prev) => prev);
    }
  }, [searchCount]);

  return (
    <form className="searchForm" onSubmit={searchImages}>
      <input
        type="text"
        placeholder="search kar na bhai"
        id="input-field"
        value={searchTerm}
        onChange={getSearch}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
