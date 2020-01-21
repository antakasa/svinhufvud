import 'moment/locale/fi';
import React, {useState, useEffect} from 'react';
import {fetchData} from '../components/getData';
import parse from 'html-react-parser';
import Moment from 'react-moment';
import {
  BrowserRouter as Router,
  useRouteMatch,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import {
  getImageDetails,
  getCaptionText,
  isValidImage,
  WpCaption,
} from './featureHelpers';
import './eventsAndSpeeches.css';
import {LazyLoadImage} from 'react-lazy-load-image-component';

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

const Categories = ({item, categories}) => {
  const array = item.categories.map(e => {
    return categories.filter(s => e === s.id)[0].name.toUpperCase();
  });
  console.log(array);
  return <b>{array.join(', ')}</b>;
};

const ListItems = () => {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState(null);

  let match = useRouteMatch();
  const tag = 14;
  const url =
    'http://www.svinhufvudinmuistosaatio.fi/wp-json/wp/v2/posts/?tags=' +
    tag +
    '&&per_page=100';
  const categoryUrl =
    'http://www.svinhufvudinmuistosaatio.fi/wp-json/wp/v2/categories';
  useEffect(() => {
    fetchData(url, setData);
    fetchData(categoryUrl, setCategories);
  }, []);

  const displayCategories = false; // put true if you want to display article categories

  return (
    <div>
      <div className="feature-container">
        {!data && <h3>Pieni hetki. Ladataan...</h3>}

        {data && (
          <>
            <h1>Esitelmät ja puheet</h1>
            {data.map((e, i) => {
              return (
                <div className="item" key={i}>
                  {categories && (
                    <small>
                      {categories &&
                        displayCategories && (
                          <Categories item={e} categories={categories} />
                        )}
                      Julkaistu:{' '}
                      <Moment format="DD.MM.YYYY" locale="fi">
                        {e.date}
                      </Moment>
                    </small>
                  )}
                  <br />
                  <Link to={`${match.path}/${e.id}`}>
                    <b>{parse(e.title.rendered)}</b>
                  </Link>{' '}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export const Feature = () => {
  const [data, setData] = useState(null);

  let match = useRouteMatch();

  useEffect(() => {
    console.log(data);
  }, data);
  const id = match.params.id;

  const url =
    'http://www.svinhufvudinmuistosaatio.fi/wp-json/wp/v2/posts/' +
    id +
    '?_embed';
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
            <h1>{parse(data.title.rendered)}</h1>
            <h3 style={{fontSize: '1.1em'}}>{parse(data.excerpt.rendered)}</h3>
            {data._embedded &&
              data._embedded['wp:featuredmedia'] &&
              data._embedded['wp:featuredmedia']['0'] && (
                <img
                  style={{width: '100%'}}
                  src={data._embedded['wp:featuredmedia']['0'].source_url}
                />
              )}
            <div>
              {parse(data.content.rendered.replace(/\s/g, ' '), {
                replace: replaceImages,
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Routes = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:id`} component={Feature} />
      <Route path={match.path} component={ListItems} />
    </Switch>
  );
};

export default Routes;
