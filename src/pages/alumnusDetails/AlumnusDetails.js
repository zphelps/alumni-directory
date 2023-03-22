import React from 'react';
import { Container, Grid } from '@mui/material';
import {Navigate, useParams} from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import AlumniInfoCard from './components/AlumniInfoCard';
import AlumniBioCard from './components/AlumniBioCard';
import AlumniContactCard from './components/AlumniContactCard';
import AlumniExperience from './components/AlumniExperience';
import AlumniEducation from './components/AlumniEducation';
import {useAuthContext} from "../../hooks/useAuthContext";

const AlumnusDetails = ({isEditable}) => {
    const { user } = useAuthContext()
    const { id } = useParams()
    const { document: alumnus } = useDocument('alumniProfiles', id)

    if(isEditable && user.uid !== id) {
        return (
            <Navigate to="/" />
        )
    }
    return (
        <Container maxWidth='xl' sx={{ p: 1, pb: 8 }}>
            <Grid container spacing={2} sx={{ py: 0, justifyContent: 'center' }}>
                <Grid item xs={12} sm={11} md={7} lg={7} xl={7}>
                    {alumnus && <AlumniInfoCard alumnus={alumnus} isEditable={isEditable} />}
                    {alumnus && <AlumniBioCard alumnus={alumnus} isEditable={isEditable} />}
                    {alumnus && <AlumniExperience alumnus={alumnus} isEditable={isEditable} />}
                    {alumnus && <AlumniEducation alumnus={alumnus} isEditable={isEditable} />}
                </Grid>
                <Grid item xs={12} sm={11} md={5} lg={4} xl={3.5}>
                    {alumnus && <AlumniContactCard alumnus={alumnus} isEditable={isEditable} />}
                </Grid>
            </Grid>
        </Container>
    );
}

export default AlumnusDetails;
