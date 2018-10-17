let APIURL = "";

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:4000";
    break;
  case "https://fastback-mobile-client.herokuapp.com/":
    APIURL = "https://fastback-mobile-server.herokuapp.com/";
    break;
  default:
    console.log("Error in environment.js");
}

export default APIURL;
