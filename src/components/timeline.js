import React, { Component, PureComponent } from "react";
import ScrollTrigger from "react-scroll-trigger";
import "./timeline.css";
import { InView } from "react-intersection-observer";
import senaatti from "../images/senaatti.jpg"
import itsenaisyysjulistus from "../images/itsenaisyysjulistus.jpg"
import tyomies from "../images/tyomies.jpg"
import sitaatti from "../images/sitaatti.jpg"

const Header = () =>
  <div className="timeline-header">
            <h2 className="timeline-header__title">Pehr Evind Svinhufvud</h2>
            <h3 className="timeline-header__subtitle">Uskomaton elämä</h3>
          </div>

const dataArray = [{
    time: "11/1917",
    text: "Svinhufvudin senaatti",
    chapter: "pääministerinä",
    image: senaatti,
    background: senaatti
  },
  {
    time: "12/1917",
    text: "Itsenäisyysjulistus",
    chapter: "pääministerinä",
    image: itsenaisyysjulistus,
    background: itsenaisyysjulistus
  },
  {
    time: "1/1918",
    text: "Yö venäläisessä sotalaivassa",
    chapter: "pääministerinä",
    image: sitaatti,
    background: sitaatti
  },
  {
    time: "1/1918",
    text: "Vallankumous 26.tammikuuta",
    chapter: "pääministerinä",
    image: tyomies,
    background: tyomies
  }
];

const Debugger = () => <div className="timeline-debugger"/>


const Item = ({ data, visible, changeVisibility, i }) => (
  <InView threshold={1}>
    {({ inView, ref }) => {
      if (inView) {
        changeVisibility(i);
      }

      return (
        <div
          className={
            inView ? "timeline-item timeline-item--active" : "timeline-item"
          }
          data-text={""}
          ref={ref}
        >
          <div className="timeline__content">
            <img
              className="timeline__img"
              src={data.image}
            />
            <h2 className="timeline__content-title">{data.time}</h2>
            <p className="timeline__content-desc">
{data.text}
            </p>
          </div>
        </div>
      );
    }}
  </InView>
);

class Timeline extends PureComponent {
  state = { visible: 0 };

  currentNumber = { currentNumber: 0 };

  changeVisibility = i => this.setState({ visible: i });

  render() {
    console.log(`"url(${dataArray[this.state.visible].background})"`)
    return (
      <div>
        <div
          className="timeline-container"
          id="timeline-1"
          style={{backgroundImage: `url(${dataArray[this.state.visible].background})`}}
        >
          <div className="timeline">
          <Header />
            {dataArray.map((e, i) => (
              <Item data={e} key={i} i={i} changeVisibility={this.changeVisibility} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
