import React, { Component, Fragment } from "react";
import Articles from "./Articles/Articles";

import config from 'react-global-configuration'

const API = 'http://localhost:3001/api/';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        articles: [
          {
            id: 1,
            img: "c4.jpeg",
          },
          {
            id: 2,
            img: "c3.jpeg",
          },
          {
            id: 3,
            img: "c6.jpeg",
          }
      ],
      fetchedArticles: false,
      configuration: config.get('config')
    };
  }

  generateArticles(data) {
      let articles = this.state.articles;
      data.forEach((elem, i) => {
          articles[i].title = elem.title;
          articles[i].text = elem.description;
      })

      this.setState({
          articles: articles,
          fetchedArticles: true
      })
  }

  getArticles() {
      fetch(API + 'Configurations/cards')
        .then(response => response.json())
        .then(data => this.generateArticles(data));
  }

  componentWillMount() {
      this.getArticles();
  }

  componentDidMount() {
    this.setState({ config: config.get('config') })
  }


  render() {
      let articlesData = this.state.articles;
      let fetchedArticles = this.state.fetchedArticles;

      if (fetchedArticles) {
          return (
            <Fragment>
              <Articles articles={articlesData}/>
            </Fragment>
          )
      }
      return(
          <div></div>
      )
  }
}

export default Home;
