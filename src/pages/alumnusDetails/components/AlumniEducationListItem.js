import React from 'react';
import { Stack, Avatar, Typography, Divider } from '@mui/material';
import { useState } from 'react';

const AlumniEducationListItem = ({ education }) => {
    // const [expanded, setExpanded] = useState(exp.description.length < 250);
    return (
        <Stack direction='row' key={education.id} sx={{ px: 1 }}>
            <Avatar alt="company avatar" src={education.url} sx={{ mr: 2 }} />
            <Stack direction='column'>
                <Typography fontWeight={600}>{education.name}</Typography>
                <Typography variant='subtitle2'>{education.tagline}</Typography>
                <Typography
                    variant='subtitle2'
                    color="secondary.light"
                >
                    {`${education.startDate} - ${education.endDate === -1 ? 'Present' : education.endDate}`}
                </Typography>
                {/* <Typography variant='body2' sx={{ pt: 0.75 }}>{expanded ? education.description : education.description.substring(0, 250).trim() + '...'}</Typography> */}
                {/* {!expanded && <Typography
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

export default AlumniEducationListItem;
