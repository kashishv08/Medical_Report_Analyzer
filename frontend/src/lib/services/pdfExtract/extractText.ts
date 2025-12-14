import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";
import Tesseract from "tesseract.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export const extractTextFromFile = async (file: File) => {
  // 1️⃣ IMAGE → OCR
  if (file.type.startsWith("image/")) {
    const ocr = await Tesseract.recognize(file, "eng");
    return ocr.data.text;
  }

  // 2️⃣ PDF
  if (file.type === "application/pdf") {
    try {
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text +=
          content.items
            .map((item: unknown) => (item as { str: string }).str)
            .join(" ") + "\n";
      }

      // 🧠 if PDF has no text → OCR fallback
      if (text.trim().length < 50) {
        throw new Error("PDF has no readable text");
      }

      return text;
    } catch (e) {
      console.warn("PDF text extraction failed, falling back to OCR");
      console.log(e);

      // 3️⃣ Render PDF page → OCR
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvas: canvas, canvasContext: ctx, viewport })
        .promise;

      const blob = await new Promise<Blob>((res) =>
        canvas.toBlob((b) => res(b!), "image/png")
      );

      const ocr = await Tesseract.recognize(blob, "eng");
      return ocr.data.text;
    }
  }

  throw new Error("Unsupported file format");
};
