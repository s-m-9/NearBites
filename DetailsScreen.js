import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage, TouchableHighlight} from 'react-native';
import {getStarRating, Images } from './img/Images';
import {Container, Content} from 'native-base';

export default class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props
        this.state = {
            shop: navigation.getParam('shop'),
            del: navigation.getParam('updateFav'),
            showFavIcon:true
        }
        console.log(this.props.navigation.state.params)
    }

    static navigationOptions = {
        title: 'Details',
        headerStyle: {
            backgroundColor: '#E4C9C2',
            borderBottomColor: 'black'
        },
        headerTintColor: '#F25652',
        headerBackTitleStyle: {
            color: '#F25652'
        }

    }

    isLocal = (url) => {
        var regex = /^http/
        return (regex.test(url)) ? {uri: this.state.shop.url} : this.state.shop.url;
    }

    storeFav = async () => {
        this.setState({showFavIcon: false})
        let favourites = []
        try {
            console.log("Storing obj")
            let value = await AsyncStorage.getItem('FAVOURITES')
            if (value !== null) {
                favourites = JSON.parse(value);
                favourites = favourites.filter((item)=> item.id !== this.state.shop.id);
                favourites.push(this.state.shop)
                await AsyncStorage.setItem('FAVOURITES', JSON.stringify(favourites))
                alert("Added to favorites Successfully.")
            } else {
                favourites.push(this.state.shop)
                await AsyncStorage.setItem('FAVOURITES', JSON.stringify(favourites))
                alert("Added to favorites Successfully.")
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    delFav = async ()=>{
        try{
            let value = await AsyncStorage.getItem('FAVOURITES')
            value = JSON.parse(value);

            let favList = value.filter(item => item.id !== this.state.shop.id)
            await AsyncStorage.setItem('FAVOURITES', JSON.stringify(favList))
            alert("Removed from favorites Successfully.")
            setTimeout(()=>{
                this.state.del(favList);
                const {navigate} = this.props.navigation;
            navigate('Favourites')
            }, 1500);
            
        }catch(err){
            console.log(err.message)
        }
    }
    render() {    
        var starRating = getStarRating(this.state.shop.rating)
        var photo = this.isLocal(this.state.shop.url)
        console.log(this.state.shop)

        return (
            <Container>
                <Content>
                <View style={styles.container}>
                <View style={styles.details}> 
                    <Text style={styles.pageHeader}>{this.state.shop.name}</Text>
                    {
                        <Image
                        style={styles.image}
                        source={photo}
                        />  
                    }
                
                    <Text style={styles.text}>Phone: {this.state.shop.phone}</Text>
                    <Text style={styles.text}>Distance: {this.state.shop.distance} km</Text>
                    <Text style={styles.text}>Price: {this.state.shop.price}</Text>
                    <Image 
                    style={styles.stars}
                    source={starRating}
                    />
                </View>
                { !(this.state.shop.fromFav)? (

                    (this.state.showFavIcon) && (
                        <View>
                            <TouchableHighlight onPress={() => this.storeFav()}>
                                <Image source={Images.add_fav} style={styles.icon} />
                            </TouchableHighlight>
                        </View>
                    )
                        
                    ):(
                        <View>
                            <TouchableHighlight onPress={() => this.delFav()}>
                                <Image source={Images.del_fav} style={styles.icon} />
                            </TouchableHighlight>
                        </View>
                    )
                }
               
            </View>
                </Content>
            </Container>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E4C9C2',
        height: 1000
    },
    pageHeader: {
        fontSize: 20,
        textAlign: 'center',
        margin: 30
    },
    text: {
        paddingStart: 30
    },
    stars: {
        marginTop: 0,
        marginBottom: 0,
        marginStart: 'auto',
        marginEnd: 'auto'
    },
    image: {
        height: 300,
        width: 500,
        marginBottom: 40
    },
    icon: {
        height: 44,
        width: 44,
        marginStart: "auto",
        marginEnd: 'auto',
        marginTop: 20
    },
    details:{
        marginTop: 30,
        backgroundColor: "#f79592",
        height: 530
    }
})
// #f4511e'