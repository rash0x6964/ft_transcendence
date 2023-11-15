export default function datePipe(value: Date): string {

	let date = new Date(value);
	let ampm = date.getHours() > 12 ? " PM" : " AM"
	return (date.getHours() % 12).toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + ampm;

}

export function datePipe24(value: Date): string {

	let date = new Date(value);
	return (date.getHours()).toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0")

}



export function timePipe(value: number): string {
	return Math.floor(value / 60).toString().padStart(2, "0") + ":" + Math.floor(value % 60).toString().padStart(2, "0");
}
