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

const Header = () => (
  <div className="timeline-header">
    <h2 className="timeline-header__title">Pehr Evind Svinhufvud</h2>
    <h3 className="timeline-header__subtitle">Uskomaton elämä</h3>
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
    background: senaatti,
  },
  {
    year: '1917',
    month: '12',
    header: 'Itsenäisyysjulistus',
    chapter: 'pääministerinä',
    image: itsenaisyysjulistus,
    background: itsenaisyysjulistus,
  },
  {
    year: '1918',
    month: '1',
    header: 'Yö venäläisessä sotalaivassa',
    chapter: 'pääministerinä',
    image: sitaatti,
    background: sitaatti,
  },
  {
    year: '1918',
    month: '1',
    header: 'Vallankumous 26.tammikuuta',
    chapter: 'pääministerinä',
    image: tyomies,
    background: tyomies,
  },
];

const Debugger = () => <div className="timeline-debugger" />;

const Item = ({data, visible, changeVisibility, i}) => (
  <InView threshold={1}>
    {({inView, ref}) => {
      if (inView) {
        changeVisibility(i);
      }

      return (
        <div
          className={
            inView ? 'timeline-item timeline-item--active' : 'timeline-item'
          }
          data-text={''}
          ref={ref}>
          <div className="timeline__content">
            <img className="timeline__img" src={data.image.sizes.medium} />
            <h2 className="timeline__content-title">
              {data.year}/{data.month}
            </h2>
            <p className="timeline__content-desc">{data.header}</p>
          </div>
        </div>
      );
    }}
  </InView>
);

const parseData = data => {
  let dataArray = [];
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].acf);
    let {chapter, background, date, header, image, month, teksti, year} = data[
      i
    ].acf;
    if (chapter && header && year && image && month)
      dataArray.push({
        ...data[i].acf,
        background: background ? background : image,
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
      'http://www.svinhufvudinmuistosaatio.fi/wp-json/acf/v3/pages';
    const data = await fetchData(timelineDataUrl);
    this.setState({
      data: parseData(data),
    });
  }

  changeVisibility = i => this.setState({visible: i});

  render() {
    if (!this.state.data) return null;
    return (
      <div>
        <div
          className="timeline-container"
          id="timeline-1"
          style={{
            backgroundImage: !isMobile
              ? `url(${dataArray[this.state.visible].background})`
              : 'inherit',
          }}>
          <div className="timeline">
            <Header />
            {this.state.data.map((e, i) => (
              <Item
                data={e}
                key={i}
                i={i}
                changeVisibility={this.changeVisibility}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
