import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Link} from "react-router-dom";
import { FormLabel, FormInput, Button } from 'react-native-elements'


export default class Parks extends React.Component {
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
				<View>
					<FormLabel>Enter your Zip Code:</FormLabel>
					<FormInput type="text" ref="zip" placeholder="zip code" required />
					<Button title="Find Parks" onPress={this.handleSubmit}/>
				</View>
				<View>{parks}</View>
			</View>
			</View>
		);
	}


	handleSubmit = e => {
		e.preventDefault();
		var zip = this.refs.zip.input._lastNativeText;
		console.log(zip)
		fetch('http://192.168.56.1:4000/api/parks?zip=' + zip)
		.then(data => {
			console.log(data)
			return data.json();
		}).then( json => {
			console.log(json)
			this.setState({
				parks: json
			});
			
		}).catch((error) => {
			console.log(error)
		})
	};
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

