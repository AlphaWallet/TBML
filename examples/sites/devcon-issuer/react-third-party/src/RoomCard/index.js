import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import BookingModal from './../BookingModal';
import Typography from '@material-ui/core/Typography';
import './RoomCard.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "20px"
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({ room, applyDiscount, discountValue, tokens }) {
  const classes = useStyles();
  const { type, price, discountPrice, image, frequency } = room;
  return (
    <Card className="roomCard">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="token"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {type}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            From {price} ETH / {frequency}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <BookingModal applyDiscount={applyDiscount} tokens={tokens} roomType={type} discountValue={discountValue} price={price} />
      </CardActions>
    </Card >
  );
}