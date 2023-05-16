import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

const Test = (props) => {
  const [data, setData] = useState(new Set());

  // Load data from local storage when component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('scannedData');
    if (storedData) {
      setData(new Set(JSON.parse(storedData)));
    }
  }, []);

  const handleScan = (result, error) => {
    if (result) {
      setData((prevData) => {
        const updatedData = new Set(prevData);
        updatedData.add(result.text);

        // Store updated data in local storage
        localStorage.setItem('scannedData', JSON.stringify(Array.from(updatedData)));

        return updatedData;
      });
    }

    if (error) {
      console.error(error);
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

  const clearData = () => {
    // Clear data from local storage
    localStorage.removeItem('scannedData');

    // Clear state
    setData(new Set());
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
      <button onClick={clearData}>Clear Data</button>
    </>
  );
};

export default Test;
