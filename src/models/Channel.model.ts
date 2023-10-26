export default interface Channel {
  id: string;
  imageUrl: string;
  name: string;
  password: string;
  visibility: "PRIVATE" | "PUBLIC" | "PROTECTED";
}
