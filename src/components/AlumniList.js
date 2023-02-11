import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import AlumnusCard from './AlumnusCard';

const AlumniList = ({ alumni }) => {
    return (
        <>
            {alumni.length === 0 && (
                <Typography variant="h5" align="center" color="grey" fontWeight={600} sx={{ mt: 2 }}>
                    No records found.
                </Typography>
            )}
            <Grid container spacing={1.5} sx={{ pb: 3 }} >
                {alumni && alumni.map(alumnus => (
                    <Grid item key={alumnus.id} xs={12} sm={6} md={6} lg={4}>
                        <AlumnusCard alumnus={alumnus} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default AlumniList;
