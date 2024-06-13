import { NavLink } from "react-router-dom";
import "../styles/error.css"


const Error404 =() => {
  return (
    <div className='error-404'>
    <h2 className="titre-404">404 - Page not found !</h2>
    <p className="text-404">It appears that you followed a broken link or entered a URL that does not exist on this site.</p>
    <NavLink to='/' className='lien-404' >Return to Home page </NavLink>
    </div>
  )
}
 export default Error404;