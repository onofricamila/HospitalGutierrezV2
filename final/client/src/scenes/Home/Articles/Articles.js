import React, { Component } from "react";
import Grid from 'material-ui/Grid';
import SimpleMediaCard from '../../../components/SimpleMediaCard/SimpleMediaCard';

class Articles extends Component {
    constructor(props) {
      super(props);

      this.state = {
          loading: true
      }
    }

    render() {
        return (
            <Grid container spacing={40}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={40}>
                        {this.props.articles.map(article => (
                            <Grid key={article.id} item>
                                <SimpleMediaCard
                                    img={article.img}
                                    text={article.text}
                                    title={article.title}/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Articles;
