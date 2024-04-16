import React from "react";
import Typography from "@mui/material/Typography";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { videos } from "../utils/mockdata";

const VideoTab = ({ filteredVideos, selectedLanguage, handleLanguageChange }) => {
  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "450px",
        marginLeft: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <label
          htmlFor="language-select"
          style={{ fontSize: "16px", marginRight: "10px" }}
        >
          Select Language:{" "}
        </label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          style={{
            width: "180px",
            border: "none",
            backgroundColor: "rgba(12, 161, 246, .1)",
            color: "rgba(12, 161, 246, 1)",
            padding: "7px",
            fontSize: "16px",
            fontWeight: "400",
          }}
        >
          {videos.map((video) => (
            <option key={video.language} value={video.language}>
              {video.language}
            </option>
          ))}
        </select>
      </div>

      {filteredVideos.length === 0 ? (
        <Typography
          variant="body1"
          style={{
            color: "#044c9d",
            fontWeight: "bold",
            fontSize: "23px",
          }}
        >
          No result found
        </Typography>
      ) : (
        filteredVideos.map((item, index) => (
          <div key={index} style={{ position: "relative" }}>
            <h3 style={{ color: "#044c9d", fontSize: "16px" }}>
              {item.title}
            </h3>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
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
                <YouTubeIcon style={{ color: "red", fontSize: "58px" }} />
              </div>
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default VideoTab;
