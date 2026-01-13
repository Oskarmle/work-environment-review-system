import type { SerializableFile } from '../types/report-response';

/**
 * Converts a File object to a serializable format for Redux store
 */
export const fileToSerializable = (file: File): Promise<SerializableFile> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl: reader.result as string,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Converts a serializable file back to a File object
 */
export const serializableToFile = (
  serializableFile: SerializableFile,
): File => {
  // Convert data URL back to blob
  const arr = serializableFile.dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || serializableFile.type;
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr], { type: mime });
  return new File([blob], serializableFile.name, { type: mime });
};
