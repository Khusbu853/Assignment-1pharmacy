import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ searchQuery, handleSearchChange }) => {
  return (
    <div style={{ position: "relative", marginTop: "10px" }}>
      <input
        type="text"
        placeholder="Search here"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          width: "calc(100% - 40px)",
          padding: "10px 10px",
          fontSize: "16px",
          border: "none",
          background: "rgba(12, 161, 246, .1)",
          color: "#044c9d",
          outline: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "30px",
          transform: "translateY(-50%)",
        }}
      >
        <SearchIcon style={{ color: "rgba(12, 161, 246, .8)" }} />
      </div>
    </div>
  );
};

export default SearchInput;
