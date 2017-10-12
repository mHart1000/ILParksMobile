import React from "react";
import {render} from "react-dom";
import {Router, Route, Switch} from "react-router-native"
import { StyleSheet, Text, View, Image } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import {createMemoryHistory, createHashHistory} from 'history'



export default class ParkDisplay extends React.Component{
	state = {
		park: [{}]
	}
	
	componentDidMount() {
		let name = this.props.location.pathname.split("/").pop()
		fetch('http://192.168.56.1:4000/api/parks/' + name).then(data => {
			return data.json();
		}).then( json => {
			this.setState({
				park: json
			});
		})
	}
	
	render(){
		let park = this.state.park[0]
		console.log(park.activities)
		let activities = park.activities
			console.log(activities)

		if(activities) {
			activities = activities.map(function(key, index){
				return (
					<View key={index}>
						<Text>
							{key}
						</Text>
					</View>
				)				
			})
			console.log(activities)
		}
		return(
			<View id="park-container">
				<Text className="title">{park.name}</Text>
				<Image 
					style={{width: 150, height: 100}}
					source={{uri: park.image_url}}
				/>
				<Text>{park.address}</Text>

				<View id="display">
					<Text>{park.description}</Text>
					<View>{activities}</View>
				</View>
			</View>
		)
	}
}
;



Expo.registerRootComponent(ParkDisplay)