import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useLogin } from '../../hooks/useLogin';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.primary" align="center" {...props}>
            {'Copyright © '}
            <a color="inherit" href="https://www.parktudor.org/" style={{ color: '#c63527' }}>
                Park Tudor School
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isPending } = useLogin();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, password)
        login(email, password)
    };
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/7/76/Campus%2C_including_the_football_field%2C_at_Park_Tudor_School%2C_a_college_preparatory_day_school%2C_founded_in_1902_in_Indianapolis%2C_Indiana.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src='https://static.wixstatic.com/media/07993d_7024241c65d47612e9103191295260f4.jpg/v1/fit/w_2500,h_1330,al_c/07993d_7024241c65d47612e9103191295260f4.jpg' alt="pt signature" style={{ width: "8em" }} />
                    <Typography component="h1" variant="h5" sx={{ pt: 1 }}>
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoCapitalize="none"
                            sx={{ autoCapitalize: 'none' }}
                            autoFocus
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        {error &&
                            <Box
                                sx={{ pt: 1, pb: 1, color: 'error.main' }}
                            >
                                {error}
                            </Box>}
                        <LoadingButton
                            loading={isPending}
                            disabled={isPending}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            Sign In
                        </LoadingButton>
                        <Grid container>
                            {/* <Grid item xs>
                                <Link href="#" variant="body2" style={{ color: '#e91e63' }}>
                                    Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <Link to="/signup" variant="body2" style={{ color: '#c63527' }}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid >
    );
}

export default Login;
