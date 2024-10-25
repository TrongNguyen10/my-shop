
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-scroll';
import { Button, Typography } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const images = ["src/dashboard/assets/img1.png",
    "src/dashboard/assets/img3.png",
    "src/dashboard/assets/img2.png"]; 

const Slider: React.FC = () => {

    return (
        <div style={{ backgroundColor: '#f3f2ee', padding: '2rem 5rem' }} className="slider-container">
            <Carousel interval={3000}>
                {images.map((image, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 'auto', maxWidth: 1200 }}>
                        <div style={{ marginLeft: 100 ,maxWidth: 500 }}>
                            <Typography> <h3 style={{color: 'red', margin: 0}}>Summer collection</h3> <br />
                                <h1 style={{margin: 0}}>Save up to 50%</h1> <br />
                                <span>Quality Clothes, ELectronic and Jewelery.</span> 
                            </Typography>
                            <br />
                            <Link to="products-section" smooth={true} duration={500}>
                                <Button variant="outlined" color="error">Shop now <ArrowRightAltIcon sx={{ml: 1}}/></Button>
                            </Link>
                        </div>
                        <img style={{ height: 500 }} key={index} src={image} alt={`Slide ${index}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
