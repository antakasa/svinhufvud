import React, {useEffect, useState} from 'react';
import {fetchData} from '../components/getData';
import parse from 'html-react-parser';
import './feature.css';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {getImageDetails, getCaptionText, isValidImage} from './featureHelpers';

const LazyImage = ({image, caption}) => (
  <div
    className={
      image.mode === 'vaaka'
        ? 'feature-vaaka-container'
        : 'feature-pysty-container'
    }>
    <LazyLoadImage
      alt={image.alt}
      srcSet={image.srcset}
      width={'100%'}
      height={'auto'}
      className={'feature-image'}
      effect="blur"
      src={image.src} // use normal <img> attributes as props
    />
    <span className="feature-image-caption">{caption}</span>
  </div>
);

const Feature = ({url}) => {
  const [data, setData] = useState(null);

  console.log(url);

  useEffect(() => {
    const data = fetchData(url, setData);
  }, []);

  const replaceImages = domNode => {
    if (isValidImage(domNode)) {
      const captionText = getCaptionText(domNode);
      const imageDetails = getImageDetails(domNode);
      if (captionText && imageDetails)
        return <LazyImage caption={captionText} image={imageDetails} />;
    }
  };

  return (
    <div>
      {data && (
        <>
          <div className="feature-container">
            <h1>{parse(data.title.rendered)}</h1>
            <div>
              {parse(data.content.rendered, {
                replace: replaceImages,
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Feature;
