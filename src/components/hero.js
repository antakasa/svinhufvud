import React from 'react';
import HeaderImage from "../images/header.jpg"
import HeaderPlaceHolder from "../images/header_low.jpg"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";
export default () => {
    return (
        <div style={{minHeight: "20vh"}}>
           <Link className="frontpage-grid-item" to="/" style={{cursor: "pointer"}}> <LazyLoadImage
      alt={"Svinhufvud pääkuva"}
      src={HeaderImage}
      visibleByDefault={false} 
      effect = "blur"
              placeholderSrc={HeaderPlaceHolder}
      width={"100%"} /></Link>
        </div>
    );
}
