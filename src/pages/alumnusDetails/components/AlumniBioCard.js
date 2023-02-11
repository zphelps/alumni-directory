import React from 'react';
import { Card, CardContent, Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AlumniBioCard = ({ alumnus }) => {
    const [expanded, setExpanded] = useState(alumnus.bio.length < 600);

    return (
        <Paper variant='outlined' sx={{ px: 2.5, py: 2, mb: 2, borderRadius: '8px' }}>
            <Typography
                variant="h6"
                component="div"
                fontWeight={600}
            >
                About
            </Typography>
            <Typography
                variant="body2"
                component="div"
                sx={{ pt: 1 }}
            >
                {expanded ? alumnus.bio : alumnus.bio.substring(0, 600).trim() + '...'}
            </Typography>
            {!expanded && <Typography
                variant="body2"
                component="span"
                color="secondary.light"
                sx={{ pt: 1, display: 'flex', cursor: 'pointer', justifyContent: 'end' }}
                onClick={() => setExpanded(true)}
            >
                ...see more
            </Typography>}
        </Paper>
    );
}

export default AlumniBioCard;
