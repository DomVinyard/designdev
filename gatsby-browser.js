/* 
  Import the stylessheet at runtime.
*/

import "./src/styles.css"
export const onRouteUpdate = ({ location }) => {
  console.log("new pathname", location.host)
}
