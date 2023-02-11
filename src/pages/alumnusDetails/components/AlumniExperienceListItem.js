import React from 'react';
import { Stack, Avatar, Typography, Divider } from '@mui/material';
import { useState } from 'react';

const AlumniExperienceListItem = ({ exp }) => {
    // const [expanded, setExpanded] = useState(exp.description.length < 250);
    return (
        <Stack direction='row' key={exp.id} sx={{ px: 1 }}>
            <Avatar alt="company avatar" src={exp.url} sx={{ mr: 2 }} />
            <Stack direction='column'>
                <Typography fontWeight={600}>{exp.companyName}</Typography>
                <Typography variant='subtitle2'>{exp.jobTitle}</Typography>
                <Typography
                    variant='subtitle2'
                    color="secondary.light"
                >
                    {`${exp.startDate} - ${exp.endDate === -1 ? 'Present' : exp.endDate}`}
                </Typography>
                {/* <Typography variant='body2' sx={{ pt: 0.75 }}>{expanded ? exp.description : exp.description.substring(0, 250).trim() + '...'}</Typography>
                {!expanded && <Typography
                    variant="body2"
                    component="span"
                    color="secondary.light"
                    sx={{ pt: 1, display: 'flex', cursor: 'pointer', justifyContent: 'end' }}
                    onClick={() => setExpanded(true)}
                >
                    ...see more
                </Typography>} */}
            </Stack>
        </Stack>
    );
}

export default AlumniExperienceListItem;
