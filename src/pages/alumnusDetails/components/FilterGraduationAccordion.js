import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Grid, Paper, Stack, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {v4 as uuid} from "uuid";

const FilterGraduationAccordion = ({ queuedFilters, setQueuedFilters }) => {
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if (!queuedFilters.graduationRange?.start) {
            setStartYear('');
        }
        if (!queuedFilters.graduationRange?.end) {
            setEndYear('');
        }
    }, [queuedFilters])

    return (
        <Accordion disableGutters elevation={0}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ m: 0, p: 0 }}
            >
                <Typography variant='subtitle'>Graduation</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0, mb: 2 }}>
                <Stack direction="row" spacing={1}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="select-start">Start Year</InputLabel>
                        <Select
                            labelId="select-start"
                            id="select-start"
                            value={startYear}
                            label="Start Year"
                            onChange={e => {
                                setEndYear('');
                                setStartYear(e.target.value);
                                setQueuedFilters((prev) => {
                                    delete prev.location;
                                    return prev;
                                })
                            }}
                        >
                            {Array.from(new Array(currentYear - 1949), (val, index) => currentYear - index).map((year) => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth size="small" disabled={startYear === ''}>
                        <InputLabel id="select-end">End Year</InputLabel>
                        <Select
                            labelId="select-end"
                            id="select-end"
                            value={endYear}
                            label="End Year"
                            onChange={e => {
                                setQueuedFilters(prev => ({
                                    ...prev,
                                    graduationRange: {
                                        id: uuid(),
                                        start: startYear,
                                        end: e.target.value,
                                    }
                                }))
                                setEndYear(e.target.value)
                            }}
                        >
                            {Array.from(new Array(currentYear - startYear), (val, index) => currentYear - index).map((year) => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

            </AccordionDetails>
        </Accordion>
    );
}

export default FilterGraduationAccordion;
