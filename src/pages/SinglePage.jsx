import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  content: {
    flex: '1 0 auto',
  },
  card_text: {

  },
  media: {
    width: 200,
    height: 200,
    marginRight: theme.spacing(2),
  },
}));

const Item = ({ item }) => {
  const classes = useStyles();

  return (
      <Card className={classes.item}>
        <CardMedia
            className={classes.media}
            image={item.image_url}
            title={item.name}
        />
        <div className={classes.content}>
          <CardContent className={classes.card_text}>
            <Typography component="h2" variant="h5">
              {item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.content}
            </Typography>
          </CardContent>
          <NavLink to={'/'}>Назад</NavLink>
        </div>
      </Card>
  );
};

const SinglePage = () => {
  const params = useParams();
  console.log(params);

  const [item, setItem] = useState({});

  useEffect(() => {
    fetch(`https://exam.avavion.ru/api/services/${params.id}`)
        .then((response) => response.json())
        .then((data) => setItem(data.data));
  }, []);

  return <Item item={item} />;
};

export default SinglePage;