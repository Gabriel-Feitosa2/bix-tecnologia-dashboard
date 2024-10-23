"use client";

import { useState } from "react";

import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Container, Wrapper } from "./pageStyle";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface FormData {
  login: { error: boolean; value: string };
  password: { error: boolean; value: string };
}

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    login: { value: "", error: false },
    password: { value: "", error: false },
  });

  const router = useRouter();

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

  const submit = () => {
    if (formData.login.value !== "admin") {
      setFormData({
        ...formData,
        login: { value: formData.login.value, error: true },
      });
      return;
    }
    if (formData.password.value !== "admin") {
      setFormData({
        ...formData,
        password: { value: formData.login.value, error: true },
      });
      return;
    }
    if (
      formData.login.value === "admin" &&
      formData.password.value === "admin"
    ) {
      setLoading(true);
      redirect();
    }
  };

  const redirect = () => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <Container>
      <Wrapper>
        <h1>Login</h1>
        <TextField
          id="outlined-basic"
          name="teste"
          label="Login"
          variant="outlined"
          error={formData.login.error}
          style={{ width: 300 }}
          onChange={(e) =>
            setFormData({
              ...formData,
              login: { value: e.target.value, error: false },
            })
          }
        />

        <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            error={formData.password.error}
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
            label="Password"
            onChange={(e) =>
              setFormData({
                ...formData,
                password: { value: e.target.value, error: false },
              })
            }
          />
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          style={{ width: "6rem" }}
          onClick={() => submit()}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              style={{ width: 25, height: 25, color: "gray" }}
            />
          ) : (
            "Login"
          )}
        </Button>
      </Wrapper>
    </Container>
  );
}
