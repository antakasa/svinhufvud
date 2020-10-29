import React, {useEffect, useState} from 'react';
import {fetchData} from '../components/getData';
import parse from 'html-react-parser';
import './feature.css';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {
  getImageDetails,
  getCaptionText,
  isValidImage,
  WpCaption,
} from './featureHelpers';
import FrontPageGrid from '../components/frontPageGrid';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import DOMPurify from 'dompurify'

const LazyImage = ({image, caption}) => (
  <div className={image.mode}>
    <LazyLoadImage
      alt={image.alt}
      srcSet={image.srcset}
      width={'100%'}
      height={'auto'}
      className={'feature-image'}
      effect="blur"
      src={image.src} // use normal <img> attributes as props
    />
    {caption && <span className="feature-image-caption">{caption}</span>}
  </div>
);

//const Routes = ({match}) => {
//return (
//  <Router>
//<Route path="/feature/:id" component={Feature} />
//  </Router>
// );
//};

export const Feature = ({match}) => {
  const [data, setData] = useState(null);

  const id = match.params.id;

  const url =
    '//www.svinhufvudinmuistosaatio.fi/wp-json/wp/v2/pages/' + id;
  useEffect(() => {
    const data = fetchData(url, setData);
  }, []);

  const replaceImages = domNode => {
    if (isValidImage(domNode)) {
      const captionText = WpCaption(domNode) ? getCaptionText(domNode) : false;
      const imageDetails = getImageDetails(domNode);
      if (imageDetails)
        return <LazyImage caption={captionText} image={imageDetails} />;
    }
  };
  return (
    <div>
      <div className="feature-container">
        {!data && <h3>Pieni hetki. Ladataan...</h3>}

        {data && (
          <>
            <h1>{parse(DOMPurify.sanitize(data.title.rendered))}</h1>
            <div>
              {parse(DOMPurify.sanitize(data.content.rendered.replace(/\s/g, ' ')), {
                replace: replaceImages,
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Feature;
