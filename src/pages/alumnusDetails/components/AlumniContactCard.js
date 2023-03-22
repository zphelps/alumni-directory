import React from 'react';
import {Card, CardContent, CardHeader, ListItem, Paper, Stack, Typography} from '@mui/material';
import { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {useLocation, useNavigate} from "react-router-dom";
import {GitHub} from "@mui/icons-material";

const AlumniContactCard = ({ alumnus, isEditable }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Paper variant='outlined' sx={{ px: 2.5, py: 2, mb: 2, borderRadius: '8px' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                    variant="h6"
                    component="div"
                    fontWeight={600}
                >
                    Contact
                </Typography>
                {isEditable && (
                    <Stack direction="column">
                        <IconButton onClick={() => navigate(`/alumni/${alumnus.id}/edit/contact-info`,
                            { state: { background: location } })}>
                            <EditIcon/>
                        </IconButton>
                    </Stack>
                )}
            </Stack>
            {alumnus.contactInfo.email && (
                <ListItem disablePadding>
                    <ListItemIcon>
                        <EmailIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Email"
                        secondary={alumnus.contactInfo.email}
                    />
                </ListItem>
            )}
            {alumnus.contactInfo.phone && (
                <ListItem disablePadding>
                    <ListItemIcon>
                        <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Phone"
                        secondary={alumnus.contactInfo.phone}
                    />
                </ListItem>
            )}
            {alumnus.contactInfo.linkedinURL && (
                <ListItem disablePadding>
                    <ListItemIcon>
                        <LinkedInIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="LinkedIn"
                        secondary={<a href={alumnus.contactInfo.linkedinURL}>{alumnus.contactInfo.linkedinURL}</a>}
                    />
                </ListItem>
            )}
            {alumnus.contactInfo.facebookURL && (
                <ListItem disablePadding>
                    <ListItemIcon>
                        <FacebookIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Facebook"
                        secondary={<a href={alumnus.contactInfo.facebookURL}>{alumnus.contactInfo.facebookURL}</a>}
                    />
                </ListItem>
            )}
            {alumnus.contactInfo.twitterURL && (
                <ListItem disablePadding>
                    <ListItemIcon>
                        <TwitterIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Twitter"
                        secondary={<a href={alumnus.contactInfo.twitterURL}>{alumnus.contactInfo.twitterURL}</a>}
                    />
                </ListItem>
            )}
            {alumnus.contactInfo.instagramURL && (
                <ListItem disablePadding>
                    <ListItemIcon sx={{ inset: 0, m: 0, p: 0 }}>
                        <InstagramIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Instagram"
                        secondary={<a href={alumnus.contactInfo.instagramURL}>{alumnus.contactInfo.instagramURL}</a>}
                    />
                </ListItem>
            )}
            {alumnus.contactInfo.githubURL && (
                <ListItem disablePadding>
                    <ListItemIcon sx={{ inset: 0, m: 0, p: 0 }}>
                        <GitHub />
                    </ListItemIcon>
                    <ListItemText
                        primary="Github"
                        secondary={<a href={alumnus.contactInfo.githubURL}>{alumnus.contactInfo.githubURL}</a>}
                    />
                </ListItem>
            )}
            {alumnus.contactInfo.websiteURL && (
                <ListItem disablePadding>
                    <ListItemIcon sx={{ p: 0, m: 0 }}>
                        <LinkIcon sx={{ p: 0, m: 0 }} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Website"
                        secondary={<a href={alumnus.contactInfo.websiteURL}>{alumnus.contactInfo.websiteURL}</a>}
                    />
                </ListItem>
            )}
        </Paper>
    );
}

export default AlumniContactCard;
