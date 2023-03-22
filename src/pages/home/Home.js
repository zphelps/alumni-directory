import React from 'react'
import { Container } from '@mui/material';
import AlumniList from '../../components/AlumniList';
import { useCollection } from '../../hooks/useCollection'
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import FilterCard from '../alumnusDetails/components/FilterCard';
import { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Paper } from '@mui/material';
import CurrentFiltersBar from '../../components/CurrentFiltersBar';

export default function Home({ query, setQuery }) {
    const { documents: alumni, isPending } = useCollection('alumniProfiles', [
            ['isActive', '==', true]
        ]);

    const [filteredAlumni, setFilteredAlumni] = useState([])
    const [appliedFilters, setAppliedFilters] = useState({});
    const [queuedFilters, setQueuedFilters] = useState({});

    const handleApplyFilters = () => {
        if (Object.keys(queuedFilters).length > 0) {
            if (queuedFilters.location && queuedFilters.location.country === 'United States' && !queuedFilters.location.state) {
                return 'Please select a state.'
            }
            Object.keys(queuedFilters).forEach(element => {
                switch (element) {
                    case 'location': {
                        setAppliedFilters(prev => ({
                            ...prev,
                            locations: prev.locations ?
                                [...prev.locations, queuedFilters.location]
                                : [queuedFilters.location]
                        }));
                        break;
                    }
                    case 'graduationRange': {
                        setAppliedFilters(prev => ({
                            ...prev,
                            graduationRange: prev.graduationRange ?
                                [...prev.graduationRange, queuedFilters.graduationRange]
                                : [queuedFilters.graduationRange]
                        }));
                        break;
                    }
                    case 'education': {
                        setAppliedFilters(prev => ({
                            ...prev,
                            education: prev.education ?
                                [...prev.education, queuedFilters.education]
                                : [queuedFilters.education]
                        }));
                        break;
                    }
                    default: {
                        break;
                    }
                }
            });
            setQueuedFilters({});
            setQuery('');
            return null
        }
        else {
            return 'No filters to apply.'
        }
    }

    useEffect(() => {
        if (localStorage.getItem('appliedFilters')) {
            setAppliedFilters(JSON.parse(localStorage.getItem('appliedFilters')));
        }
        if (localStorage.getItem('query') && localStorage.getItem('query').length > 1) {
            setQuery(localStorage.getItem('query'));
        }
    }, [setQuery])

    useEffect(() => {
        if (alumni) {
            if (query.length > 0) {
                localStorage.setItem('query', query);
                setAppliedFilters({});
                setFilteredAlumni(alumni.filter(doc => {
                    if (!query || query.length === 0) return true
                    return doc.firstName.toLowerCase().includes(query.toLowerCase())
                }))
            }
            else {
                localStorage.setItem('appliedFilters', JSON.stringify(appliedFilters));
                localStorage.setItem('query', '');
                setFilteredAlumni(alumni.filter(doc => {

                    if (appliedFilters.locations && appliedFilters.locations.length !== 0) {
                        if (appliedFilters.locations.length === 0) return true
                        return appliedFilters.locations.some(location => {
                            if (location.country === 'United States') {
                                return location.state === doc.state
                            }
                            else {
                                return location.country === doc.country
                            }
                        })
                    }
                    if(appliedFilters.graduationRange && appliedFilters.graduationRange?.length !== 0) {
                        if (appliedFilters.graduationRange.length === 0) return true
                        return appliedFilters.graduationRange.some(range => {
                            return doc.graduationYear >= range.start && doc.graduationYear <= range.end
                        })
                    }
                    if(appliedFilters.education && appliedFilters.education?.length !== 0) {
                        if (appliedFilters.education.length === 0) return true
                        return appliedFilters.education.some(education => {
                            return doc.education.some(edu => {
                                return edu.school.name === education.name
                            })
                        })
                    }

                    return true
                }))
            }
            const scrollPosition = sessionStorage.getItem('scrollPosition');
            if (scrollPosition) {
                window.scrollTo({ top: parseInt(scrollPosition, 10), behavior: "instant" });

                sessionStorage.removeItem('scrollPosition');
            }
        }
    }, [query, alumni, appliedFilters]);

    return (
        <Container
            maxWidth="xl"
            sx={{ px: 1, py: 0, height: '100%' }}>
            <CurrentFiltersBar appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} numResults={filteredAlumni.length} />
            <Grid container spacing={1.5} sx={{ height: '100%' }}>
                <Grid item xs={12} sm={12} md={4} lg={3} xl={3} sx={{ overflowY: 'hidden' }}>
                    <FilterCard queuedFilters={queuedFilters} setQueuedFilters={setQueuedFilters} handleApplyFilters={handleApplyFilters} />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={9} xl={9} sx={{ height: '100%', overflowY: { xs: 'visible', md: 'auto' } }}>
                    {isPending && (
                        <Grid container spacing={1.5}>
                            {[...Array(25).keys()].map(i => (
                                <Grid item xs={12} sm={6} md={6} lg={4} key={i}>
                                    <Paper variant="outlined" sx={{ py: 1, px: 2, borderRadius: '8px' }}>
                                        <Skeleton animation="wave" variant="circular" width='4em' height='4em' />
                                        <Skeleton height='35px' />
                                        <Skeleton animation="wave" width="60%" />
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    {!isPending && <AlumniList alumni={filteredAlumni} />}
                </Grid>
            </Grid>
        </Container >
    )
}
