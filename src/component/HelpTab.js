import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import YouTubeIcon from "@mui/icons-material/YouTube";

const HelpTab = ({ filteredHelp, expandedAccordion, handleAccordionChange }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {filteredHelp.length === 0 ? (
        <Typography
          variant="body1"
          style={{
            color: "#044c9d",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "23px",
          }}
        >
          No result found
        </Typography>
      ) : (
        filteredHelp.map((item, index) => (
          <Accordion
            key={index}
            expanded={expandedAccordion === `panel${index}`}
            onChange={handleAccordionChange(`panel${index}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                style={{
                  color: "#044c9d",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ width: "450px", position: "relative" }}>
                {item.image_url && (
                  <div style={{ position: "relative" }}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={item.image_url}
                        alt={item.title}
                        style={{ maxWidth: "100%", height: "auto" }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <YouTubeIcon
                          style={{ color: "red", fontSize: "40px" }}
                        />
                      </div>
                    </a>
                  </div>
                )}
                {item?.heading1 && (
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", margin: "10px 0" }}
                  >
                    1. {item.heading1}
                  </Typography>
                )}
                <Typography>{item.desc1}</Typography>
                {item?.heading2 && (
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", margin: "10px 0" }}
                  >
                    2. {item.heading2}
                  </Typography>
                )}
                <Typography>{item.desc2}</Typography>
                {item?.heading3 && (
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", margin: "10px 0" }}
                  >
                    3. {item.heading3}
                  </Typography>
                )}
                <Typography>{item.desc3}</Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </div>
  );
};

export default HelpTab;
