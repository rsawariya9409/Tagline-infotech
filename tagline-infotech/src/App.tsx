import React, { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import Filters from './components/Filters';
import { ArrayOfFilters, IFilter, ColsFromFilters, ICols } from './helpers/ArrayOfFilters';
import Grid from './components/Grid';
import { resolve } from 'path';

interface IData {
  rows: [],
  filters: IFilter[],
  cols: [],
  filteredRows?:[]
}

const intialData: IData = { rows: [], filters: [], cols: [] }

function App() {
  const PATH = process.env.REACT_APP_API_URL;
  const [data, setData] = useState<IData>(intialData);
  const [appliedFilters, setAppliedFilters] = useState({});

  const getData = async () => {
    try {
      const response = (await axios.get(`${PATH}data`)).data;
      const filters: any = {};
      response.forEach((user: any) => {
        for (let data in user) {
          if (filters[data]) { filters[data].add(user[data]); }
          else { filters[data] = new Set([user[data]]) }
        }
      })
      setData({
        ...data,
        rows: response,
        filters: ArrayOfFilters(filters),
        cols: ColsFromFilters(filters)
      })
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleAppliedFilters = (filters: any) => {
    console.log("A-----", filters)
    setAppliedFilters(filters);
    filterResults(filters).then((filteredData:any)=>{
      // {...data, rows}
      setData({...data, filteredRows:filteredData});
    }).catch(error=>console.error(error));
  }

  useEffect(() => {
    window.addEventListener("load", getData);
    return () => {
      window.removeEventListener("load", getData);
    }
  }, [])

  const filterResults = (appliedFilters: any) => {
    return new Promise((resolve, reject) => {
      try {

        let filteredData: any[] = [...data.rows];

        for (const filter in appliedFilters) {
          const filterValue = appliedFilters[filter];

          if (filter !== "name" && filterValue.size) {
            console.log("filter", filterValue);
            filteredData = filteredData.filter((row: any) => filterValue.has(row[filter]));
            console.log("filteredData", filteredData);
          }

          if (filter === "name") {
            console.log("filter", filterValue);
            const regex = new RegExp(filterValue, "g");
            filteredData = filteredData.filter((row: any) => regex.test(row[filter]));
          }
        }

        resolve(filteredData);
      } catch (error) {
        reject(error);
      }
    })
  }

  return (
    <>
      <Filters filters={data.filters} setAppliedFilters={handleAppliedFilters} appliedFilters={appliedFilters} />

      <Grid rows={data.rows} cols={data.cols} filteredRows={data.filteredRows} loading={false} />
    </>
  );
}

export default App;
