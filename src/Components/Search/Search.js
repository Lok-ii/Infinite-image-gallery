import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./search.css";

const Search = (props) => {
  const [previousSeach, setPreviousSearch] = useState("");
  const [searchCount, setSeachCount] = useState(0);
  const [searchPage, setSearchPage] = useState(1);

  const searchImages = (e) => {
    e.preventDefault();
    setSeachCount((prev) => prev + 1);
    setPreviousSearch(props.searchTerm);
    props.setSearchData([]);
  };

  const getSearch = (e) => {
    props.setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${props.searchTerm}&per_page=20&page=${searchPage}`,
          {
            headers: {
              Authorization: `Client-ID JLG2my6265GxYGDQzPO9sPhpU5uQHQq-z4_Z6QLCuM4`,
            },
          }
        );

        console.log(response.data.results);
        if (props.searchTerm !== previousSeach && searchPage > 1) {
          console.log(searchPage);
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
    if (props.searchTerm !== "") {
      fetchData();
    } else {
      props.setSearchData((prev) => prev);
    }
  }, [searchCount, searchPage]);

  useEffect(()=>{
    window.addEventListener("scroll", ()=>{
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight +
          1 >=
        document.documentElement.scrollHeight && props.searchTerm !== ""
      ) {
        setSearchPage((prev) => prev + 1);
      }
    })
  }, []);

  return (
    <form className="searchForm" onSubmit={searchImages}>
      <input
        type="text"
        placeholder="Search kar na bhai..."
        id="input-field"
        value={props.searchTerm}
        onChange={getSearch}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
