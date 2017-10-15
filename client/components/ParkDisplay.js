import React from "react";
import {render} from "react-dom";
import {Router, Route, Switch} from "react-router-native"
import { StyleSheet, Text, View, Image } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import {createMemoryHistory, createHashHistory} from 'history'
import MapView from 'react-native-maps'
import {Link} from "react-router-native"


export default class ParkDisplay extends React.Component{
	state = {
		park: [{}],
		coordinates: [0,0]		
	}
	
	componentDidMount() {
		let name = this.props.location.pathname.split("/").pop()
		fetch('http://192.168.56.1:4000/api/parks/' + name).then(data => {
			return data.json();
		}).then( json => {
			this.setState({
				park: json,
				coordinates: json[0].geometry["coordinates"]
			})
		})
	}
	
	render(){
		let park = this.state.park[0];
		let lon = this.state.coordinates[0];
		let lat = this.state.coordinates[1];		
		let activities = park.activities
		let images = {
			camping: require('../media/camping.png'),
			hiking: require('../media/hiking.png'),
			picnicking: require('../media/picnicking.png'),
			biking: require('../media/biking.png'),
			swimming: require('../media/swimming.png'),
			boating: require('../media/boating.png'),
			fishing: require('../media/fishing.png'),
			hunting: require('../media/hunting.png')
		}
		if(activities) {
			activities = activities.map(function(activity, index){
				let imgSrc = images[activity]
				return (
					<View key={index}>
						<Image 
							style={{width: 30, height: 30, margin: 5}}
							source={imgSrc}
						/>
					</View>
				)	
			})
		}
		return(
			<View  style={styles.container}>
				<Text style={styles.h2}>{park.name}</Text>
				<Image 
					style={{width: 150, height: 100}}
					source={{uri: park.image_url}}
				/>
				<Text style={styles.address}>{park.address}</Text>
				<View style={styles.inner}>
					<Text style={styles.description}>{park.description}</Text>
					<View style={styles.activities}>{activities}</View>	
					<MapView
						style={{width: 150, height: 150}}
						region={{
						  latitude: lat,
						  longitude: lon,
						  latitudeDelta: 0.0922,
						  longitudeDelta: 0.0421,
						}}>					
						<MapView.Marker
							coordinate={{
								latitude: lat,
								longitude: lon,						
							}}
						/>
					</MapView>
					<Link to='/'>
						<Text style={styles.back}>
							Back
						</Text>
					</Link>
				</View>
			</View>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'green',
		alignItems: 'center',
		justifyContent: 'center',
	},
	activities: {
		flexDirection:'row',
		flexWrap:'wrap',
		alignItems: 'center',
	},
	inner: {
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20,
	},
	back: {
		color: 'white',
		marginTop: 10,
	},
	description: {
		fontSize: 12,
		marginTop: 5,
		marginBottom: 5,
		backgroundColor: 'white',		
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 5,
		paddingRight: 5,

	},
	h2: {
		fontSize: 18,
		marginTop: 20,
		color: 'white',

	},
	address: {
		color: 'white',
		fontSize: 12,
	}
})

Expo.registerRootComponent(ParkDisplay)