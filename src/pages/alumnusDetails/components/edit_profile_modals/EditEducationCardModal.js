import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Modal, Typography, Box, Paper, Stack, Divider, useTheme, FormControl, Autocomplete} from '@mui/material';
import { TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import {useDocument} from "../../../../hooks/useDocument";
import { CircularProgress } from '@mui/material';
import {useFirestore} from "../../../../hooks/useFirestore";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {v4 as uuid} from "uuid";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import universities from '../../../../universities.json';

export const EditEducationCardModal = () => {
    const [school, setSchool] = useState('');
    const [tagline, setTagline] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [currentlyAttending, setCurrentlyAttending] = useState(false);


    const { id, educationID } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const currentYear = new Date().getFullYear() + 10;

    const {document: alumnus, error, isPending} = useDocument('alumniProfiles', id);
    const {updateDocument, response} = useFirestore('alumniProfiles');

    const [schools, setSchools] = useState([]);
    const [loadingSchools, setLoadingSchools] = useState(false);
    const handleSchoolQueryChange = async (_, v, __) => {
        setLoadingSchools(true);
        if(v === '') {
            setSchools(['']);
            setLoadingSchools(false);
            return;
        }
        try {

            const filteredUniversities = universities
                .filter(
                    (university) => university.name.toLowerCase().includes(v.toLowerCase()))
                .map((university) =>
                    ({
                        name: university.name,
                        logo: `https://logo.clearbit.com/${university.domains[0]}`
                    }))
                .filter((value, index, self) => {
                    return self.findIndex((obj) => obj.name === value.name) === index;
                });
            setSchools([...filteredUniversities, ''])
        } catch (e) {
            console.error(e.toString());
            setSchools([]);
        }
        setLoadingSchools(false);
    }

    useEffect(() => {
        if(alumnus && educationID) {
            const education = alumnus.education.find(edu => edu.id === educationID)
            setSchool(education.school);
            setTagline(education.tagline);
            setStartYear(education.startDate);
            setEndYear(education.endDate ?? '');
            setCurrentlyAttending(education.endDate === null);
        }
        if(response.success) {
            navigate(-1, {replace: true});
        }
    }, [alumnus, response, educationID])

    const handleSave = e => {
        e.preventDefault();
        updateDocument(id, {
            education: educationID ? alumnus.education.map(edu => edu.id === educationID ? {
                id: educationID,
                school: school,
                tagline: tagline,
                startDate: startYear,
                endDate: currentlyAttending ? null : endYear,
            } : edu) : [...alumnus.education, {
                id: uuid(),
                school: school,
                tagline: tagline,
                startDate: startYear,
                endDate: currentlyAttending ? null : endYear,
            }]
        })
    }

    const handleDelete = () => {
        if(educationID) {
            updateDocument(id, {
                education: alumnus.education.filter(edu => edu.id !== educationID)
            })
        }
        navigate(-1, {replace: true});
    }

    return (
        <Modal
            open={true}
            onClick={() => {}}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper
                sx={{
                    backgroundColor: 'background.paper',
                    boxShadow: 5,
                    width: '100%',
                    maxWidth: 650,
                    px: 4,
                    py: 2.5,
                    borderRadius: 1,
                    outline: 'none',
                    '&:focus': {
                        outline: 'none',
                    },
                    maxHeight: '80vh',
                    overflowY: 'auto',
                }}
            >
                <Stack sx={{pb: 1}} direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="h5" fontWeight="600" sx={{ }}>{educationID ? 'Edit' : 'Add'} Education</Typography>
                    <IconButton onClick={() => navigate(-1)} sx={{m:0}}>
                        <Close />
                    </IconButton>
                </Stack>
                <Divider sx={{
                    backgroundColor: theme.palette.secondary.light,
                }}/>
                {error && <Typography variant="body1" color="error" sx={{mt: 2}}>{error}</Typography>}
                {isPending && <CircularProgress />}
                {!isPending && <Box component="form" onSubmit={handleSave}>

                    <Autocomplete
                        sx={{mt: 2}}
                        required
                        options={schools}
                        isOptionEqualToValue={(option, value) => {
                            return option.name === value.name
                        }}
                        getOptionLabel={(option) => {
                            return option?.name ?? '';
                        }}
                        onChange={(_, option) => {
                            if(option) {
                                setSchool(option);
                            }
                            else {
                                setSchool('')
                            }

                        }}
                        onInputChange={handleSchoolQueryChange}
                        loading={loadingSchools}
                        autoComplete
                        autoHighlight
                        value={school}
                        renderInput={(params) => (
                            <TextField {...params} label="School" variant="outlined" required/>
                        )}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option.name}
                            </Box>
                        )}
                    />

                    <TextField
                        label="Tagline"
                        variant="outlined"
                        fullWidth
                        required
                        value={tagline}
                        multiline
                        onChange={e => setTagline(e.target.value)}
                        sx={{mt: 2.5}}
                    />

                    <Stack direction="row" spacing={1} sx={{mt: 2.5}}>
                        <FormControl fullWidth >
                            <InputLabel id="select-start">Start Year</InputLabel>
                            <Select
                                labelId="select-start"
                                id="select-start"
                                value={startYear}
                                label="Start Year"
                                onChange={e => {
                                    setEndYear('');
                                    setStartYear(e.target.value);
                                }}
                            >
                                {Array.from(new Array(currentYear - 1949), (val, index) => currentYear - index).map((year) => (
                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth disabled={startYear === '' || currentlyAttending}>
                            <InputLabel id="select-end">End Year</InputLabel>
                            <Select
                                labelId="select-end"
                                id="select-end"
                                value={endYear}
                                label="End Year"
                                required={!currentlyAttending}
                                onChange={e => {
                                    setEndYear(e.target.value)
                                }}
                            >
                                {Array.from(new Array(currentYear - startYear), (val, index) => currentYear - index).map((year) => (
                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <FormControlLabel sx={{mb: 2}} control={
                        <Checkbox
                            checked={currentlyAttending}
                            onChange={(e) => {
                                setEndYear('')
                                setCurrentlyAttending(e.target.checked)
                            }}
                        />
                    } label="Currently Attending"/>

                    {response.error && <Typography variant="body1" color="error" sx={{mt: 2}}>{response.error}</Typography>}
                    <Stack direction="row" spacing={1} sx={{mb: 1}}>
                        {educationID && <LoadingButton
                            loading={response.isPending}
                            disabled={response.isPending}
                            onClick={() => window.confirm("Are you sure you want to delete this education?") ? handleDelete() : {}}
                            fullWidth
                            variant="outlined"
                        >
                            Delete
                        </LoadingButton>}
                        <LoadingButton
                            loading={response.isPending}
                            disabled={response.isPending}
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Save
                        </LoadingButton>
                    </Stack>

                </Box>}

            </Paper>
        </Modal>
    );
}