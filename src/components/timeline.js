import React, {Component, PureComponent} from 'react';
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
  </div>
);

const dataArray = [
  {
    time: '11/1917',
    year: '1917',
    month: '11',
    header: 'Svinhufvudin senaatti',
    chapter: 'pääministerinä',
    image: senaatti,
    bucket: 'a',
  },
  {
    year: '1917',
    month: '12',
    header: 'Itsenäisyysjulistus lorem ipsum dolor sit amet',
    chapter: 'pääministerinä',
    image: itsenaisyysjulistus,
    bucket: 'a',
  },
  {
    year: '1918',
    month: '1',
    header: 'Yö venäläisessä sotalaivassa',
    chapter: 'pääministerinä',
    image: sitaatti,
    bucket: 'b',
  },
  {
    year: '1918',
    month: '1',
    header: 'Vallankumous 26.tammikuuta',
    chapter: 'pääministerinä',
    image: tyomies,
    bucket: 'b',
  },
];

const splitToBuckets = data =>
  data.reduce(function(buckets, item) {
    if (!buckets[item.bucket]) buckets[item.bucket] = [];
    buckets[item.bucket].push(item);
    return buckets;
  }, {});

const Item = ({data}) => (
  <div className={'timeline-item'} data-text={''}>
    <div className="timeline__content">
      {data.image && (
        <img
          className="timeline__img"
          src={data.image.sizes ? data.image.sizes.medium : data.image}
        />
      )}
      <h3 style={{textAlign: 'left', margin: 0, marginTop: '10px'}}>
        {data.year}/{data.month}
      </h3>
      <p className="timeline__desc">{data.header}</p>
      <div className="timeline__text">{HTMLParse(data.teksti)}</div>
    </div>
  </div>
);

const parseData = data => {
  let dataArray = [];
  for (let i = 0; i < data.length; i++) {
    let {bucket, date, header, image, month, teksti, year} = data[i].acf;
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

class Timeline extends PureComponent {
  state = {visible: 0};

  currentNumber = {currentNumber: 0};

  async componentDidMount() {
    const timelineDataUrl =
      'http://www.svinhufvudinmuistosaatio.fi/wp-json/acf/v3/pages/?per_page=130';
    const data = await fetchData(timelineDataUrl);
    const parsed = parseData(data);
    console.log(parsed);
    console.log(splitToBuckets(parsed));
    this.setState({
      data: splitToBuckets(parsed),
    });
  }

  changeVisibility = i => this.setState({visible: i});

  render() {
    if (!this.state.data) return null;
    return (
      <div>
        <div className="timeline-container" id="timeline-1">
          <div className="timeline">
            <Header />
            {Object.entries(this.state.data).map((t, k) => {
              return (
                <>
                  <SubHeader text={t[0]} />
                  {t[1].map((e, i) => (
                    <Item data={e} key={i} i={i} />
                  ))}
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
