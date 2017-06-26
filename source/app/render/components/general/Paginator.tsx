import { Component } from "react"
import React from "react"
import classNames from "classnames"
import { range, map } from "underscore"

interface PropsType {

    /**
     * Total number of elements in all pages
     * 
     * @type {number}
     * @memberof PropsType
     */
    total: number

    /**
     * Total size of each page
     * 
     * @type {number}
     * @memberof PropsType
     */
    size: number

    /**
     * Current page number
     * 
     * @type {number}
     * @memberof PropsType
     */
    page: number

    /**
     * Callback for when a page number is clicked
     * 
     * 
     * @memberof PropsType
     */
    onPageChange?: (page: number) => void

}

/**
 * Component that renders a pagination element
 * Stateless component
 * 
 * @export
 * @class Paginator
 * @extends {Component<PropsType, null>}
 */
export class Paginator extends Component<PropsType, null> {

    /**
     * Onclick function for page buttons to bubble up new page state
     * 
     * @param {number} page_number New page number to check
     * @returns {boolean} Did bubble up a change
     * 
     * @memberof Paginator
     */
    setPage(page_number: number): boolean {

        // Validate that the page number is not the same as the curren, is in range and there is a defined callback
        if ( page_number !== this.props.page && page_number >= 0 && page_number < Math.ceil(this.props.total/this.props.size) && this.props.onPageChange ) {
            
            // Call the page change callback prop
            this.props.onPageChange(page_number)
            return true

        }

        return false

    }

    render() {

        // Work out the total number of pages
        let current_page = this.props.page,
            total_pages = Math.ceil(this.props.total/this.props.size)
        
        // Array to hold all the page buttons, this should be 10 elements in all cases
        var pages = []

        if ( total_pages <= 10 ) { // If there are less than 10 pages

            // Just render all the pages
            pages = range(total_pages)

        } else if ( current_page < 5 ) { // If we are in a larger set and are at the begging

            // Render the start of the page list
            pages = range(8)
            // Add a truncated quick jump to the end
            pages = pages.concat(["...", total_pages - 1])

        } else if ( current_page > total_pages - 6 ) { // If we are in a larger set and are at the end
            
            // Add a truncated quick jump to the start
            pages = [0, "..."]
            // Render the end of the page list
            pages = pages.concat(range(total_pages - 9, total_pages))

        } else { // Otherwise if we are in the middle of a larger set

            // Add a truncated quick jump to the start
            pages = [0, "..."]
            // Render 3 pages around the current active p[age]
            pages = pages.concat(range(current_page - 3, current_page + 4))
            // Add a truncated quick jump to the end
            pages = pages.concat(["...", total_pages - 1])

        }

        // Convert the page button array to actual elements
        let page_tabs = map(pages, (page_number, i) => {

            if ( isNaN(page_number) ) { // If not a page number (a truncate [...] button)

                // Render a disabled button with no interactivity
                return <div key={`${page_number}-${i}`} className={"Paginator__button Paginator__button--disabled"}>{page_number}</div>

            } else { // Otheriwse if its a number

                // Render the button
                return <div key={page_number} className={"Paginator__button" + (current_page === page_number ? " Paginator__button--active" : "")} onClick={this.setPage.bind(this, page_number)}>{page_number + 1}</div>

            }

        })

        // Return the actual paginator element
        return <div className="Paginator">

            <div className={classNames("Paginator__button Paginator__button--edge",{"Paginator__button--disabled": current_page === 0})} onClick={this.setPage.bind(this, this.props.page - 1)}><i className="fa fa-chevron-left" /></div>
            {page_tabs}
            <div className={classNames("Paginator__button Paginator__button--edge",{"Paginator__button--disabled": current_page === (total_pages - 1)})} onClick={this.setPage.bind(this, this.props.page + 1)}><i className="fa fa-chevron-right" /></div>

        </div>

    }

}