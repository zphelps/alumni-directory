import React from 'react';
import { Stack, Avatar, Typography, Divider } from '@mui/material';
import { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useLocation } from 'react-router-dom';

const AlumniExperienceListItem = ({ alumnusID, exp, isEditable }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Stack direction='row' justifyContent="space-between" key={exp.id} sx={{ px: 1 }}>
            <Stack direction="row">
                <Avatar alt="company avatar" src={exp.company.logo} sx={{ mr: 2 }} />
                <Stack direction='column'>
                    <Typography fontWeight={600}>{exp.company.name}</Typography>
                    <Typography variant='subtitle2'>{exp.jobTitle}</Typography>
                    <Typography
                        variant='subtitle2'
                        color="secondary.light"
                    >
                        {`${exp.startDate} - ${exp.endDate === null ? 'Present' : exp.endDate}`}
                    </Typography>
                    <Typography variant='body2' sx={{mt:0.75}}>{exp.description}</Typography>
                </Stack>
            </Stack>

            {isEditable && (
                <Stack direction="column">
                    <IconButton onClick={() => navigate(`/alumni/${alumnusID}/edit/experience/${exp.id}`,
                        {
                            state: { background: location }
                        })} >
                        <EditIcon/>
                    </IconButton>
                </Stack>
            )}
        </Stack>
    );
}

export default AlumniExperienceListItem;
