import React from 'react';

const DownloadSheetButton = () => {
  
  const SHEET_ID = "1zMC4ZMBnyWViN1oNpC_LFAItU3SqtdDJrsqzLIC01S0"
  
  const handleDownload = () => {
    const downloadUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=xlsx`;
    
    window.open(downloadUrl, '_blank');
  };

  const handleDownloadCSV = () => {
    const downloadUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
    window.open(downloadUrl, '_blank');
  };

  const handleDownloadPDF = () => {
    const downloadUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=pdf`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="flex gap-4 items-center">
      {/* Excel Download Button */}
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download Excel
      </button>

      {/* CSV Download Button */}
      <button
        onClick={handleDownloadCSV}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download CSV
      </button>

      {/* PDF Download Button */}
      <button
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Download PDF
      </button>
    </div>
  );
};

export default DownloadSheetButton;