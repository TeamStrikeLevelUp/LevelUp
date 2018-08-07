import React from "react";
import "../../styles/components/news.scss";
import "../../styles/index.scss";

class News extends React.Component {
  constructor() {
    super();

    this.state = {
      searchNews: "",
      pageNum: 1,
      currentSearch: ""
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
    this.setState(
      {
        searchNews: event.target.value
      },
      () =>
        this.setState({
          currentSearch: this.state.searchNews
        })
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ pageNum: 1 });
    this.props.searchNewsData(this.state.searchNews, 1);
    this.setState({
      searchNews: ""
    });
  }

  nextPage(direction) {

    if (this.state.currentSearch !== "") {
      if (direction === "next") {
        this.setState({ pageNum: this.state.pageNum + 1 }, () =>
          this.props.searchNewsData(this.state.currentSearch, this.state.pageNum)
        )
      } else {
        this.setState({ pageNum: this.state.pageNum - 1 }, () =>
          this.props.searchNewsData(this.state.currentSearch, this.state.pageNum)
        )
      }
    } else {
      if (direction === "next") {
        this.setState({ pageNum: this.state.pageNum + 1 }, () =>
          this.props.fetchNewsData(this.state.pageNum)
        );
      }
      else {
        this.setState({ pageNum: this.state.pageNum - 1 }, () =>
          this.props.fetchNewsData(this.state.pageNum)
        )
      }
    }
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

                  <header className="news__title">{news.title}</header>
                  <div className="news__desc">{news.description}</div>

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
          <form className="news__form"
            onSubmit={this.handleSubmit}
          >
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

          <div className="news__pages">
            {this.state.pageNum >= 2 ? (
              <a href="#" className="news__pages" onClick={event => this.nextPage("prev")}>
                🢤 Prev
              </a>
            ) : null}

            {newsDisplay !== undefined ? (

              <a href="#" className="news__pages" onClick={event => this.nextPage("next")}>
                Next 🢧
              </a>
            ) : null}
          </div>

        </div>

        <footer className="news__footer">Powered by NewsAPI.org</footer>
      </div>
    );
  }
}

export default News;
