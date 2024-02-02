import React, { Fragment } from "react";
import history from "../utils/history";


import Hero from "../components/Hero";
import Content from "../components/Content";
import {Button} from "reactstrap";

const Home = () => {

    const navigate = () =>{
        window.location.href = "/weather"
    }
    return (

        <Fragment>

            <div>Hello world</div>
            <Button onClick={navigate}>Weather</Button>
        </Fragment>
    );

}


export default Home;
