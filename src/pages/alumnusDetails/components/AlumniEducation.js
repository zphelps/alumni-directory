import React from 'react';
import {Card, CardContent, Typography, Divider, Paper, Stack} from '@mui/material';
import AlumniEducationListItem from './AlumniEducationListItem';
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {useLocation, useNavigate} from "react-router-dom";

const AlumniEducation = ({ alumnus, isEditable }) => {
    const navigate = useNavigate();
    const location = useLocation();

    alumnus.education.sort((a, b) => a.startDate < b.startDate ? 1 : -1);
    return (
        <Paper variant='outlined' sx={{ py: 2, px: 2.5, borderRadius: '8px' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                    variant="h6"
                    component="div"
                    fontWeight={600}
                    sx={{ pb: 2 }}
                >
                    Education
                </Typography>
                {isEditable && (
                    <Stack direction="column">
                        <IconButton onClick={() => navigate(`/alumni/${alumnus.id}/edit/education/`,
                            { state: { background: location } })}>
                            <AddIcon/>
                        </IconButton>
                    </Stack>
                )}
            </Stack>
            {alumnus.education.map((education, index) => (
                <div key={education.id}>
                    <AlumniEducationListItem education={education} alumnusID={alumnus.id} isEditable={isEditable} />
                    {index !== alumnus.education.length - 1 && (
                        <Divider sx={{ my: 2 }} />
                    )}
                </div>
            ))}
        </Paper>
    );
}

export default AlumniEducation;
