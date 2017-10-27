import React from "react"
import { Router, Route, Switch} from "react-router-native"
import { createMemoryHistory } from 'history'
import Input from "./components/Input.js"
import ParkDisplay from "./components/ParkDisplay.js"



const history = createMemoryHistory()

export default class App extends React.Component {
    render() {
        return (
            <Router history={history}>
				<Switch>
					<Route exact path="/" component={Input}/>
					<Route exact path="/park-display/:name" component={ParkDisplay}/>
				</Switch>
			</Router>
        )
    }
}

Expo.registerRootComponent(App)