import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Modal, Typography, Box, Paper, Stack, Divider, useTheme, FormControl} from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import {useDocument} from "../../../../hooks/useDocument";
import { CircularProgress } from '@mui/material';
import {useFirestore} from "../../../../hooks/useFirestore";

export const EditBioCardModal = () => {
    const [bio, setBio] = useState('');

    const {id} = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const {document: alumnus, error, isPending} = useDocument('alumniProfiles', id);
    const {updateDocument, response} = useFirestore('alumniProfiles');

    useEffect(() => {
        if(alumnus) {
            setBio(alumnus.bio)
        }
        if(response.success) {
            navigate(-1)
        }
    }, [alumnus, response])

    const handleSave = e => {
        e.preventDefault();
        updateDocument(id, {
            bio,
        })
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
                    width: '100%',
                    maxWidth: 600,
                    backgroundColor: 'background.paper',
                    boxShadow: 5,
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
                    <Typography variant="h5" fontWeight="600" sx={{ }}>Edit Bio</Typography>
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
                        label="Bio"
                        variant="outlined"
                        fullWidth
                        required
                        rows={4}
                        value={bio}
                        multiline
                        onChange={e => setBio(e.target.value)}
                        sx={{mt: 2.5, mb: 4, maxWidth: 600}}
                    />
                    {response.error && <Typography variant="body1" color="error" sx={{mt: 2}}>{response.error}</Typography>}
                    <LoadingButton
                        loading={response.isPending}
                        disabled={response.isPending}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 1, mb: 2}}
                    >
                        Save
                    </LoadingButton>
                </Box>}

            </Paper>
        </Modal>
    );
}