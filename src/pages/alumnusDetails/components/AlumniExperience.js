import React from 'react';
import { Card, CardContent, Typography, Grid, Stack, Avatar, Divider, Paper } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import AlumniExperienceListItem from './AlumniExperienceListItem';

const AlumniExperience = ({ alumnus }) => {
    alumnus.experience.sort((a, b) => a.startDate < b.startDate ? 1 : -1);
    return (
        <Paper variant='outlined' sx={{ px: 2.5, py: 2, mb: 2, borderRadius: '8px' }}>
            <Typography
                variant="h6"
                component="div"
                fontWeight={600}
                sx={{ pb: 2 }}
            >
                Experience
            </Typography>
            {alumnus.experience.map((exp, index) => (
                <div key={exp.id}>
                    <AlumniExperienceListItem exp={exp} />
                    {index !== alumnus.experience.length - 1 && (
                        <Divider sx={{ my: 2 }} />
                    )}
                </div>
            ))}
        </Paper>
    );
}

export default AlumniExperience;
