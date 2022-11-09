import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import myAxios, { myPrivateAxios } from '../config/axios';
import { Navigate, useNavigate } from "react-router-dom";
//import {FaChevronLeft, FaChevronRight} from 'react-icons'


// export default class Card2 extends Component {
//   render() {
//     const settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1

//     };
//     return (
//       <div>
//         <h2> Single Item</h2>
//         <Slider {...settings}>
//           <div>
//             <h3>1</h3>
//           </div>
//           <div>
//             <h3>2</h3>
//           </div>
//           <div>
//             <h3>3</h3>
//           </div>
//           <div>
//             <h3>4</h3>
//           </div>
//           <div>
//             <h3>5</h3>
//           </div>
//           <div>
//             <h3>6</h3>
//           </div>
//         </Slider>
//       </div>
//     );
//   }
// }



// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
// import {FaChevronLeft, FaChevronRight} from 'react-icons'

export default function EventShowing() {
  const [sliderRef, setSliderRef] = useState(null)
  const [loading, setLoading] = useState(true);
  const [eventList, setEvent] = useState([]);
  const navigate =useNavigate();
  const getAllEvent = async () => {
    try {
      console.log('try');
      await myAxios({ method: 'GET', url: `/event/all` }).then((res) => {
        setEvent(res.data);
        setLoading(false);
      });
      console.log('success');
    } catch (err) {
      console.log('error');
      console.log(err.response);
    }
  };

  useEffect(() => {
    getAllEvent();
  }, []);

  console.log("listing");
  console.log(eventList);
  const settings = {
    // className: "center",
    // centerMode: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    centerPadding: "60px",
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  // const hotelCards = [
  //   {
  //     imageSrc:
  //       'https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
  //     title: 'Studio Room',
  //     description: 'Lorem ipsum dolor sit amet, consectur dolori',
  //     pricingText: 'USD 50/Day',
  //     features: ['Free Wifi', 'Free breakfast'],
  //   },
  //   {
  //     imageSrc:
  //       'https://images.unsplash.com/photo-1616940844649-535215ae4eb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  //     title: 'Deluxe Room',
  //     description: 'Lorem ipsum dolor sit amet, consectur dolori',
  //     pricingText: 'USD 80/Day',
  //     features: ['Free Wifi', 'Free breakfast'],
  //   },
  //   {
  //     imageSrc:
  //       'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
  //     title: 'King Deluxe Room',
  //     description: 'Lorem ipsum dolor sit amet, consectur dolori',
  //     pricingText: 'USD 150/Day',
  //     features: ['Free Wifi', 'Free breakfast', 'Discounted Meals'],
  //   },
  //   {
  //     imageSrc:
  //       'https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  //     title: 'Royal Suite',
  //     description: 'Lorem ipsum dolor sit amet, consectur dolori',
  //     pricingText: 'USD 299/Day',
  //     features: [
  //       'Free Wifi',
  //       'Free breakfast',
  //       'Discounted Meals',
  //       "MacBook for work use (hotel's property)",
  //     ],
  //   },
  // ]

  const getEvents = ({ card }) => {
    console.log("yoooo");
    console.log(card);
    navigate(`/events/${card.eventId}`);
  };

  return (
    <div className='content' >
      <Button onClick={sliderRef?.slickPrev}>
        Prev
      </Button>
      <Button onClick={sliderRef?.slickNext}>
        Next
      </Button>
      <div className="carousel" style={{justifyContent: 'space-between', color: "blue"}}>
        <Slider ref={setSliderRef}{...settings} >

          {eventList.map((card, index) => (
            <Box key={index}>
              <Card sx={{margin:'auto' ,width:'75%', bgcolor: '#e7e7e7'}} >
                <CardActionArea>
                  <h2>{card.eventName}</h2>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Event timmings : 
                      {card.startTime}
                      -
                      {card.endTime}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      Event happening in : 
                      {card.venueName}
                    </Typography>


                  </CardContent>

                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => { getEvents({card}); }}>More Info</Button>
                </CardActions>
              </Card>
            </Box>
          ))}

        </Slider>
      </div>
    </div>
  )
}