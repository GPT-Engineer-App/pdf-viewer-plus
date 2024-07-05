import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const fileInputRef = useRef(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setPageNumber(1);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <Input
          type="file"
          accept="application/pdf"
          onChange={onFileChange}
          ref={fileInputRef}
        />
        {file && <p>{file.name}</p>}
      </div>
      <div className="flex flex-col items-center space-y-2">
        {file && (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="border p-2"
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

export default PDFViewer;