import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Demo() {
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    //await: đứng đợi tới khi cái promise hoàn thành
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/all/week?api_key=a10ee5569194b352bcca20840b7f8a32&language=en-US"
    );
    console.log(response.data.results);
    setMovies(response.data.results);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "original_title",
      key: "original_title",
    },
    {
      title: "Release Date",
      dataIndex: "release_date",
      key: "release_date",
    },
  ];
  //callback
  useEffect(fetchMovies, []);
  return (
    <div>
      <Table dataSource={movies} columns={columns} />;
    </div>
  );
}

export default Demo;
