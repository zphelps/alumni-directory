import React from 'react';
import { Card, CardContent, Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import EmptyProfile from '../assets/emptyProfile.png';

const AlumnusCard = ({ alumnus }) => {
    return (
        <Link to={`/alumni/${alumnus.id}`} onClick={() => sessionStorage.setItem('scrollPosition', window.pageYOffset)} style={{ textDecoration: 'none' }}>
            <Paper variant="outlined" sx={{ py: 1.5, px: 2, borderRadius: '8px' }}>
                <Box sx={{ pb: 1 }}>
                    <img
                        src={alumnus.avatarURL.includes('assets') ? EmptyProfile : alumnus.avatarURL}
                        alt="alumnus profile photo"
                        style={{ objectFit: 'cover', width: '4em', height: '4em', borderRadius: '50px' }}
                    />
                </Box>
                <Typography
                    // variant="h6"
                    component="div"
                    fontWeight={600}
                    fontSize="1.15em"
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {alumnus.firstName} {alumnus.lastName}
                </Typography>
                <Typography
                    color="secondary.light"
                    variant='subtitle2'
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {`${alumnus.tagline}`}
                </Typography>
            </Paper>
        </Link>

    );
}

export default AlumnusCard;
