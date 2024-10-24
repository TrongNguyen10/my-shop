import React from 'react';
import { Typography, IconButton, createTheme, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Facebook, Instagram, Email, YouTube } from '@mui/icons-material';

const theme = createTheme({
    typography: {
        body2: {
            lineHeight: 2.5
        }
    }
})

const footerStyle = {
    backgroundColor: '#212121',
    color: 'white',
    height: 400,
    padding: '3rem 0',
}

const Footer: React.FC = () => {
    return (
        <div style={footerStyle}>
            <ThemeProvider theme={theme}>
                <Grid sx={{ maxWidth: 1200, m: 'auto' }} container spacing={3}>
                    <Grid size={3}>
                        <Typography variant="h6">NDT Shop</Typography>
                        <Typography variant="body2">Công ty TNHH NDT Corporation</Typography>
                        <Typography variant="body2">Mã số thuế: 12345678</Typography>
                        <img style={{ width: 150, height: 57, marginTop: 15 }} src="https://file.hstatic.net/1000281824/file/dathongbao_22c990fc936b40e0a50a1b646f478284.png" alt="" />
                    </Grid>
                    <Grid size={3}>
                        <Typography variant="h6">Liên hệ</Typography>
                        <Typography variant="body2">123 Trần Hưng Đạo, P.1, Q.1, TP.HCM</Typography>
                        <Typography variant="body2">Điện thoại: 0336311117</Typography>
                        <Typography variant="body2">Email: ndt.vn@gmail.com</Typography>
                    </Grid>
                    <Grid size={3}>
                        <Typography variant="h6">Chính sách</Typography>
                        <Typography variant="body2">Chính sách bảo mật</Typography>
                        <Typography variant="body2">Chính sách đổi trả</Typography>
                        <Typography variant="body2">Chính sách bảo hành</Typography>
                        <Typography variant="body2">Chăm sóc khách hàng</Typography>
                    </Grid>
                    <Grid size={3}>
                        <Typography variant="h6">Theo dõi chúng tôi</Typography>
                        <IconButton>
                            <Facebook sx={{ color: 'white' }} />
                        </IconButton>
                        <IconButton>
                            <Instagram sx={{ color: 'white' }} />
                        </IconButton>
                        <IconButton>
                            <Email sx={{ color: 'white' }} />
                        </IconButton>
                        <IconButton>
                            <YouTube sx={{ color: 'white' }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </ThemeProvider>
            <Typography sx={{ textAlign: 'center', mt: 15 }} variant="body2">Copyright © 2024 NDT Shop. All rights reserved.</Typography>
        </div>
    );
};

export default Footer;
