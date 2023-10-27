export default function fileSizePipe(value: number): string {
	let kiloBytesValue = value / 1000
	let megaBytesValue = kiloBytesValue / 1000

	if (megaBytesValue >= 1) {
		return megaBytesValue.toFixed(2) + " MB"
	}

	return kiloBytesValue.toFixed(2) + " KB";
}
