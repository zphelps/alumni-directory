import React from 'react';
import { Card, CardContent, Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import EmptyProfile from '../../../assets/emptyProfile.png';

const AlumniInfoCard = ({ alumnus }) => {
    return (
        <Paper variant='outlined' sx={{ mb: 2, borderRadius: '8px' }}>
            <img
                src={alumnus.backgroundURL}
                alt="alumnus background photo"
                style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', objectFit: 'cover', width: '100%', height: '200px' }}
            />
            <Box sx={{ mt: -13, pl: 2.5, pb: 2.5, left: '20px', top: "175px" }}>
                <img
                    src={alumnus.avatarURL.includes('assets') ? EmptyProfile : alumnus.avatarURL}
                    alt="alumnus profile photo"
                    style={{ objectFit: 'cover', width: '8.25em', height: '8.25em', borderRadius: '500px', border: '4px solid #fff' }}
                />
                <Typography
                    variant="h5"
                    component="div"
                    fontWeight={600}
                    sx={{ pt: 1 }}
                >
                    {alumnus.firstName} {alumnus.lastName}
                </Typography>
                <Typography
                    color="#000"
                    fontWeight={300}
                    sx={{
                        pt: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {`${alumnus.tagline}`}
                </Typography>
                <Typography
                    color="secondary.light"
                    variant='body2'
                    fontWeight={300}
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {`${alumnus.state}, ${alumnus.country}`}
                </Typography>
            </Box>
        </Paper>
    );
}

export default AlumniInfoCard;
