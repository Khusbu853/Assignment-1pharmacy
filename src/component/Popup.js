import React, { useState } from "react";
import Box from "@mui/material/Box";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Drawer from "@mui/material/Drawer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { help, videos } from "../utils/mockdata";
import HelpTab from "./HelpTab";
import VideoTab from "./VideoTab";
import SearchInput from "./SearchInput";

const Popup = () => {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSearchChange = (event) => {
    const newSearchQuery = event.target.value.toLowerCase();
    setSearchQuery(newSearchQuery);
    if (newSearchQuery && selectedTab === 0) {
      const firstMatchingIndex = filteredHelp.findIndex(
        (item) =>
          (item.title && item.title.toLowerCase().includes(newSearchQuery)) ||
          (item.heading1 &&
            item.heading1.toLowerCase().includes(newSearchQuery)) ||
          (item.heading2 &&
            item.heading2.toLowerCase().includes(newSearchQuery)) ||
          (item.heading3 &&
            item.heading3.toLowerCase().includes(newSearchQuery)) ||
          (item.desc1 && item.desc1.toLowerCase().includes(newSearchQuery)) ||
          (item.desc2 && item.desc2.toLowerCase().includes(newSearchQuery)) ||
          (item.desc3 && item.desc3.toLowerCase().includes(newSearchQuery))
      );
      if (firstMatchingIndex !== -1) {
        const panelName = `panel${firstMatchingIndex}`;
        setExpandedAccordion(panelName);
      }
    } else {
      setExpandedAccordion(null);
    }
  };

  const filteredHelp = help.filter(
    (item) =>
      (item.title &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.heading1 &&
        item.heading1.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.heading2 &&
        item.heading2.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.heading3 &&
        item.heading3.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.desc1 &&
        item.desc1.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.desc2 &&
        item.desc2.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.desc3 &&
        item.desc3.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredVideos =
    videos
      .find((video) => video.language === selectedLanguage)
      ?.video.filter(
        (item) =>
          (item.title &&
            item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.desc &&
            item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
      ) || [];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#044c9d",
          padding: "20px 30px",
          color: "#fff",
          fontSize: "23px",
          cursor: "pointer",
        }}
        onClick={toggleDrawer}
      >
        <span>Sales</span>
        <LightbulbIcon
          style={{ marginLeft: "10px", color: "rgba(12, 161, 246, 1)" }}
        />
      </Box>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        style={{ boxShadow: "0 0 24px rgba(0,0,0,.32)" }}
      >
        <Box
          sx={{
            width: 450,
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#0ca1f6",
            color: "#fff",
            fontSize: "23px",
            fontWeight: "500",
            position: "sticky",
            top: "0",
            zIndex: "999",
          }}
        >
          <div>
            <span style={{ marginLeft: "5px" }}>Learn More</span>
          </div>
          <CloseIcon onClick={toggleDrawer} style={{ cursor: "pointer" }} />
        </Box>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="tabs"
          style={{ minHeight: "68px" }}
        >
          <Tab
            label="Help"
            selected={selectedTab === 0}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              fontSize: "18px",
              textTransform: "none",
              fontWeight: "550",
            }}
            icon={<HelpIcon 
                style={{
                  color: selectedTab === 0 ? "#044c9d" : "inherit",
                  paddingRight: "5px", paddingTop: '5px'
                }}
            />}
          />
          <Tab
            label="Video"
            selected={selectedTab === 1}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              fontSize: "18px",
              textTransform: "none",
              fontWeight: "550",
            }}
            icon={<YouTubeIcon
                style={{
                  color: selectedTab === 1 ? "red" : "inherit",
                  paddingRight: "5px", paddingTop:'5px'
                }}
             />}
          />
        </Tabs>

        {/* Search input */}
        <SearchInput
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />

        {/* Render content based on selectedTab */}
        {selectedTab === 0 && (
          <HelpTab
            filteredHelp={filteredHelp}
            expandedAccordion={expandedAccordion}
            handleAccordionChange={handleAccordionChange}
          />
        )}
        {selectedTab === 1 && (
          <VideoTab
            filteredVideos={filteredVideos}
            selectedLanguage={selectedLanguage}
            handleLanguageChange={handleLanguageChange}
          />
        )}
      </Drawer>
    </>
  );
};

export default Popup;

