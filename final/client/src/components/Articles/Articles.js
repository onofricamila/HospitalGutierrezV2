import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import SimpleMediaCard from '../SimpleMediaCard/SimpleMediaCard';

const articles = props => {

    // const articles = [...props.articles].map(article => (
    //   <Article
    //     key={article.id}
    //     title={article.title}
    //     text={article.text}
    //     icon={article.icon}
    //   />
    // ))
  
    return (
        <Grid container spacing={40}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={40}>
                    {[...props.articles].map(article => (
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
 ; 
  export default articles;
  