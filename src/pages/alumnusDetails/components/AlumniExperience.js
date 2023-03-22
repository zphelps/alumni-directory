import React, {useEffect} from 'react';
import { Card, CardContent, Typography, Grid, Stack, Avatar, Divider, Paper } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import AlumniExperienceListItem from './AlumniExperienceListItem';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useLocation } from 'react-router-dom';

const AlumniExperience = ({ alumnus, isEditable }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Sort the experience by start date
        alumnus.experience.sort((a, b) => a.startDate < b.startDate ? 1 : -1);
    }, [alumnus])

    return (
        <Paper variant='outlined' sx={{ px: 2.5, py: 2, mb: 2, borderRadius: '8px' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                    variant="h6"
                    component="div"
                    fontWeight={600}
                    sx={{ pb: 2 }}
                >
                    Experience
                </Typography>
                {isEditable && (
                    <Stack direction="column">
                        <IconButton onClick={() => navigate(`/alumni/${alumnus.id}/edit/experience/`,
                            { state: { background: location } })}>
                            <AddIcon/>
                        </IconButton>
                    </Stack>
                )}
            </Stack>
            {alumnus.experience.map((exp, index) => (
                <div key={exp.id}>
                    <AlumniExperienceListItem alumnusID={alumnus.id} exp={exp} isEditable={isEditable} />
                    {index !== alumnus.experience.length - 1 && (
                        <Divider sx={{ my: 2 }} />
                    )}
                </div>
            ))}
        </Paper>
    );
}

export default AlumniExperience;
