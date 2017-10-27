import React from "react"
import { Link } from "react-router-native"
import { StyleSheet, Text, View } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'



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
			)
		})
		return(
			<View style={styles.container}>
				<Text style={styles.h1}>Illinois State Parks</Text>
				<View style={styles.inner}>
					<Text style={styles.btn}>Find Parks Close to You!</Text>
					<View style={styles.form}>
						<FormLabel>Enter your Zip Code:</FormLabel>
						<FormInput style={styles.input} type="text" ref="zip" placeholder="zip code" required />
						<Button title="Find Parks" onPress={this.handleSubmit}/>
					</View>
					<View>{parks}</View>
				</View>
			</View>
		)
	}


	handleSubmit = e => {
		e.preventDefault();
		var zip = this.refs.zip.input._lastNativeText;
		fetch('http://192.168.56.1:4000/api/parks?zip=' + zip)
		.then(data => {
			return data.json();
		}).then( json => {
			this.setState({
				parks: json
			});
		}).catch((error) => {
			console.log(error)
		})
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'green',
		alignItems: 'center',
		justifyContent: 'center',
	},
	h1: {
		fontSize: 35,
		color: 'white',
	},
	inner: {
		alignItems: 'center',
		backgroundColor: 'white',
		marginTop: 20,
		paddingTop: 40,
		paddingBottom: 40,
		paddingLeft: 20,
		paddingRight: 20,
	},
	form: {
		alignItems: 'center',
	},
	input: {
		width: 200,
		marginTop: 10,
		marginBottom: 10,
		paddingTop: 5,
		paddingBottom: 10,
	},
})
