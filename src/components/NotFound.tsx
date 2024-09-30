import '../assets/css/notFound.css'
import robot from '../assets/images/robot.webp'
const NotFound = () => {
    return (
        <div id="notFound-wrapper">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <img src={robot} alt='robot 404'></img>
        </div>
    );

}

export default NotFound;