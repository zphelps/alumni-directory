import { Grid } from '@mui/material';
import React from 'react';
import { Typography, Box, Chip, Stack } from '@mui/material';
import { useState, useEffect } from 'react';

const CurrentFiltersBar = ({ appliedFilters, setAppliedFilters, numResults }) => {

    const [filterLabels, setFilterLabels] = useState([]);

    const handleFilterDelete = (filterType, id) => {
        setFilterLabels(prev => prev.filter(item => item.id !== id));
        setAppliedFilters(prev => {
            return {...prev, [filterType]: appliedFilters[filterType].filter(item => item.id !== id)}
        })
    }


    useEffect(() => {
        console.log(appliedFilters);
        setFilterLabels([]);
        Object.keys(appliedFilters) && Object.keys(appliedFilters).forEach(filterType => {
            switch (filterType) {
                case 'locations': {
                    appliedFilters[filterType].forEach(location => {
                        if (location.country !== 'United States') {
                            setFilterLabels(prev => [...prev, {
                                filterType: filterType,
                                id: location.id,
                                label: location.country,
                            }]);
                        }
                        else {
                            setFilterLabels(prev => [...prev, {
                                filterType: filterType,
                                id: location.id,
                                label: `${location.state}, ${location.country}`
                            }]);
                        }
                    })
                    break;
                }
                case 'graduationRange': {
                    appliedFilters[filterType].forEach(range => {
                        setFilterLabels(prev => [...prev, {
                            filterType: filterType,
                            id: range.id,
                            label: `Graduated between ${range.start} - ${range.end}`
                        }]);
                    })
                    break;
                }
                case 'education': {
                    appliedFilters[filterType].forEach(education => {
                        setFilterLabels(prev => [...prev, {
                            filterType: filterType,
                            id: education.id,
                            label: education.name
                        }]);
                    })
                    break;
                }
                default: {
                    break;
                }
            }
        })
    }, [appliedFilters]);

    return (
        <Box sx={{ py: 2 }}>
            <Grid container spacing={1.5} rowSpacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
                    <Typography variant="subtitle2" component="div" fontSize="1.15em">
                        Showing results: <span style={{ fontWeight: 'bold' }}>{numResults}</span>
                    </Typography>

                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
                    <Typography display='inline-block' variant="subtitle2" component="div" fontSize="1.15em" sx={{mr: 1}}>
                        Tags:
                    </Typography>
                    {filterLabels && filterLabels.map(filter => (
                        <Chip key={filter.id} sx={{ ml: 0.75, mb: 0.75 }} label={filter.label} variant="outlined" onDelete={() => { handleFilterDelete(filter.filterType, filter.id) }} />
                    ))}
                </Grid>

                {/* <Stack direction="row" spacing={1}>
                    
                </Stack> */}

            </Grid>
        </Box>

    );
}

export default CurrentFiltersBar;
