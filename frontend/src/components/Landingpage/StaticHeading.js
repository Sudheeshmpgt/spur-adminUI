import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function StaticHeading() {
  return (
    <Box>
          <Typography
          fontFamily = 'Oswald, sans-serif'
          color = '#FFFF'
          fontSize = {{
              xs:'1rem',
              md:'1.9rem'
          }}
          sx={{textShadow: '2px 2px 4px #000000'}}
          >
            Unhappy with your performance at interviews?
          </Typography>
      </Box>
  )
}

export default StaticHeading