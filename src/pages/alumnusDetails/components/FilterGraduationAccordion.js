import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { LocalizationProvider } from '@mui/x-date-pickers'
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DatePicker } from '@mui/x-date-pickers-pro';

const FilterGraduationAccordion = ({ graduation, setGraduation }) => {
    return (
        <Accordion elevation={0} sx={{ m: 0 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ m: 0, p: 0 }}
            >
                <Typography variant='subtitle' color='secondary'>Graduation</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
                {/* <LocalizationProvider
                    dateFormats={{ dayPickerHeaderFormat: 'yyyy' }}
                    dateAdapter={AdapterDayjs}
                    localeText={{ start: 'Check-in', end: 'Check-out' }}
                >
                    <DatePicker
                        views={['year', 'year']}
                        value={graduation}
                        onChange={(graduation) => {
                            setGraduation(graduation);
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider> */}
            </AccordionDetails>
        </Accordion>
    );
}

export default FilterGraduationAccordion;
