import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import "./slideshow.css";
import banner from "../../assets/mainPageBanner.jpeg";
import summer from "../../assets/summer.webp";
import blueberries from "../../assets/blueberries.jpeg";



export default function Slideshow (){

    const slideImages = [banner,summer,blueberries];

    return (
      <div className="slide-container">
        <Slide>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`,'backgroundSize':'100% 100%'}}>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`,'backgroundSize':'100% 100%'}}>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`,'backgroundSize':'100% 100%'}}>
            </div>
          </div>
        </Slide>
      </div>
    )
}