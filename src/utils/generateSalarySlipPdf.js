import { jsPDF } from 'jspdf';

export const generateSalarySlipPdf = (salarySlipData, employeeId) => {
  if (!salarySlipData) {
    console.error('No salary slip data provided for PDF generation.');
    return null;
  }

  const doc = new jsPDF();

  // Set font and size
  doc.setFont('helvetica');
  doc.setFontSize(12);

  let yPos = 20;

  // Title
  doc.setFontSize(18);
  doc.text('Salary Slip', 105, yPos, { align: 'center' });
  yPos += 10;

  doc.setFontSize(12);
  doc.text(`Employee ID: ${employeeId}`, 10, yPos);
  yPos += 7;
  doc.text(`Month: ${salarySlipData.month}`, 10, yPos);
  yPos += 10;

  // Employee Details (Placeholder for now, can be expanded)
  doc.setFontSize(14);
  doc.text('Employee Details', 10, yPos);
  doc.line(10, yPos + 1, 200, yPos + 1);
  yPos += 7;
  doc.setFontSize(12);
  // Assuming you might add employee name, designation etc. here later
  // doc.text(`Name: ${salarySlipData.nameOfEmployee || 'N/A'}`, 10, yPos);
  // yPos += 7;
  // doc.text(`Designation: ${salarySlipData.designation || 'N/A'}`, 10, yPos);
  // yPos += 10;

  // Earnings
  doc.setFontSize(14);
  doc.text('Earnings', 10, yPos);
  doc.line(10, yPos + 1, 200, yPos + 1);
  yPos += 7;
  doc.setFontSize(12);
  salarySlipData.earnings.forEach(item => {
    doc.text(`${item.name}:`, 10, yPos);
    doc.text(`₹${item.amount}`, 190, yPos, { align: 'right' });
    yPos += 7;
  });
  yPos += 5;
  doc.setFontSize(12);
  doc.text('Gross Salary:', 10, yPos);
  doc.text(`₹${salarySlipData.grossSalary}`, 190, yPos, { align: 'right' });
  yPos += 10;

  // Deductions
  doc.setFontSize(14);
  doc.text('Deductions', 10, yPos);
  doc.line(10, yPos + 1, 200, yPos + 1);
  yPos += 7;
  doc.setFontSize(12);
  salarySlipData.deductions.forEach(item => {
    doc.text(`${item.name}:`, 10, yPos);
    doc.text(`₹${item.amount}`, 190, yPos, { align: 'right' });
    yPos += 7;
  });
  yPos += 5;
  doc.setFontSize(12);
  doc.text('Total Deductions:', 10, yPos);
  doc.text(`₹${salarySlipData.totalDeductions}`, 190, yPos, { align: 'right' });
  yPos += 10;

  // Net Salary
  doc.setFontSize(16);
  doc.text('Net Salary:', 10, yPos);
  doc.text(`₹${salarySlipData.netSalary}`, 190, yPos, { align: 'right' });
  yPos += 15;

  // Footer
  doc.setFontSize(10);
  doc.text('This is a computer generated salary slip and does not require a signature.', 105, 280, { align: 'center' });

  return doc.output('bloburl');
};