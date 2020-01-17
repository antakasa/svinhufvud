import React, {Component, PureComponent, useState} from 'react';
import 'intersection-observer';
import ScrollTrigger from 'react-scroll-trigger';
import './timeline.css';
import {InView} from 'react-intersection-observer';
import senaatti from '../images/senaatti.jpg';
import itsenaisyysjulistus from '../images/itsenaisyysjulistus.jpg';
import tyomies from '../images/tyomies.jpg';
import sitaatti from '../images/sitaatti.jpg';
import {getPosts, fetchData} from './getData';
import {isMobile} from 'react-device-detect';
import HTMLParse from 'html-react-parser';
import Loading from './loading';
import {Helmet} from 'react-helmet';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {LazyLoadImage} from 'react-lazy-load-image-component';
const SubHeader = ({text}) => (
  <section className="timeline-subheader">
    <h2>{text}</h2>
  </section>
);

const Header = () => (
  <div className="timeline-header">
    <h1 style={{marginBottom: '10px', textTransform: 'uppercase'}}>
      Pehr Evind Svinhufvudin uskomaton elämä
    </h1>
    <h3>Ingressi Tutustu Svinhufvudin uskomattomaan elämään...</h3>
  </div>
);

//const dataArray = [
//{
//time: '11/1917',
//year: '1917',
//month: '11',
//header: 'Svinhufvudin senaatti',
//chapter: 'pääministerinä',
//image: senaatti,
//bucket: 'a',
//},
//{
//year: '1917',
//month: '12',
//header: 'Itsenäisyysjulistus lorem ipsum dolor sit amet',
//chapter: 'pääministerinä',
//image: itsenaisyysjulistus,
//bucket: 'a',
//},
//{
//year: '1918',
//month: '1',
//header: 'Yö venäläisessä sotalaivassa',
//chapter: 'pääministerinä',
//image: sitaatti,
//bucket: 'b',
//},
//{
//year: '1918',
//month: '1',
//header: 'Vallankumous 26.tammikuuta',
//chapter: 'pääministerinä',
//image: tyomies,
//bucket: 'b',
//},
//];

const splitToBuckets = data =>
  data.reduce(function(buckets, item) {
    if (!buckets[item.bucket]) buckets[item.bucket] = [];
    buckets[item.bucket].push(item);
    return buckets;
  }, {});

const Item = ({data}) => {
  const [isOpen, openImage] = useState(false);
  console.log(data.image);
  return (
    <div className={'timeline-item'} data-text={''}>
      <div className="timeline__content">
        {data.image && (
          <>
            <figure>
              <LazyLoadImage
                width={'100%'}
                height={'auto'}
                alt={data.image.alt}
                className="timeline__img"
                onClick={() => openImage(true)}
                effect="blur"
                src={data.image.sizes ? data.image.sizes.thumbnail : data.image}
              />

              <figcaption>Klikkaamalla näet kuvan suurempana</figcaption>
            </figure>
            {isOpen && (
              <Lightbox
                mainSrc={
                  data.image.sizes ? data.image.sizes.medium : data.image
                }
                onCloseRequest={() => openImage(false)}
              />
            )}
          </>
        )}
        {data.show_date && data.date ? (
          <h3 style={{textAlign: 'left', margin: 0, marginTop: '10px'}}>
            {data.date + '.' + data.month + '.' + data.year}
          </h3>
        ) : (
          <h3 style={{textAlign: 'left', margin: 0, marginTop: '10px'}}>
            {data.era ? data.era : data.month + '/' + data.year}
          </h3>
        )}
        <div className="timeline__text">{HTMLParse(data.teksti)}</div>
      </div>
    </div>
  );
};

const parseData = data => {
  let dataArray = [];
  for (let i = 0; i < data.length; i++) {
    let {bucket, show_date, date, header, image, month, teksti, year} = data[
      i
    ].acf;
    if (year && month && bucket && teksti)
      dataArray.push({
        ...data[i].acf,
        date: ('0' + date).slice(-2),
      });
  }
  return dataArray.sort(compare);
};

function compare(a, b) {
  let aDateCombined = parseInt(a.year + a.month + a.date, 10);
  let bDateCombined = parseInt(b.year + b.month + b.date, 10);
  if (aDateCombined < bDateCombined) {
    return -1;
  }
  if (aDateCombined > bDateCombined) {
    return 1;
  }
  return 0;
}

const orderBuckets = bucketed => {
  function compare(a, b) {
    a = a[1][0];
    b = b[1][0];
    let aDateCombined = parseInt(a.year + a.month + a.date, 10);
    let bDateCombined = parseInt(b.year + b.month + b.date, 10);
    if (aDateCombined < bDateCombined) {
      return -1;
    }
    if (aDateCombined > bDateCombined) {
      return 1;
    }
    return 0;
  }
  const array = Object.entries(bucketed);
  console.log(array);
  return array.sort(compare);
};
class Timeline extends PureComponent {
  state = {visible: 0};

  currentNumber = {currentNumber: 0};

  async componentDidMount() {
    const timelineDataUrl =
      'http://www.svinhufvudinmuistosaatio.fi/wp-json/acf/v3/pages/?per_page=130';
    const data = await fetchData(timelineDataUrl);
    const parsed = parseData(data);
    const bucketed = splitToBuckets(parsed);
    const ordered = orderBuckets(bucketed);
    this.setState({
      data: ordered,
    });
  }

  changeVisibility = i => this.setState({visible: i});

  render() {
    if (!this.state.data) return <h3>Pieni hetki. Ladataan...</h3>;

    return (
      <div>
        <div className="timeline-container" id="timeline-1">
          <div className="timeline">
            <Helmet>
              <title>P.E. Svinhufvudin uskomaton elämä</title>

              <meta
                name="description"
                content="Aikajana Svinhufvudin värikkäästä elämästä"
              />
            </Helmet>
            <Header />
            {this.state.data.map((t, k) => {
              return (
                <>
                  <SubHeader text={t[0]} />
                  {t[1].map((e, i) => <Item data={e} key={i} i={i} />)}
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
