import React from 'react';
import { Stack, Avatar, Typography, Divider } from '@mui/material';
import { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {useLocation, useNavigate} from "react-router-dom";

const AlumniEducationListItem = ({ alumnusID, education, isEditable }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Stack direction='row' key={education.id} sx={{ px: 1 }} justifyContent="space-between">
            <Stack direction='row'>
                <Avatar alt="company avatar" src={education.school.logo} sx={{ mr: 2 }} />
                <Stack direction='column'>
                    <Typography fontWeight={600}>{education.school.name}</Typography>
                    <Typography variant='subtitle2'>{education.tagline}</Typography>
                    <Typography
                        variant='subtitle2'
                        color="secondary.light"
                    >
                        {`${education.startDate} - ${education.endDate === null ? 'Present' : education.endDate}`}
                    </Typography>
                </Stack>
            </Stack>


            {isEditable && (
                <Stack direction="column">
                    <IconButton onClick={() => navigate(`/alumni/${alumnusID}/edit/education/${education.id}`,
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

export default AlumniEducationListItem;
