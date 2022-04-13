import { ErrorOutline } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import React from 'react'

const ErrorSign = ({showError, errorMessage}) => {
  return (
    <Box className="fadeIn" display={showError ? "flex" : "none"} mt={1} gap={1} alignItems="center" padding={1} borderRadius={4} bgcolor="red" color="white">
      <ErrorOutline />
      <Typography variant="subtitle2" fontWeight={500} >{errorMessage}</Typography>
    </Box>
  )
}

export default ErrorSign