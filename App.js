import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Link} from "react-router-dom";
import { FormLabel, FormInput } from 'react-native-elements'


export default class App extends React.Component {
	state = {
		parks: []
	}
	render(){
		var parks = this.state.parks;
		parks = parks.map(function(park, index){
			return(
				<Link to={`/park-display/${park.obj.name}`} key={index}>
					<View>
						<Text className="name">{park.obj.name}</Text>
						<Text className="dist">{Math.floor(park.dis / 1000)} km</Text>
					</View>
				</Link>
			);
		}); 
		return(
			<View style={styles.container}>
				<Text className="title">Illinois State Parks</Text>
				<View>
				<Text>Find Parks Close to You!</Text>
				<View onSubmit={this.handleSubmit.bind(this)}>
					<FormLabel>Enter your Zip Code:</FormLabel>
					<FormInput type="text" ref="zip" placeholder="zip code" required />
					<FormInput type="submit" value="Find Parks"/>
				</View>
				<View>{parks}</View>
			</View>
			</View>
		);
	}
	handleSubmit = e => {
		console.log("oi")
	}
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
