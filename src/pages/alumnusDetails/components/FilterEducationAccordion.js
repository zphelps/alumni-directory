import React, {useEffect, useState} from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import {v4 as uuid} from "uuid";
import universities from "../../../universities.json";

const FilterEducationAccordion = ({ queuedFilters, setQueuedFilters }) => {
    const [loading, setLoading] = useState(false);
    const [schools, setSchools] = useState([]);
    const [education, setEducation] = useState(null);

    const handleInputChange = async (event, value) => {
        setLoading(true);
        const filteredUniversities = universities
            .filter((university) => {
                    return university.name.toLowerCase().includes(value.toLowerCase())
                })
            .map((university) => university.name)
        setSchools([...Array.from(new Set(filteredUniversities)), ''])
        setLoading(false);
    };

    useEffect(() => {
        if (!queuedFilters?.education) {
            setEducation(null);
        }
    }, [queuedFilters])

    return (
        <Accordion disableGutters elevation={0} sx={{ m: 0 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ m: 0, p: 0 }}
            >
                <Typography variant='subtitle'>Education</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0, mb: 2 }}>
                <Autocomplete
                    options={schools}
                    getOptionLabel={(option) => {
                        return option
                    }}
                    onChange={(_, option) => {
                        setEducation(option);
                        if (option) {
                            setQueuedFilters((prev) => ({
                                ...prev,
                                education: {
                                    id: uuid(),
                                    name: option,
                                }
                            }))
                        } else {
                            setQueuedFilters((prev) => {
                                delete prev.education;
                                return prev;
                            })
                        }
                    }}
                    onInputChange={handleInputChange}
                    loading={loading}
                    autoComplete
                    autoHighlight
                    size="small"
                    value={education}
                    renderInput={(params) => (
                        <TextField {...params} label="Search for a university" variant="outlined" />
                    )}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option}
                        </Box>
                    )}
                />
            </AccordionDetails>
        </Accordion>

    );
}
export default FilterEducationAccordion;