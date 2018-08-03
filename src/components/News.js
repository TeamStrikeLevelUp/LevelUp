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
    if (
      this.props.fetchNewsData !== undefined &&
      this.props.searchNewsData !== undefined
    ) {
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
    this.props.searchNewsData(this.state.searchNews);
    this.setState({
      searchNews: ""
    });
  }

  render() {
    const { newsData } = this.props;
    console.log(newsData);

    const newsDisplay =
      newsData === "No results found"
        ? newsData
        : newsData.map(news => {
            return (
              <div className="news__result" key={news.title}>
                <li>
                  <a href={news.url} target="blank">
                    <img
                      src={news.image}
                      className="news__img"
                      alt={news.title}
                    />
                    <header className="news__title">{news.title}</header>

                    <p className="news__desc">{news.description}</p>
                    <p className="news__desc">{news.author}</p>

                    <p className="news__desc">{news.date}</p>
                  </a>
                </li>
              </div>
            );
          });

    return (
      <div>
        <br />
        <form className="news__form" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="search"
            results="0"
            alt="Search"
            className="news__input"
            autoComplete="off"
            value={this.state.searchNews}
            placeholder="🔍 Search news articles"
          />
        </form>
        <br />
        <h1>Latest News</h1>
        <div className="news">
          <ul>{newsDisplay}</ul>
        </div>
      </div>
    );
  }
}

export default News;
