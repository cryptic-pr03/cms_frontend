import Carousel from 'react-bootstrap/Carousel';

function CarouselLandingPage() {
  return (
    <Carousel  >
      <Carousel.Item interval={1000} style={{height:'600px'}}>
        <img style={{height:'600px'}}
          className="d-block w-100"
          src={process.env.PUBLIC_URL+'/static/11.jpg'}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Welcome to Concert Management System !</h3>
          <p>BROWSE SEAMLESSLY THROUGH THE CONCERT EVENTS AT VARIOUS VENUES AND BOOK TICKETS</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500} style={{height:'600px'}}>
        <img style={{height:'600px'}}
          className="d-block w-100 "
          src={process.env.PUBLIC_URL+'/static/12.jpg'}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Artist Manager</h3>
          <p>BOOK VENUES FOR VARIOUS EVENTS</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height:'600px'}}>
        <img style={{height:'600px'}}
          className="d-block w-100 "
          src={process.env.PUBLIC_URL+'/static/13.jpg'}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Venue Manager</h3>
          <p>
            ADD CONCERTS AND MANAGE THIER STAFFS
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselLandingPage;