/**
 * Utility functions for calculator print functionality
 * Implements the general rule for isolating calculator results for printing
 */

/**
 * Creates a standardized print function for any calculator
 * @param calculatorSlug - The slug identifier for the calculator (e.g., 'concrete-slab-calculator')
 * @param calculatorName - The display name of the calculator for the print header
 * @returns A function that handles the isolated printing of calculator results
 */
export function createPrintFunction(calculatorSlug: string, calculatorName: string) {
  return () => {
    const printableSectionId = `${calculatorSlug}-printable-results`;
    const printableContent = document.getElementById(printableSectionId);

    if (printableContent) {
      const originalContents = document.body.innerHTML;
      
      // Create a complete HTML document for printing with professional styling
      const printDocument = `
        <html>
          <head>
            <title>${calculatorName} Results - DIYCalculatorPro</title>
            <style>
              body { 
                font-family: 'Arial', sans-serif; 
                margin: 20px; 
                line-height: 1.6;
                color: #2C2C2C;
              }
              .print-header { 
                text-align: center; 
                margin-bottom: 30px; 
                border-bottom: 3px solid #FF6600; 
                padding-bottom: 20px; 
              }
              .print-title { 
                color: #2C2C2C; 
                font-size: 28px; 
                font-weight: bold; 
                margin-bottom: 10px; 
              }
              .print-subtitle { 
                color: #6B6B6B; 
                font-size: 16px; 
                margin-bottom: 5px;
              }
              .print-date {
                color: #FF6600;
                font-size: 14px;
                font-weight: bold;
              }
              .result-section { 
                margin-bottom: 25px; 
                padding: 20px; 
                border: 2px solid #EFEFEF; 
                border-radius: 12px; 
                background: #FFFFFF;
              }
              .section-title { 
                color: #2C2C2C; 
                font-size: 20px; 
                font-weight: bold; 
                margin-bottom: 15px; 
                border-bottom: 2px solid #FF6600; 
                padding-bottom: 8px; 
                display: flex;
                align-items: center;
              }
              .section-title::before {
                content: '';
                width: 8px;
                height: 8px;
                background: #FF6600;
                border-radius: 50%;
                margin-right: 10px;
              }
              .result-row { 
                display: flex; 
                justify-content: space-between; 
                margin-bottom: 12px; 
                padding: 10px 0; 
                border-bottom: 1px solid #F8F8F8;
              }
              .result-row:last-child {
                border-bottom: none;
              }
              .result-label { 
                color: #6B6B6B; 
                font-weight: 500;
              }
              .result-value { 
                color: #2C2C2C; 
                font-weight: bold; 
              }
              .highlight-row { 
                border-top: 2px solid #FF6600; 
                padding-top: 15px; 
                margin-top: 15px; 
                background: #FFF7ED;
                border-radius: 8px;
                padding: 15px;
              }
              .highlight-value { 
                color: #FF6600; 
                font-size: 20px; 
                font-weight: bold;
              }
              .print-footer { 
                margin-top: 40px; 
                text-align: center; 
                color: #6B6B6B; 
                font-size: 12px; 
                border-top: 2px solid #EFEFEF; 
                padding-top: 20px; 
              }
              .print-footer p {
                margin: 5px 0;
              }
              .disclaimer {
                background: #FFF7ED;
                border: 1px solid #FF6600;
                border-radius: 8px;
                padding: 15px;
                margin-top: 20px;
                font-size: 11px;
                color: #2C2C2C;
              }
              .disclaimer strong {
                color: #FF6600;
              }
              
              /* Print-specific styles */
              @media print {
                body { margin: 0; }
                .result-section { break-inside: avoid; }
                .print-header { break-after: avoid; }
              }
            </style>
          </head>
          <body>
            <div class="print-header">
              <div class="print-title">${calculatorName} Results</div>
              <div class="print-subtitle">DIYCalculatorPro - Professional Grade Tools</div>
              <div class="print-date">Generated on ${new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
            </div>
            
            <div class="results-content">
              ${printableContent.innerHTML}
            </div>
            
            <div class="print-footer">
              <p><strong>DIYCalculatorPro.com</strong> - Professional Grade Calculation Tools</p>
              <p>Results calculated using industry-standard formulas and best practices</p>
              
              <div class="disclaimer">
                <p><strong>Important Disclaimer:</strong> These calculations are estimates based on standard formulas and assumptions. Always verify calculations with a qualified professional before ordering materials or beginning construction. Material requirements may vary based on specific project conditions, local building codes, and material specifications.</p>
              </div>
            </div>
          </body>
        </html>
      `;

      // Replace body content with print document
      document.body.innerHTML = printDocument;
      
      // Trigger print dialog
      window.print();
      
      // Restore original content
      document.body.innerHTML = originalContents;
      
      // Force React to re-render the page to restore functionality
      window.location.reload();
    } else {
      console.error(`Printable content div with ID '${printableSectionId}' not found.`);
      
      // Provide user feedback for error
      alert(`Print functionality is not available for this calculator. Please ensure the calculator has generated results before attempting to print.`);
    }
  };
}

/**
 * Creates a standardized wrapper ID for printable calculator results
 * @param calculatorSlug - The slug identifier for the calculator
 * @returns The standardized ID string for the printable results wrapper
 */
export function getPrintableResultsId(calculatorSlug: string): string {
  return `${calculatorSlug}-printable-results`;
}

/**
 * Utility function to wrap calculator results with the standardized print wrapper
 * This should be used in JSX to wrap the results sections
 * @param calculatorSlug - The slug identifier for the calculator
 * @param children - The JSX content to wrap (calculation results)
 * @returns JSX element with the proper wrapper for printing
 */
export function PrintableResultsWrapper({ 
  calculatorSlug, 
  children 
}: { 
  calculatorSlug: string; 
  children: React.ReactNode; 
}) {
  return (
    <div id={getPrintableResultsId(calculatorSlug)} className="printable-results-wrapper">
      {children}
    </div>
  );
}