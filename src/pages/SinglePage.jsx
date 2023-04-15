import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gap: '35px'
    }
  },
  media: {
    height: 350,
  },

  card_text: {
    display: 'grid',
    gap: "15px"
  },
  item: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    width: 200,
    height: 200,
    marginRight: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
      marginBottom: theme.spacing(2),
      marginRight: 0,
      display: 'grid',
    },
  },
    }
));

const Item = ({ item }) => {
  const classes = useStyles();

  return (
      <>
        <Card className={classes.item}>
          <CardMedia
              className={classes.media}
              image={item.preview_image}
              title={item.tag}
              alt={item.name}
          />
          <div className={classes.content}>
            <CardContent className={classes.card_text}>
              <Typography component="h2" variant="h5">
                {item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.text}
              </Typography>
            </CardContent>
            <NavLink to={'/'}>Назад</NavLink>
          </div>
        </Card>
      </>

  );
};

// <Card sx={{ maxWidth: 345 }}>
//   <CardActionArea>
//     <CardMedia
//         component="img"
//         height="140"
//         image="/static/images/cards/contemplative-reptile.jpg"
//         alt="green iguana"
//     />
//     <CardContent>
//       <Typography gutterBottom variant="h5" component="div">
//         Lizard
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//         Lizards are a widespread group of squamate reptiles, with over 6,000
//         species, ranging across all continents except Antarctica
//       </Typography>
//     </CardContent>
//   </CardActionArea>
//   <CardActions>
//     <Button size="small" color="primary">
//       Share
//     </Button>
//   </CardActions>
// </Card>


const SinglePage = () => {
  const params = useParams();
  console.log(params);

  const [item, setItem] = useState({});

  useEffect(() => {
    fetch(`https://flowers.avavion.ru/api/products/${params.id}`)
        .then((response) => response.json())
        .then((data) => setItem(data.data));
  }, []);

  return <Item item={item} />;
};

export default SinglePage;