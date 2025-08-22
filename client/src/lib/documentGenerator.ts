import { jsPDF } from 'jspdf';

export async function downloadPDF(content: string, contractId: string): Promise<void> {
  try {
    const doc = new jsPDF();
    
    // Set font and styling
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    // Split text into lines that fit on page
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const maxLineWidth = pageWidth - 2 * margin;
    
    const lines = doc.splitTextToSize(content, maxLineWidth);
    
    // Add text to PDF
    let yPosition = 30;
    const lineHeight = 6;
    const pageHeight = doc.internal.pageSize.height;
    
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 30;
      }
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
    
    // Download the PDF
    const filename = `contract-${contractId}-${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(filename);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

export async function downloadWord(content: string, contractId: string): Promise<void> {
  try {
    // Create a simple HTML structure for Word document
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Contract</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 1in; }
          pre { white-space: pre-wrap; font-family: 'Times New Roman', serif; }
        </style>
      </head>
      <body>
        <pre>${content}</pre>
      </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contract-${contractId}-${new Date().toISOString().slice(0, 10)}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('Error generating Word document:', error);
    throw new Error('Failed to generate Word document');
  }
}
