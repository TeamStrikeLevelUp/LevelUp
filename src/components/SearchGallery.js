import React from "react";
import "../../styles/components/search.scss";
import "../../styles/index.scss";

class SearchGallery extends React.Component {
  constructor() {
    super();

    this.state = {
      currentImageIndex: 0

    };

    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);

  }

  previousSlide() {
    console.log("you clicked back")
    const lastIndex = this.props.game.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

    this.setState({
      currentImageIndex: index
    });
  }

  nextSlide() {
    console.log("you clicked right")
    const lastIndex = this.props.game.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;

    this.setState({
      currentImageIndex: index
    });
  }


  render() {
    const Arrow = ({ direction, clickFunction, glyph }) => (
      <div
        className={`slide-arrow ${direction}`}
        onClick={clickFunction}>
        {glyph}
      </div>
    );

    // const ImageSlide = ({ url }) => {
    //   const styles = {
    //     backgroundImage: `url(${url})`,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center'
    //   };
    //   console.log(url)
    //   return (
    //     <div className="image-slide" style={styles}></div>
    //   );
    // }
    return (
      <div className="carousel">
        <Arrow direction="left" clickFunction={this.previousSlide} glyph="&#9664;" />

        {/* <ImageSlide url={this.props.game[this.state.currentImageIndex]} /> */}
        {/* <img src={this.props.game[this.state.currentImageIndex]} className="image-slide" /> */}

        <Arrow direction="right" clickFunction={this.nextSlide} glyph="&#9654;" />
      </div>
    );
  }
}




export default SearchGallery;
