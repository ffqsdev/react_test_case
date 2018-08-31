import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import App from "./components/App/App"
import { store } from "./store/configureStore"

import registerServiceWorker from "./registerServiceWorker"

import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"


const template = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(template, document.getElementById("root"))
registerServiceWorker()
