import React from "react";
import "../../styles/components/news.scss";
import "../../styles/index.scss";
import NextNews from "NextNews";

class News extends React.Component {
  constructor() {
    super();

    this.state = {
      searchNews: "",
      pageNum: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    if (this.props.fetchNewsData !== undefined) {
      this.props.fetchNewsData(this.state.pageNum);
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

  nextPage(event) {
    this.setState({ pageNum: this.state.pageNum + 1 }, () =>
      this.props.fetchNewsData(this.state.pageNum)
    );
  }

  render() {
    const { newsData } = this.props;

    const newsDisplay =
      newsData === "No results found"
        ? newsData
        : newsData.map((news, i) => {
            const cn = "news__result" + i;
            return (
              <div className={cn} key={news.title}>
                <li className="news__list">
                  <a href={news.url} target="blank">
                    {news.image ? (
                      <img
                        src={news.image}
                        className="news__img"
                        alt={news.title}
                      />
                    ) : null}
                    {/* <div className="news__title"> */}
                    <header className="news__title">{news.title}</header>
                    <div className="news__desc">{news.description}</div>
                    {/* <p className="news__author"></p> */}
                    <p className="news__date">
                      {news.date}🕔 | {news.author}
                    </p>
                  </a>
                </li>
              </div>
            );
          });

    return (
      <div className="news__body">
        <div className="news">
          <form className="news__form" onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              type="search"
              results="0"
              alt="Search"
              className="news__input"
              autoComplete="off"
              value={this.state.searchNews}
              placeholder="Search news"
            />
          </form>

          <ul className="news__wrapper">{newsDisplay}</ul>

          {newsDisplay !== undefined ? (
            <NextNews />
          ) : //   <a href="#" onClick={event => this.nextPage(event)}>
          //     Next >>
          //   </a>
          //
          null}
        </div>

        <footer className="news__footer">Powered by NewsAPI.org</footer>
      </div>
    );
  }
}

export default News;
