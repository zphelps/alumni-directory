import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Modal, Typography, Box, Paper, Stack, Divider, useTheme, FormControl, Autocomplete} from '@mui/material';
import { TextField } from '@mui/material';
import {Close, Email, Facebook, GitHub, Instagram, LinkedIn, Phone, ThreeP, Twitter} from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import {useDocument} from "../../../../hooks/useDocument";
import { CircularProgress } from '@mui/material';
import {useFirestore} from "../../../../hooks/useFirestore";
import InputAdornment from '@mui/material/InputAdornment';
import LinkIcon from "@mui/icons-material/Link";

export const EditContactCardModal = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [github, setGithub] = useState('');
    const [website, setWebsite] = useState('');
    const [twitter, setTwitter] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');


    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const {document: alumnus, error, isPending} = useDocument('alumniProfiles', id);
    const {updateDocument, response} = useFirestore('alumniProfiles');

    useEffect(() => {
        if(alumnus) {
            setEmail(alumnus.contactInfo.email);
            setPhone(alumnus.contactInfo.phone);
            setLinkedin(alumnus.contactInfo.linkedinURL);
            setGithub(alumnus.contactInfo.githubURL);
            setWebsite(alumnus.contactInfo.websiteURL);
            setTwitter(alumnus.contactInfo.twitterURL);
            setFacebook(alumnus.contactInfo.facebookURL);
            setInstagram(alumnus.contactInfo.instagramURL);

        }
        if(response.success) {
            navigate(-1, {replace: true});
        }
    }, [alumnus, response])

    const handleSave = e => {
        e.preventDefault();
        updateDocument(id, {
            contactInfo: {
                email: email,
                phone: phone,
                linkedinURL: linkedin,
                githubURL: github,
                websiteURL: website,
                twitterURL: twitter,
                facebookURL: facebook,
                instagramURL: instagram,
            }
        })
    }

    const handlePhoneInputChange = (event) => {
        const { value } = event.target;
        // remove all non-numeric characters from input
        const formattedPhoneNumber = value.replace(/\D/g, '');

        // format phone number as (123) 456-7890
        if (formattedPhoneNumber.length > 6 && formattedPhoneNumber.length <= 10) {
            setPhone(formattedPhoneNumber.replace(/(\d{3})(\d{0,3})(\d{0,4})/, '($1) $2-$3'));
        }
        else {
            setPhone(formattedPhoneNumber)
        }
    };

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
                    <Typography variant="h5" fontWeight="600" sx={{ }}>Edit Contact Info</Typography>
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
                        label="Email"
                        variant="outlined"
                        fullWidth
                        placeholder={'abc@xyz.com'}
                        value={email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }}
                        onChange={e => setEmail(e.target.value)}
                        sx={{mt: 3}}
                    />
                    <Typography
                        variant="caption1"
                        color={'secondary'}
                        fontSize={13}
                        sx={{mt: 2, lineHeight: 0.7}}
                    >
                        *This only changes your
                        <em> public-facing</em> email address. Your account email will remain the same.
                    </Typography>

                    <TextField
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        onChange={handlePhoneInputChange}
                        placeholder={'(123) 456-7890'}
                        value={phone}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Phone />
                                </InputAdornment>
                            ),
                        }}
                        sx={{mt: 3}}
                    />

                    <TextField
                        label="LinkedIn"
                        variant="outlined"
                        fullWidth
                        placeholder={'https://www.linkedin.com/in/username'}
                        value={linkedin}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LinkedIn />
                                </InputAdornment>
                            ),
                        }}
                        onChange={e => setLinkedin(e.target.value)}
                        sx={{mt: 3}}
                    />

                    <TextField
                        label="Twitter"
                        variant="outlined"
                        fullWidth
                        placeholder={'https://www.twitter.com/username'}
                        value={twitter}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Twitter />
                                </InputAdornment>
                            ),
                        }}
                        onChange={e => setTwitter(e.target.value)}
                        sx={{mt: 3}}
                    />

                    <TextField
                        label="Instagram"
                        variant="outlined"
                        fullWidth
                        placeholder={'https://www.instagram.com/username'}
                        value={instagram}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Instagram />
                                </InputAdornment>
                            ),
                        }}
                        onChange={e => setInstagram(e.target.value)}
                        sx={{mt: 3}}
                    />

                    <TextField
                        label="Facebook"
                        variant="outlined"
                        fullWidth
                        placeholder={'https://www.facebook.com/username'}
                        value={twitter}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Facebook />
                                </InputAdornment>
                            ),
                        }}
                        onChange={e => setFacebook(e.target.value)}
                        sx={{mt: 3}}
                    />

                    <TextField
                        label="Github"
                        variant="outlined"
                        fullWidth
                        placeholder={'https://www.github.com/username'}
                        value={github}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <GitHub />
                                </InputAdornment>
                            ),
                        }}
                        onChange={e => setGithub(e.target.value)}
                        sx={{mt: 3}}
                    />

                    <TextField
                        label="Personal Website"
                        variant="outlined"
                        fullWidth
                        placeholder={'https://example.com'}
                        value={website}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LinkIcon />
                                </InputAdornment>
                            ),
                        }}
                        onChange={e => setWebsite(e.target.value)}
                        sx={{my: 3}}
                    />

                    {response.error && <Typography variant="body1" color="error" sx={{mt: 2}}>{response.error}</Typography>}
                    <LoadingButton
                        loading={response.isPending}
                        disabled={response.isPending}
                        sx={{mb: 1}}
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Save
                    </LoadingButton>

                </Box>}

            </Paper>
        </Modal>
    );
}