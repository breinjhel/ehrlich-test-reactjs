import React, { useState,useEffect } from "react";
import {Button, Alert, Input, Table} from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";

export const ExternalApiComponent = () => {

  const [city, setCity] = useState("")
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [weather, setWeather] = useState(null)
  const [temp, setTemp] = useState(null)

  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
  });

  const callWeatherApi = async () => {
    if(lat!=null && lon !=null){
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=3da0f373489da421c3019fcb03b6bf42`, {
        headers: {
        },
      });

      const responseData = await response.json();

      const r2 = await responseData

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US');

      r2.date = formattedDate

      setWeather(r2)
    }
  }
  useEffect( () => {

    callWeatherApi()

  }, [lat,lon])

  const callApi = async () => {
    try {
      // const token = await getAccessTokenSilently();

      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=3da0f373489da421c3019fcb03b6bf42`, {
        headers: {
        },
      });

      const responseData = await response.json();

      const r = await responseData

      if(r && r.length > 0 ){
        setLat(r[0].lat)
        setLon(r[0].lon)



        // setState({
        //   ...state,
        //   showResult: true,
        //   apiMessage: r2,
        // });
      }




    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  return (
    <>
      <div className="mb-5">


        <h1>Weather</h1>
        <p>City</p>
        <Input onChange={(e) => setCity(`${e.target.value}`)}></Input>
        <Button
          color="primary"
          className="mt-5"
          onClick={callApi}
        >
          Submit
        </Button>
      </div>

      <div className="result-block-container">
        {weather && (
            <div className="result-block" data-testid="api-result">
              <h6 className="muted">Result</h6>
            <Table>
              <thead>
              <tr>
                <th>
                  Date (mm/dd/yyyy)
                </th>
                <th>
                  Temp (F)
                </th>
                <th>
                  Description
                </th>
                <th>
                  Main
                </th>
                <th>
                  Pressure
                </th>
                <th>
                  Humidity
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  {weather.date}
                </td>
                <td>
                  {weather.main.temp}
                </td>
                <td>
                  {weather.weather[0].description}
                </td>
                <td>
                  {weather.weather[0].main}
                </td>
                <td>
                  {weather.main.pressure}
                </td>
                <td>
                  {weather.main.humidity}
                </td>
              </tr>
              </tbody>

            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default withAuthenticationRequired(ExternalApiComponent, {
  onRedirecting: () => <Loading />,
});
