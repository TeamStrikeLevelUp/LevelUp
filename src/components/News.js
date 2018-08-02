import React from "react";
import "../../styles/components/news.scss";
import "../../styles/index.scss";

class News extends React.Component {
  constructor() {
    super();

    this.state = {
      searchNews: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.fetchNewsData !== undefined) {
      this.props.fetchNewsData();
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      searchNews: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.fetchNewsData("/newsApi/:" + this.state.searchNews);
    this.setState({
      searchGame: ""
    });
  }

  render() {
    const { newsData } = this.props;
    console.log(newsData);

    return (
      <div>
        <br />
        <form
          className="search__form"
          id="search__form"
          onSubmit={this.handleSubmit}
        >
          <input
            onChange={this.handleChange}
            type="search"
            results="0"
            alt="Search"
            className="search__input"
            id="search__text"
            autoComplete="off"
            value={this.state.searchNews}
            placeholder="🔍 Search"
          />
        </form>
        <br />

        {/* <ul className="search">{newsData}</ul> */}
      </div>
    );
  }
}

export default News;
