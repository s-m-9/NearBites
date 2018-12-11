import React, {Component} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {List, ListItem} from 'react-native-elements';
import { Images } from '../img/Images'

class RestaurantList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list
        }
    }

    componentDidMount(props){
        this.setState({list: this.props.list})
    }
    componentDidUpdate(prev){
        if(this.props.list !== prev.list){
            this.setState(this.props.list);
            console.log('updated state with list')
        }else{
            console.log('did NOT update anything');
        }
        console.log('LIST:: ', prev.list);
    }
    static navigationOptions = {
        title: 'Welcome'
    };

    render() {
        var list = this.state.list;
        return(
            
                <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0}}>
                    {
                        list.map((item) => (
                            <ListItem
                                style={styles.listItem}
                                containerStyle={{backgroundColor:"#E4C9C2", borderBottomColor: "#F25652"}}
                                chevronColor="#F25652"
                                key={item.id}
                                title={`${item.name} (${convertToKm(item.distance, 2)} km)`}
                                onPress={() => this.props.details({
                                    id: item.id,
                                    name: item.name,
                                    phone: item.phone,
                                    distance: convertToKm(item.distance, 4),
                                    price: item.price,
                                    rating: item.rating,
                                    url: checkUrl(item.image_url),
                                    fromFav: false
                                })}
                            />
                        ))
                    }
                </List>
        
            
        )
    }

}

checkUrl = (image) => {
    if (image == "") {
        return Images.image_not_found;
    } else {
        return image;
    }
}

convertToKm = (distance, n) => {
    return (distance / 1000).toFixed(n);
}

export default RestaurantList;


const styles = StyleSheet.create({
    listItem: {
        color: "black"
    }
});

