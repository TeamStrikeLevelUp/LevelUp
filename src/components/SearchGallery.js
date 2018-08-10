import React from "react";
import "../../styles/components/search.scss";
import "../../styles/index.scss";

class SearchGallery extends React.Component {
  constructor() {
    super();

    this.state = {
      slideIndex: 0
    }

    this.closeGallery = this.closeGallery.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  prevSlide() {
    this.state.slideIndex - 1 === -1 ?
      this.setState({ slideIndex: this.props.game["0"].screenshot.length - 1 }) :
      this.setState({ slideIndex: this.state.slideIndex - 1 })
  }
  nextSlide() {
    this.state.slideIndex + 1 >= this.props.game["0"].screenshot.length - 1 ?
      this.setState({ slideIndex: 0 }) :
      this.setState({ slideIndex: this.state.slideIndex + 1 })
  }


  // Click handler for adding amount to order and closing popup
  closeGallery(event) {
    event.preventDefault();
    this.props.closePopup();

  }

  render() {
    const { game } = this.props;
    // console.log(game["0"].screenshot)
    // const displayImg = <img src={game["0"].screenshot[this.state.slideIndex]} width="900" />

    return (
      <div className='popup'>
        <div className='popup__inner'>
          <img src={game["0"].screenshot[this.state.slideIndex]} width="900" />
          <a className="prev" onClick={this.prevSlide}>&#10094;</a>
          <a className="next" onClick={this.nextSlide}>&#10095;</a>
          <button className="popup__button"
            onClick={this.closeGallery}
          >X
              </button>
        </div>
      </div>
    );
  }
}

export default SearchGallery;