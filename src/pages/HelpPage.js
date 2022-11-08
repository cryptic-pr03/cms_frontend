import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import HelpDialog from './HelpDialog';

export default function HelpPage() {
  const [sliderRef, setSliderRef] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [title , setTitle] =useState("");
  const [features , setFeatures] =useState([]);

  const handleClickOpen = ({card}) => {
    console.log("open");
    setTitle(card.title);
    setFeatures(card.features);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  const roles = [
    {
      imageSrc:`${process.env.PUBLIC_URL}/static/14.jpg`,
        
      title: 'Artist Manager',
      features: [
        'Register on the website providing basic details - first name, last name, email, password, contact, gender and DOB. Choose to register as Artist Manager',
        'You have access to information about venues - location, capacity, pricing, availability reviews and seat matrix.',
        'You can set event details - event name, artists performing, duration, date, time,age limit, event logo and poster.',
        ' You can book a specific venue and perform the transactions involved.',
        'You can view the ticket-booking status of the audience once a venue is decided.'],
    },
    {
      imageSrc: `${process.env.PUBLIC_URL}/static/11.jpg`,
      title: 'Audience',
      features: [
        'Register on the website providing your credentials - first name, last name, email, password, contact, gender and DOB. Choose to register as Audience',
        'You can view the concert details - performing artists, location, date, duration, catering services at the venue, previous reviews and sponsors.',
        'You can book tickets by choosing the preferred seats available in the updated seat matrix.',
        'You can rate and write reviews the concert, artist, venue, catering service, etc.'
      ],
    },
    {
      imageSrc: `${process.env.PUBLIC_URL}/static/2.jpeg`,
      title: 'Staff',
      features: [
        'Login using the email and password provided by your recruiter.',
        'You can update your name, contact, password and bank account details in the profile page.',
        'You can view the salary details, the associated payments record and basic details of event.',
        'You have a fixed role at a particular venue.'
      ],
    },
    {
      imageSrc:
        `${process.env.PUBLIC_URL}/static/15.jpg`,
      title: 'Venue Manager',
      features: [
        'Login using the email and password provided by your recruiter.',
        'You can update your name, contact, password and bank account details in the profile page.',
        'You can decide the catering services available at a venue and recruit the staff for the same.',
        'You can access the concert details, their sponsors, transactions made by stakeholders,set the ticket price, check user reviews and their booking status.'
      ],
    },
    {
      imageSrc:
        `${process.env.PUBLIC_URL}/static/16.jpg`,
      title: 'Client-Super User',
      features: [
        'You have access to all events and venues - can add, remove and update them.',
        'You can recruit various venue managers and create their login credentials.',
      ],
    },
  ]

  return (
    <div className='content' >
      <Button onClick={sliderRef?.slickPrev} size="medium">
        Prev
      </Button>
      <Button onClick={sliderRef?.slickNext}>
        Next
      </Button>
      <div className="carousel" style={{justifyContent: 'space-between'}}>
        <Slider ref={setSliderRef}{...settings} >

          {roles.map((card, index) => (
            <Box key={index}>
              <Card sx={{margin:'auto' ,width:'75%', bgcolor: '#e7e7e7'}} >
                <CardActionArea>
                  {/* <h2>{card.title}</h2> */}
                  <CardMedia component="img" alt={card.title} image={card.imageSrc} height="250" />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {card.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={()=>{handleClickOpen({card})}}>Show More</Button>
                </CardActions>
              </Card>

            </Box>
          ))}

        </Slider>
        {open && <HelpDialog title={title} content={features} handleC={handleClose}/>}
      </div>
    </div>
  )
}