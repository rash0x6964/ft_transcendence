export default interface Attachment {
  name: string;
  url: string;
  size: number;
  mimeType: string;
  type: "IMAGE" | "VIDEO" | "FILE";
}
