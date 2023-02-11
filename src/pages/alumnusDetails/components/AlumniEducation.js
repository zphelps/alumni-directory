import React from 'react';
import { Card, CardContent, Typography, Divider, Paper } from '@mui/material';
import AlumniEducationListItem from './AlumniEducationListItem';

const AlumniEducation = ({ alumnus }) => {
    alumnus.education.sort((a, b) => a.startDate < b.startDate ? 1 : -1);
    return (
        <Paper variant='outlined' sx={{ py: 2, px: 2.5, borderRadius: '8px' }}>
            <Typography
                variant="h6"
                component="div"
                fontWeight={600}
                sx={{ pb: 2 }}
            >
                Education
            </Typography>
            {alumnus.education.map((education, index) => (
                <div key={education.id}>
                    <AlumniEducationListItem education={education} />
                    {index !== alumnus.education.length - 1 && (
                        <Divider sx={{ my: 2 }} />
                    )}
                </div>
            ))}
        </Paper>
    );
}

export default AlumniEducation;
