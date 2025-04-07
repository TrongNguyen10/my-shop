import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormControl, IconButton, Modal, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

const loginFormStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "#060d15",
  color: "#fff",
  boxShadow: 24,
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid rgba(51, 60, 77, 0.6)",

  "& .inputField": {
    fontSize: "1rem",
    width: "100%",
    height: "3rem",
    backgroundColor: "#05070a",
    borderRadius: "3px",
    color: "#fff",
    border: "1px solid rgba(51, 60, 77, 0.6)",
    p: "0 1rem",
  },
};

const LoginForm = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const handleLoginClick = (e: any) => {
    // Kiểm tra username và password
    if (username === "admin" && password === "123456") {
      alert("Đăng nhập thành công !");
    } else {
      e.preventDefault();
      alert("Username hoặc password không đúng !");
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Modal sx={{ bgcolor: "#06101c" }} open={true}>
      <Box sx={loginFormStyle}>
        <div>
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Sign in
          </Typography>
        </div>

        <FormControl
          className="inputWrap"
          variant="filled"
          fullWidth
          margin="normal"
        >
          <p style={{ margin: "0 0.3rem 1rem" }}>Username</p>
          <input
            className="inputField"
            placeholder="Username"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p style={{ margin: "1rem 0.5rem" }}>Password</p>
          <div
            style={{
              display: "flex",
              position: "relative",
              marginBottom: "1rem",
            }}
          >
            <input
              className="inputField"
              type={showPassword ? "text" : "password"}
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <IconButton
              sx={{ position: "absolute", right: 20, height: "3rem" }}
              color="primary"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </FormControl>
        <Link to="/admin" onClick={handleLoginClick}>
          <Button variant="contained" color="primary" fullWidth>
            SIGN IN
          </Button>
        </Link>
      </Box>
    </Modal>
  );
};

export default LoginForm;
