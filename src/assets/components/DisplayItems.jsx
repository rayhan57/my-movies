import React from "react";

const DisplayItems = ({ data, property }) => {
  const items = data[property];

  return (
    <>
      {items &&
        items.map((item, index) => (
          <span key={index}>
            {item.name}
            {index < items.length - 1 ? ", " : ""}
          </span>
        ))}
    </>
  );
};

export default DisplayItems;
