import React, { useState } from 'react';
import Box from '@mui/material/Box';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Drawer from '@mui/material/Drawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';

import { help } from '../utils/mockdata';
import { videos } from '../utils/mockdata';


const Popup = () => {
    const [open, setOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [expandedAccordion, setExpandedAccordion] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('English'); // Default language
    const [searchQuery, setSearchQuery] = useState('');

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
    
        // Open the first accordion panel if search query is not empty and selected tab is Help
        if (newSearchQuery && selectedTab === 0) {
            const firstMatchingIndex = filteredHelp.findIndex(item =>
                (item.title && item.title.toLowerCase().includes(newSearchQuery)) ||
                (item.heading1 && item.heading1.toLowerCase().includes(newSearchQuery)) ||
                (item.heading2 && item.heading2.toLowerCase().includes(newSearchQuery)) ||
                (item.heading3 && item.heading3.toLowerCase().includes(newSearchQuery)) ||
                (item.desc1 && item.desc1.toLowerCase().includes(newSearchQuery)) ||
                (item.desc2 && item.desc2.toLowerCase().includes(newSearchQuery)) ||
                (item.desc3 && item.desc3.toLowerCase().includes(newSearchQuery))
            );
    
            if (firstMatchingIndex !== -1) {
                const panelName = `panel${firstMatchingIndex}`;
                setExpandedAccordion(panelName);
            }
        } else {
            setExpandedAccordion(null); // Close all panels if search query is empty or tab is not Help
        }
    };
    

    // Filter help items based on search query
    const filteredHelp = help.filter(item =>
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.heading1 && item.heading1.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.heading2 && item.heading2.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.heading3 && item.heading3.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.desc1 && item.desc1.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.desc2 && item.desc2.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.desc3 && item.desc3.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Filter video items based on search query and selected language
    const filteredVideos = videos
        .find(video => video.language === selectedLanguage)
        ?.video.filter(item =>
            (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];


    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#044c9d',
                    padding: '20px 30px',
                    color: '#fff',
                    fontSize: '23px',
                    cursor: 'pointer',
                }}
                onClick={toggleDrawer}
            >
                <span>Sales</span>
                <LightbulbIcon
                    style={{ marginLeft: '10px', color: 'rgba(12, 161, 246, 1)' }}
                />
            </Box>
            <Drawer anchor="right" open={open} onClose={toggleDrawer} style={{boxShadow:'0 0 24px rgba(0,0,0,.32)'}}>
                <Box
                    sx={{
                        width: 450,
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#0ca1f6',
                        color: '#fff',
                        fontSize: '23px',
                        fontWeight: '500',
                        position: 'sticky',
                        top: '0',
                        zIndex: '999', 
                    }}
                >
                    <div>
                        <span style={{ marginLeft: '5px' }}>Learn More</span>
                    </div>
                    <CloseIcon onClick={toggleDrawer} style={{ cursor: 'pointer' }} />
                </Box>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="tabs"
                    style={{ minHeight: '68px' }}
                >
                    <Tab
                        label="Help"
                        selected={selectedTab === 0}
                        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', fontSize:'18px', textTransform:'none', fontWeight:'550' }}
                        icon={<HelpIcon style={{ color: selectedTab === 0 ? '#044c9d' : 'inherit', paddingRight: '5px' }} />}
                    />
                    <Tab
                        label="Video"
                        selected={selectedTab === 1}
                        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', fontSize:'18px', textTransform:'none', fontWeight:'550' }}
                        icon={<YouTubeIcon style={{ color: selectedTab === 1 ? 'red' : 'inherit', paddingRight: '5px' }} />}
                    />
                </Tabs>

                {/* Search input */}
                <div style={{ position: 'relative', marginTop: '10px' }}>
                    <input
                        type="text"
                        placeholder="Search here"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ 
                            width: 'calc(100% - 40px)', 
                            padding: '10px 10px', 
                            fontSize: '16px', 
                            border: 'none', 
                            background: 'rgba(12, 161, 246, .1)', 
                            color: '#044c9d',
                            outline: 'none' 
                        }}
                    />
                    <div style={{ position: 'absolute', top: '50%', right: '30px', transform: 'translateY(-50%)' }}>
                        <SearchIcon style={{ color: 'rgba(12, 161, 246, .8)' }} />
                    </div>
                </div>



                {/* Render content based on selectedTab */}
                {selectedTab === 0 && (
                    <div style={{ marginTop: '20px' }}>
                        {filteredHelp.map((item, index) => (
                            <Accordion
                                key={index}
                                expanded={expandedAccordion === `panel${index}`}
                                onChange={handleAccordionChange(`panel${index}`)}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography style={{ color: '#044c9d', fontSize: '16px', fontWeight: '700' }}>{item.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={{ width: '450px', position: 'relative' }}>
                                        {item.image_url && (
                                            <div style={{ position: 'relative' }}>
                                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                    <img
                                                        src={item.image_url}
                                                        alt={item.title}
                                                        style={{ maxWidth: '100%', height: 'auto' }}
                                                    />

                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                        }}
                                                    >
                                                        <YouTubeIcon style={{ color: 'red', fontSize: '40px' }} />
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                        {item?.heading1 && (
                                            <Typography variant="h6" style={{ fontWeight: 'bold', margin: '10px 0' }}>1. {item.heading1}</Typography>
                                        )}
                                        <Typography>{item.desc1}</Typography>
                                        {item?.heading2 && (
                                            <Typography variant="h6" style={{ fontWeight: 'bold', margin: '10px 0' }}>2. {item.heading2}</Typography>
                                        )}
                                        <Typography>{item.desc2}</Typography>
                                        {item?.heading3 && (
                                            <Typography variant="h6" style={{ fontWeight: 'bold', margin: '10px 0' }}>3. {item.heading3}</Typography>
                                        )}
                                        <Typography>{item.desc3}</Typography>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                )}



                {selectedTab === 1 && (
                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '450px', marginLeft: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <label htmlFor="language-select" style={{fontSize: '16px', marginRight: '10px' }}>Select Language: </label>
                            <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange} style={{ width: '180px', border: 'none', backgroundColor: 'rgba(12, 161, 246, .1)', color: 'rgba(12, 161, 246, 1)', padding: '7px', fontSize: '16px', fontWeight: '400' }}>
                                {videos.map((video) => (
                                    <option key={video.language} value={video.language}>{video.language}</option>
                                ))}
                            </select>
                        </div>
                        {filteredVideos.map((item, index) => (
                            <div key={index} style={{ position: 'relative' }}>
                                <h3 style={{ color: '#044c9d', fontSize: '16px' }}>{item.title}</h3>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                        <YouTubeIcon style={{ color: 'red', fontSize: '58px' }} />
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                )}

            </Drawer>
        </>
    );
};

export default Popup;









