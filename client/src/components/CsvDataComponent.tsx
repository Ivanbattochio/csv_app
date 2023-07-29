import React from 'react'
import { Typography, Box } from '@mui/material'
import { CsvLine } from '../models/CsvLine'

export const CsvDataComponent = ({ paginatedData }: { paginatedData: CsvLine[] }) => {
    if (!paginatedData.length) {
        return (
            <Box sx={{ display: 'flex', height: '60vh', alignItems: 'center' }}>
                <Typography>No data found!</Typography>
            </Box>
        )
    } else {
        return paginatedData.map((data) => (
            <Box sx={{ backgroundColor: '#565554', borderRadius: '10px', display: 'flex', gap: '5px' }}>
                <h4>{data.name}</h4>
                <h4>{data.city}</h4>
                <h4>{data.country}</h4>
                <h4>{data.favorite_sport}</h4>
            </Box>
        ))
    }
}
