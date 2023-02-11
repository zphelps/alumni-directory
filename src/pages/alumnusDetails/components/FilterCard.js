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

const FilterCard = ({ queuedFilters, setQueuedFilters, handleApplyFilters }) => {
    const [error, setError] = useState(null);

    return (
        <Paper variant='outlined' sx={{ pt: 0, pb: 0, px: 2.5, borderRadius: '8px' }}>
            <Accordion expanded={true} elevation={0} disableGutters sx={{ m: 0, p: 0 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ m: 0, p: 0 }}
                >
                    <Typography variant='h6' fontWeight={600}>Filter</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pb: 2.5, px: 0, pt: 0 }}>
                    <FilterLocationAccordion
                        queuedFilters={queuedFilters}
                        setQueuedFilters={setQueuedFilters}
                    />
                    <FilterGraduationAccordion
                        setQueuedFilters={setQueuedFilters}
                    />
                    <Accordion elevation={0} sx={{ m: 0 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ m: 0, p: 0 }}
                        >
                            <Typography variant='subtitle'>Education</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Button onClick={() => setError(handleApplyFilters())} variant='contained' disableElevation sx={{ mt: 2, py: 0.5, px: 1.5, mr: 0.75 }}>Apply</Button>
                    <Button onClick={() => setQueuedFilters({})} color='secondary' variant='outlined' disableElevation sx={{ mt: 2, py: 0.5, px: 1.5 }}>Clear</Button>
                    {error && <Typography sx={{ pt: 2 }} color="error">{error}</Typography>}
                </AccordionDetails>

            </Accordion>
        </Paper>
    );
}

export default FilterCard;
