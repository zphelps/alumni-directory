import { Grid } from '@mui/material';
import React from 'react';
import { Typography, Box, Chip, Stack } from '@mui/material';
import { useState, useEffect } from 'react';

const CurrentFiltersBar = ({ appliedFilters, setAppliedFilters, numResults }) => {

    const [filterLabels, setFilterLabels] = useState([]);

    const handleFilterDelete = (key, filter) => {
        console.log(key, filter, appliedFilters);
        appliedFilters[key] = appliedFilters[key].filter(item => item !== filter);
        setFilterLabels(prev => prev.filter(item => item.filter !== filter));
        setAppliedFilters({ ...appliedFilters, [key]: appliedFilters[key] });
    }

    useEffect(() => {
        Object.keys(appliedFilters) && Object.keys(appliedFilters).forEach(key => {
            switch (key) {
                case 'locations': {
                    appliedFilters[key].forEach(country => {
                        if (country !== 'United States') {
                            setFilterLabels(prev => [...prev, { key: key, filter: country, label: country }]);
                        }
                    })
                    break;
                }
                case 'states': {
                    appliedFilters[key].forEach(state => {
                        setFilterLabels(prev => [...prev, { key: key, filter: state, label: `${state}, United States` }]);
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
            <Grid container spacing={1.5}>
                <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
                    <Typography variant="subtitle2" component="div" fontSize="1.15em">
                        Showing results: <span style={{ fontWeight: 'bold' }}>{numResults}</span>
                    </Typography>

                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
                    <Typography display='inline-block' variant="subtitle2" component="div" fontSize="1.15em">
                        Tags:
                    </Typography>
                    {filterLabels && filterLabels.map(filter => (
                        <Chip key={filter.label} sx={{ ml: 0.75 }} label={filter.label} variant="outlined" onDelete={() => { handleFilterDelete(filter.key, filter.filter) }} />
                    ))}
                </Grid>

                {/* <Stack direction="row" spacing={1}>
                    
                </Stack> */}

            </Grid>
        </Box>

    );
}

export default CurrentFiltersBar;
