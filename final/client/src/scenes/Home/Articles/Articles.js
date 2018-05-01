import React from 'react';
import Grid from 'material-ui/Grid';
import SimpleMediaCard from '../../../components/SimpleMediaCard/SimpleMediaCard';

const articles = props => {
  
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
  