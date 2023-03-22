import {Paper, Button, Grid} from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterLocationAccordion from './FilterLocationAccordion';
import FilterGraduationAccordion from './FilterGraduationAccordion';
import { useState } from 'react';
import FilterEducationAccordion from './FilterEducationAccordion';

const FilterCard = ({ queuedFilters, setQueuedFilters, handleApplyFilters }) => {
    const [error, setError] = useState(null);

    return (
        <Paper variant='outlined' sx={{ p: 2.5, borderRadius: '8px' }}>
            <Typography variant='h6' fontWeight={600}>Filter</Typography>
            <FilterLocationAccordion
                queuedFilters={queuedFilters}
                setQueuedFilters={setQueuedFilters}
            />
            <FilterGraduationAccordion
                queuedFilters={queuedFilters}
                setQueuedFilters={setQueuedFilters}
            />
            <FilterEducationAccordion
                queuedFilters={queuedFilters}
                setQueuedFilters={setQueuedFilters}
            />
            <Button onClick={() => setError(handleApplyFilters())} variant='contained' disableElevation sx={{ mt: 2, py: 0.5, px: 1.5, mr: 0.75 }}>Apply</Button>
            <Button onClick={() => setQueuedFilters({})} color='secondary' variant='outlined' disableElevation sx={{ mt: 2, py: 0.5, px: 1.5 }}>Clear</Button>
            {error && <Typography sx={{ pt: 2 }} color="error">{error}</Typography>}
        </Paper>
    );
}

export default FilterCard;
