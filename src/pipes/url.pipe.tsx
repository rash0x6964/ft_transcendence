import React, { ReactNode } from "react";

export default function UrlPipe({ message }: { message: string | undefined }): ReactNode | string {
	if (!message)
		return ""
	const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
	const regex2 = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/g;

	if (!regex.test(message))
		return message;







	return (<div className="">
		{message.split(" ").map((message, i) => {
			if (message.match(regex2))
				return <a key={i} rel="noopener noreferrer" target="_blank" className="underline text-primary hover:text-primary-600 mr-1 " href={message}>{message}</a>
			return <span className="mr-1" key={i}>{message}</span>

		})}
	</div>)
}
