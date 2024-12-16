import React from "react";

function Tags({ tags }) {
    return (
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    );
  }


  export default Tags;