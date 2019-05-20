import React from "react";
import posed from 'react-pose';
import "./frontPageGrid.css"
import kk from "../images/kiehtova_kotkaniemi.png"
import perinto from "../images/perinto.png"
import tapahtumat from "../images/tapahtumat.png"
import uskomatonElama from "../images/uskomaton_elama.png"
import { Link } from "react-router-dom";
const Container = posed.div({
    open: {
        x: '0%',
        delayChildren: 200,
        staggerChildren: 50
    },
    closed: { x: '-100%', delay: 300 }
})

const ItemAnimated = posed.div({
    hoverable: true,
    hover: { scale: 1.1 },
    init: { scale: 1 },
    open: { y: 0, opacity: 1 },
    closed: { y: 20, opacity: 0 }
})

const Item = ({ src, handleImageLoad }) => <ItemAnimated>
<img onLoad={handleImageLoad} src={src} />
</ItemAnimated>

class Grid extends React.Component {
    state = { open: false, imagesLoaded: 0 }

    handleImageLoad = () => {
        if (this.state.imagesLoaded > 2) this.setState({ open: true })
        else this.setState({ imagesLoaded: this.state.imagesLoaded + 1 })

    }

    render() {
        return <Container pose={this.state.open ? "open" : "closed"} className="frontpage-grid">
    <Link className="frontpage-grid-item" to="/uskomaton-elama"><Item handleImageLoad={this.handleImageLoad} src={uskomatonElama}/></Link>
    <a href="http://www.kotkaniemi.fi" className="frontpage-grid-item"><Item handleImageLoad={this.handleImageLoad} src={kk}/></a>
    <Link className="frontpage-grid-item" to="/info"><Item handleImageLoad={this.handleImageLoad} src={perinto} /></Link>
    <Link className="frontpage-grid-item" to="/"><Item handleImageLoad={this.handleImageLoad} src={tapahtumat} /></Link>
    </Container>
    }
}

export default Grid
