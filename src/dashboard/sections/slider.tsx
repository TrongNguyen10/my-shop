
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-scroll';
import { Button, Typography } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const images = ["https://private-user-images.githubusercontent.com/83052755/380417021-b26c25bb-12e3-4f22-a961-4d71340cae18.JPG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mjk5NjI5NDIsIm5iZiI6MTcyOTk2MjY0MiwicGF0aCI6Ii84MzA1Mjc1NS8zODA0MTcwMjEtYjI2YzI1YmItMTJlMy00ZjIyLWE5NjEtNGQ3MTM0MGNhZTE4LkpQRz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMjYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDI2VDE3MTA0MlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTUzNDgyNTc0ZDFiYTA5YzVkY2E5M2RiZWM5OWIwNTY0ZTMzZjkxMzc3ZTlmOTFiYTU5MWU3MTllODA2MDlhNDEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.F9eBmi7B3OJrypt2QIdPf_IoJ4FrjOnpszl46jEPFq4",
    "https://private-user-images.githubusercontent.com/83052755/380417028-601f8af7-a67d-43e7-b9e8-5f80a46b736c.JPG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mjk5NjI5NDIsIm5iZiI6MTcyOTk2MjY0MiwicGF0aCI6Ii84MzA1Mjc1NS8zODA0MTcwMjgtNjAxZjhhZjctYTY3ZC00M2U3LWI5ZTgtNWY4MGE0NmI3MzZjLkpQRz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMjYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDI2VDE3MTA0MlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTFlZDEyNjFlNmFlZWE5MjJkYmEyZjk2ZjcyNzZlYjk1Y2Y1OTVjN2FhNmViMDE2YWQ2ZTExYjhhZmJkOTYxYWEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.wW1iPA4mKTNkLPvYhwO4L2LVpcp2kW9mIZ_7BwyJ2Lg",
    "https://private-user-images.githubusercontent.com/83052755/380417026-569207c3-43d8-4ac5-baf2-71f63d9bc985.JPG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mjk5NjI5NDIsIm5iZiI6MTcyOTk2MjY0MiwicGF0aCI6Ii84MzA1Mjc1NS8zODA0MTcwMjYtNTY5MjA3YzMtNDNkOC00YWM1LWJhZjItNzFmNjNkOWJjOTg1LkpQRz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMjYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDI2VDE3MTA0MlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWM3NjMwOTVkZTZmOTlkMzdiZDJlMTVlMjNhZGUwYzQ2NjE3OTI2OTRhZDA0NzQyNDBiMDA4ZGVlMTdlZDRkMzQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.RdlLZTVa7EIqBobrM_yCAd3Bf9X1GbebJYwwJE9NsiA"]; 

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
