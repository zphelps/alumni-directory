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

const employmentTypes = [
    "Full-time",
    "Part-time",
    "Self-Employed",
    "Freelance",
    "Internship",
    "Contract",
    "Volunteer",
    "Seasonal",
    "Apprenticeship"
]
export const EditExperienceCardModal = () => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [type, setType] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [currentlyWorking, setCurrentlyWorking] = useState(false);
    const [description, setDescription] = useState('');

    const { id, experienceID } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const currentYear = new Date().getFullYear();

    const {document: alumnus, error, isPending} = useDocument('alumniProfiles', id);
    const {updateDocument, response} = useFirestore('alumniProfiles');

    const [companies, setCompanies] = useState([]);
    const [loadingCompanyNames, setLoadingCompanyNames] = useState(false);
    const handleCompanyQueryChange = async (_, v, __) => {
        setLoadingCompanyNames(true);
        if(v === '') {
            setCompanies(['']);
            setLoadingCompanyNames(false);
            return;
        }
        try {
            const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${v}`);
            const data = await response.json();
            const companyNames = data.map((item) => ({name: item.name, logo: item.logo}));
            setCompanies([...companyNames, '']);
        } catch (e) {
            console.error(e.toString());
            setCompanies([]);
        }
        setLoadingCompanyNames(false);
    }

    useEffect(() => {
        if(alumnus && experienceID) {
            const experience = alumnus.experience.find(exp => exp.id === experienceID)
            setTitle(experience.jobTitle);
            setCompany(experience.company);
            setType(experience.type);
            setCurrentlyWorking(experience.currentlyWorking)
            setStartYear(experience.startDate);
            setEndYear(experience.endDate ?? '');
            setDescription(experience.description ?? '');
        }
        if(response.success) {
            navigate(-1, {replace: true});
        }
    }, [alumnus, response, experienceID])

    const handleSave = e => {
        e.preventDefault();
        updateDocument(id, {
            experience: experienceID ? alumnus.experience.map(exp => exp.id === experienceID ? {
                id: experienceID,
                jobTitle: title,
                company: company,
                type,
                startDate: startYear,
                endDate: currentlyWorking ? null : endYear,
                currentlyWorking,
                description: description === '' ? null : description,
            } : exp) : [...alumnus.experience, {
                id: uuid(),
                jobTitle: title,
                company: company,
                type,
                startDate: startYear,
                endDate: currentlyWorking ? null : endYear,
                currentlyWorking,
                description: description === '' ? null : description,
            }]
        })
    }

    const handleDelete = () => {
        if(experienceID) {
            updateDocument(id, {
                experience: alumnus.experience.filter(exp => exp.id !== experienceID)
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
                    <Typography variant="h5" fontWeight="600" sx={{ }}>{experienceID ? 'Edit' : 'Add'} Experience</Typography>
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
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        sx={{mt: 3}}
                    />

                    <Autocomplete
                        sx={{mt: 2}}
                        required
                        options={companies}
                        isOptionEqualToValue={(option, value) => {
                            return option.name === value.name
                        }}
                        getOptionLabel={(option) => {
                            return option?.name ?? '';
                        }}
                        onChange={(_, option) => {
                            if(option) {
                                setCompany(option);
                            }
                            else {
                                setCompany('')
                            }

                        }}
                        onInputChange={handleCompanyQueryChange}
                        loading={loadingCompanyNames}
                        autoComplete
                        autoHighlight
                        value={company}
                        renderInput={(params) => (
                            <TextField {...params} label="Company" variant="outlined" required/>
                        )}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option.name}
                            </Box>
                        )}
                    />

                    <FormControl fullWidth sx={{mt: 2.5}}>
                        <InputLabel id="select-type">Employment Type</InputLabel>
                        <Select
                            labelId="select-type"
                            id="select-type"
                            fullWidth
                            required
                            value={type}
                            label="Employment Type"
                            onChange={e => setType(e.target.value)}
                        >
                            {employmentTypes.map((year) => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

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
                        <FormControl fullWidth disabled={startYear === '' || currentlyWorking}>
                            <InputLabel id="select-end">End Year</InputLabel>
                            <Select
                                labelId="select-end"
                                id="select-end"
                                value={endYear}
                                label="End Year"
                                required={!currentlyWorking}
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
                    <FormControlLabel control={
                        <Checkbox
                            checked={currentlyWorking}
                            onChange={(e) => {
                                setEndYear('')
                                setCurrentlyWorking(e.target.checked)
                            }}
                        />
                    } label="I'm currently working here"/>

                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        rows={4}
                        value={description}
                        multiline
                        onChange={e => setDescription(e.target.value)}
                        sx={{mt: 2.5, mb: 4, maxWidth: 600}}
                    />

                    {response.error && <Typography variant="body1" color="error" sx={{mt: 2}}>{response.error}</Typography>}
                    <Stack direction="row" spacing={1} sx={{mb: 1}}>
                        {experienceID && <LoadingButton
                            loading={response.isPending}
                            disabled={response.isPending}
                            onClick={() => window.confirm("Are you sure you want to delete this experience?") ? handleDelete() : {}}
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