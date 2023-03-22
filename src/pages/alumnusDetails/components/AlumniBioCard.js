import React from 'react';
import {Card, CardContent, Typography, Box, Paper, Stack} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useLocation } from 'react-router-dom';

const AlumniBioCard = ({ alumnus, isEditable }) => {
    const [expanded, setExpanded] = useState(alumnus.bio.length < 600);

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Paper variant='outlined' sx={{ pl: 2.5, pr: 1, pt: 1.5, pb: 2, mb: 2, borderRadius: '8px' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                    variant="h6"
                    component="div"
                    fontWeight={600}
                >
                    About
                </Typography>
                {isEditable && (
                    <Stack direction="column">
                        <IconButton onClick={() => navigate(`/alumni/${alumnus.id}/edit/bio`,
                            { state: { background: location } })}>
                            <EditIcon/>
                        </IconButton>
                    </Stack>
                )}
            </Stack>

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
