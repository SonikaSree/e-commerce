import banner from "../../assets/banner.jpg";
import "./home.css";
import Slideshow from "../slideshow/slideshow";
export default function Home (){
    return(<div>
        <div className="home-banner">
            <img src={banner}>
            </img>
        </div>
        <div className="trending-products">
            <h1>Trending Products</h1>
            <Slideshow/>
        </div>
    </div>)
}