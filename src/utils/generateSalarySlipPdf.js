import html2pdf from "html2pdf.js";

export const generateSalarySlipPdf = async (salarySlipData, employeeId) => {
  const element = document.getElementById("salary-slip");
  if (!element) return null;

  const opt = {
    filename: `${employeeId}-Salary-Slip-${salarySlipData.month || "Sep2025"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  // Instead of .save(), return a Blob
  return new Promise((resolve) => {
    html2pdf()
      .set(opt)
      .from(element)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const blob = pdf.output("blob");
        const blobUrl = URL.createObjectURL(blob);
        resolve(blobUrl);
      });
  });
};
