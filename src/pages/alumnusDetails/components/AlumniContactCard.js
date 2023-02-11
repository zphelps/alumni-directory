import React from 'react';
import { Card, CardContent, CardHeader, ListItem, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import Grid from '@mui/material/Grid';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

const AlumniContactCard = ({ alumnus }) => {
    return (
        <Paper variant='outlined' sx={{ px: 2.5, py: 2, mb: 2, borderRadius: '8px' }}>
            <Typography
                variant="h6"
                component="div"
                fontWeight={600}
                sx={{ pt: 1 }}
            >
                Contact
            </Typography>
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
