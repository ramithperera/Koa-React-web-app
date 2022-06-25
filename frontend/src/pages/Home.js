import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
    return(
        <div>
            <center>
                <h1>Welcome to the Home Page</h1>
                <br/>
                <br/>
                <br/>
                <Link to="/course">
                    <button>Go to Course Page</button>
                </Link>
                &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                <Link to="/student">
                    <button>Go to Student Page</button>
                </Link>
            </center>
        </div>
    );
};

export default Home;