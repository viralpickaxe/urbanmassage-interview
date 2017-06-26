import { Component } from "react"
import React from "react"

import Store from "../state/Store"
import ObjectStore from "../state/ObjectStore"
import history from "../state/History"

import { IndexPage } from "./pages/Index"
import { CreateCharacterPage } from "./pages/CreateCharacter"

import { MainFrame } from "./components/frame/MainFrame"

/**
 * The main router for the application
 * 
 * @export
 * @class Router
 * @extends {Component<null, null>}
 */
export class Router extends Component<null, null> {

    /**
     * Render the router
     * 
     * @returns 
     * 
     * @memberof Router
     */
    render() {
        
        // Get the current state of the router and auth store
        let router = Store.getState().Router

        // The page element is the page component that will get rendered in the application frame
        let page_element = null,
            overlay_element = null

        if ( router.get("active_route") === "index" || router.get("active_route") === "create" ) {

            // Show the home page
            page_element = <IndexPage
                searchterm={router.getIn(["query", "searchterm"]) || ""}
                hair_colors={router.getIn(["query", "hair_colors"]) || "blond,brown,grey,red,none"}
                skin_colors={router.getIn(["query", "skin_colors"]) || "fair,gold,grey,light,white,dark"}
                eye_colors={router.getIn(["query", "eye_colors"]) || "blue,yellow,brown,green"}
                page={parseInt(router.getIn(["query", "page"])) || 0}
            />

            if ( router.get("active_route") === "create" ) {

                overlay_element = <CreateCharacterPage />

            }
            
        }

        // Render the application frame
        return <MainFrame overlay={overlay_element}>
            {page_element}
        </MainFrame>

    }

}