export const getBase64String = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const base64String = reader.result.toString();

        resolve(
          // Extract the base64 part from the data URL
          // Example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+w"
          base64String.split(",")[1] // Remove the data URL prefix
        );
      } else {
        reject(new Error("Failed to convert file to base64 string"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};
