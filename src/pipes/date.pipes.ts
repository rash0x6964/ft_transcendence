export default function datePipe(value: Date): string {

	let date = new Date(value);
	let ampm = date.getHours() > 12 ? " PM" : " AM"
	return (date.getHours() % 12).toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + ampm;

}
