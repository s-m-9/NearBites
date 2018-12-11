import React from 'react';
import { StyleSheet, View, AsyncStorage} from 'react-native';
import { Container, Header, Item, Button, Text,Content } from 'native-base';
import { List, ListItem } from 'react-native-elements';
 
export default class FavouritesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           fav: null,
           nofav: true
        }
    }

    retrieveFav = async () => {
        try {
            const value = await AsyncStorage.getItem('FAVOURITES')
            if(value !== null) {
                let favList = JSON.parse(value)
                console.log(favList)
                if(favList.length !== 0){
                    this.setState({fav: favList,
                    nofav:false})
                }
            }
        } catch(err) {
            console.log(err.message)
        }
    }

    componentDidMount() {
        this.retrieveFav();
    }

    updateFav = (obj) => {
        if(obj.length == 0){
            this.setState({nofav:true,
                fav:obj
            })
        }
        this.retrieveFav()
    }

    details = (obj) => {
        const { navigate } = this.props.navigation;
        navigate('Details', {shop : obj, updateFav : this.updateFav, showMessage : this.showMessage})
    }

    render() {
        var list = this.state.fav;
        return(
            <Container style={styles.container}>
                <Content>
                    <View>
                        {(!list || this.state.nofav) && (
                            <Text>No Favourites</Text>
                        )}

                        {(list) && (
                            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                                {
                                    list.map((item) => (
                                            <ListItem
                                            style={styles.listItem}
                                            containerStyle={{ backgroundColor: "#E4C9C2", borderBottomColor: "#F25652" }}
                                            chevronColor="#F25652"
                                            key={item.id}
                                            title={`${item.name}`}
                                            onPress={() => this.details({
                                                id: item.id,
                                                name: item.name,
                                                phone: item.phone,
                                                distance: item.distance,
                                                price: item.price,
                                                rating: item.rating,
                                                url: item.url,
                                                fromFav: true
                                            })}
                                        />
                                    ))
                        
                                }
                            </List>
                        )}
                        
                    </View>
                </Content>
                
            </Container>
            
        )
    }


    static navigationOptions = {
        title: 'Favourites',
        headerStyle: {
            backgroundColor: '#E4C9C2',
            borderBottomColor: 'black'
        },
        headerTintColor: '#F25652',
        headerBackTitleStyle: {
            color: '#F25652'
        }

    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#E4C9C2'
    }
});