import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setPageNumber(1);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => setPageNumber(pageNumber - 1);
  const goToNextPage = () => setPageNumber(pageNumber + 1);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <Input type="file" onChange={onFileChange} />
        {file && <p>{file.name}</p>}
      </div>
      <div className="w-full flex justify-center">
        {file && (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="w-full"
          >
            <Page pageNumber={pageNumber} />
          </Document>
        )}
      </div>
      <div className="flex space-x-2">
        <Button onClick={goToPrevPage} disabled={pageNumber <= 1}>
          Previous Page
        </Button>
        <Button onClick={goToNextPage} disabled={pageNumber >= numPages}>
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default Index;