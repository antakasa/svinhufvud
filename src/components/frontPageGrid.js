import React from 'react';
import posed from 'react-pose';
import './frontPageGrid.css';
import kk from '../images/kiehtova_kotkaniemi.png';
import perinto from '../images/perinto.png';
import tapahtumat from '../images/tapahtumat.png';
import uskomatonElama from '../images/uskomaton_elama.png';
import oikeuslaitos from '../images/oikeuslaitos.png';
import pidatys from '../images/svinhufvudin_pidatys.png';
import {Link} from 'react-router-dom';
import svinhufvudLakimiehena from '../images/svinhufvud_lakimiehena.png';
import video from '../videos/etusivu.mp4';
import {Player} from 'video-react';
import '../../node_modules/video-react/dist/video-react.css';
import poster from '../videos/etusivu_poster.jpg';
const Container = posed.div({
  open: {
    x: '0%',
    delayChildren: 200,
    staggerChildren: 50,
  },
  closed: {x: '-100%', delay: 300},
});

const ItemAnimated = posed.div({
  hoverable: true,
  hover: {scale: 1.1},
  init: {scale: 1},
  open: {y: 0, opacity: 1},
  closed: {y: 20, opacity: 0},
});

const Item = ({src, handleImageLoad}) => (
  <ItemAnimated>
    <img onLoad={handleImageLoad} src={src} />
  </ItemAnimated>
);

const Content = ({handleImageLoad, frontPage, featurePage}) => {
  const linkProps = {className: 'frontpage-grid-item'};
  const itemProps = {handleImageLoad: handleImageLoad};

  const frontPageContent = (
    <>
      <Link {...linkProps} to="/">
        <Item {...itemProps} src={uskomatonElama} />
      </Link>
      <a {...linkProps} target="_blank" href="http://www.kotkaniemi.fi">
        <Item {...itemProps} src={kk} />
      </a>
      <Link {...linkProps} to="/info">
        <Item {...itemProps} src={perinto} />
      </Link>
      <Link {...linkProps} to="/feature">
        <Item {...itemProps} src={svinhufvudLakimiehena} />
      </Link>

      <div style={{marginTop: '40px', width: '100%'}}>
        <Player playsInline poster={poster} src={video} />
      </div>
    </>
  );

  const featurePageContent = (
    <>
      <Link {...linkProps} to="/feature/1135">
        <Item {...itemProps} src={oikeuslaitos} />
      </Link>
      <Link {...linkProps} to="/feature/1161">
        <Item {...itemProps} src={pidatys} />
      </Link>
    </>
  );

  return (
    <>
      {frontPage && frontPageContent}
      {featurePage && featurePageContent}
    </>
  );
};

class Grid extends React.Component {
  state = {open: false, imagesLoaded: 0};
  handleImageLoad = () => {
    if (this.state.imagesLoaded > 0) this.setState({open: true});
    else this.setState({imagesLoaded: this.state.imagesLoaded + 1});
  };

  render() {
    return (
      <>
        {!this.state.open && (
          <h3 style={{textAlign: 'center'}}>Pieni hetki. Ladataan...</h3>
        )}
        <Container
          pose={this.state.open ? 'open' : 'closed'}
          className="frontpage-grid">
          <Content
            frontPage={this.props.frontPage}
            featurePage={this.props.featurePage}
            handleImageLoad={this.handleImageLoad}
          />
        </Container>
      </>
    );
  }
}

export default Grid;
