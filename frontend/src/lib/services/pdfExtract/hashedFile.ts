export const hashedFile = async (file: File) => {
  const buffer = await file.arrayBuffer(); //convert to binary
  //   console.log("buffer", buffer);

  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);

  //   console.log("hashBuffer", hashBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};
