import React, { Component } from "react";
import { Document, Page } from "react-pdf";
export default class Test extends Component {
	render() {
		return (
			<Document
				file="../../../../backendmegabrok/media/post_Files/archivo.pdf"
				onLoadSuccess={this.onDocumentLoadSuccess}>
				<Page pageNumber={1} />
			</Document>
		);
	}
}
