import Document, { Html, Head, Main, NextScript } from 'next/document';
import { NotificationContextProvider } from '../store/notification-context';


class MyDocument extends Document {

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;