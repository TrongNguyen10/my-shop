
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Modal, Typography } from '@mui/material';
import { Close, Visibility, VisibilityOff, CheckCircle } from '@mui/icons-material';
import { useState } from 'react';

const loginFormStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "20px"
}

const LoginForm = (props: any) => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('123456');
    const [showPassword, setShowPassword] = useState(false);
    const handleLoginClick = () => {
        // Kiểm tra username và password
        if (username === 'admin' && password === '123456') {
            props.setLoggedIn(true);
        } else {
            alert('Username hoặc password không đúng.');
        }
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Box sx={loginFormStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h6'>
                        LOGIN
                    </Typography>
                    <IconButton onClick={props.onClose}>
                        <Close />
                    </IconButton>
                </div>
                <TextField
                    label="Username"
                    variant="filled"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <FormControl variant="filled" fullWidth sx={{mb: 3}} margin='normal' >
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button variant="contained" color="primary" fullWidth onClick={handleLoginClick}>
                    SIGN IN
                </Button>
                {props.loggedIn && 
                    <p style={{display: 'flex', alignItems: 'center', color: 'green'}}><CheckCircle sx={{mr: 1}}/>Đăng nhập thành công!</p>
                }
            </Box>
        </Modal>
    );
};

export default LoginForm;
