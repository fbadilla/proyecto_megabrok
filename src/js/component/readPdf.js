import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import PropTypes from "prop-types";

class readPDF extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  
  render() {
    return (
      <Context.Consumer>
        {({ store, actions }) => {
          this.storeContext = store;
          this.actionsContext = actions;
          return (
            <div>
              <Document
                file={store.documentos.docfile}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <p>Page {pageNumber} of {numPages}</p>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}
readPDF.propTypes = {
	history: PropTypes.object
};