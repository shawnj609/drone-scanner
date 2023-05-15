import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const Test = (props) => {
  const [data, setData] = useState(new Set());
  const [err, setError] = useState("No Error");

  const handleScan = (result, error) => {
    if (result) {
      setData((prevData) => new Set(prevData).add(result.text));
    }

    if (error) {
    //   console.log(error);
      setError(error.err);
    }
  };

  const downloadData = () => {
    // Convert data to CSV format
    const csvData = Array.from(data).join("\n");

    // Create a blob from the CSV data
    const blob = new Blob([csvData], { type: "text/csv" });

    // Create an object URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a link element that points to the object URL
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.csv";

    // Append the link to the document body and click it
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
  };

  return (
    <>
      <QrReader
        onResult={handleScan}
        scanDelay={300}
        style={{ width: "100%" }}
        constraints={{
          facingMode: "environment",
        }}
      />
      <ul>
        {[...data].map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={downloadData}>Download CSV</button>
      <p>Error: {err}</p>
    </>
  );
};

export default Test;
