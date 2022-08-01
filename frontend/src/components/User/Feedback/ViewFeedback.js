import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../../common/Scroll.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useLocation, useNavigate } from "react-router-dom";

function ViewFeedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState('')

  useEffect(()=>{
    const data = location.state.file
    setFile(data)
  },[location.state.file]) 

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleClick = () => {
    navigate("/interviews");  
  };

  return (
    <Grid container>
      <Box
        component={Paper}
        width="95%"
        height={550}
        marginTop={10}
        borderRadius="10px"
      >
        <Box
          sx={{
            borderBottom: "1px solid",
            borderColor: "rgba(0, 0, 0, 0.38)",
            minHeight: "35px",
            maxWidth: "96%",
            m: "0 auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            fontSize={{ xs: "1rem", sm: "1.3rem" }}
            sx={{ mt: 2, mb: 1 }}
          >
            Feedback
          </Typography>
          <IconButton onClick={handleClick}>
            <CloseIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </Box>
        <Box
          className="scrollbar-hidden"
          sx={{ overflow: "scroll", height: 480, width: "100%" }}
        >
          <Box
            sx={{
              width: 700,
              m: "5px auto",
              border:'1px solid', 
            }}
          >
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page width={700} pageNumber={pageNumber}/>
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export default ViewFeedback;
