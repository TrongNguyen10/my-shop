
import React from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Phone, Email, LocationOn } from '@mui/icons-material';

const contactStyle = {
    margin: '5rem auto',
    width: '100%',
    maxWidth: 1200,
    boxShadow: 'none',
}

const Contact: React.FC = () => {
    return (
        <Paper sx={contactStyle} id="contact-section">
            <div style={{ textAlign: 'center', marginBottom: 30 }}>
                <Typography variant="h5" gutterBottom>
                    CONTACT
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Send us your feedback  or questions ^^
                </Typography>
            </div>
            <Grid container spacing={2}>
                <Grid sx={{ pl: 10 }} size={{ xs: 12, sm: 6 }} >
                    <Typography sx={{ display: 'flex', alignItems: 'center', mb: 2 }} variant="body1">
                        <LocationOn sx={{ mr: 1 }} /> 123 Tran Hung Dao, District 1, HCM City
                    </Typography>
                    <Typography sx={{ display: 'flex', alignItems: 'center', mb: 2 }} variant="body1">
                        <Phone sx={{ mr: 1 }} /> Phone: 0336311117
                    </Typography>
                    <Typography sx={{ display: 'flex', alignItems: 'center', mb: 2 }} variant="body1">
                        <Email sx={{ mr: 1 }} /> Email: ndt.vn@gmail.com
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }} >
                    <div style={{ display: 'flex' }}>
                        <TextField label="Name" fullWidth />
                        <TextField label="Email" fullWidth />
                    </div>
                    <TextField sx={{mt: 1}} label="Message" multiline rows={4} fullWidth />
                    <Button sx={{ width: 80, mt: 1, float: 'right', background: '#212121', color: '#fff' }} type='submit' >
                        Send
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Contact;
