import React, { useState } from "react"
import "./App.css"
import Axios from "axios"
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom"
import FacebookLogin from "react-facebook-login"
import GoogleLogin from "react-google-login"
function App() {
  //const history = useHistory()
  async function getFacebookurl(fbuserdata) {
    const params = {
      ...fbuserdata,
      type: "SOCIAL"
    }
    try {
      const response = await Axios.post("/signup", params)
      console.log(response.data)
    } catch (e) {
      console.log("Something went wrong" + e)
    }
  }
  const [fbdata, setFbdata] = useState({})
  const responseFacebook = response => {
    setFbdata(response)
    getFacebookurl(response)
  }
  const responseGoogle = response => {
    console.log(JSON.stringify(response))
  }
  if (!process.env.REACT_APP_FB_API_ID || !process.env.REACT_APP_GOOGLE_CLIENT_ID) {
    alert("Please include .env file for your API keys")
  }
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route to="/" exact>
              <>
                <FacebookLogin appId={process.env.REACT_APP_FB_API_ID} autoLoad={false} fields="name,email,picture" callback={responseFacebook} />
                <div>Welcome</div>
                <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} buttonText="Login" onSuccess={responseGoogle} onFailure={responseGoogle} cookiePolicy={"single_host_origin"} />
              </>
            </Route>
            <Route to="/failed">
              <div>"Sorry"</div>
            </Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  )
}

export default App
