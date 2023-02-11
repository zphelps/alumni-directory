import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.secondary.main,
    backgroundColor: alpha(theme.palette.secondary.light, 0.1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.secondary.light, 0.15),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

const SearchBar = ({ query, setQuery }) => {
    const navigate = useNavigate()
    const location = useLocation()
    //GOOGLE PLACES API KEY: AIzaSyCifgIAWSOmueKNrIG3Fn9WXqtjETOJdv0
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search', }}
                value={query}
                onChange={(e) => {
                    if (location.pathname !== '/') {
                        navigate(`/`)
                    }
                    setQuery(e.target.value)
                }}
            />
        </Search>
    );
}

export default SearchBar;
