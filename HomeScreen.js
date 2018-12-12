import React from 'react';
import { StyleSheet, View, Button as NavButton, Image } from 'react-native';
import List from './components/RestaurantList';
import {Container, Header, Item, Button, Input, Text, Icon, Spinner, Content} from 'native-base';
import { Images } from './img/Images'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            latitude: "",
            longitude: "",
            error: "",
            term: "",
            isLoading: false,
            noResult: false,
            text: ""
        }
    }

    componentDidMount() {
        let options = {
            enableHighAccuracy: true,
            timeOut: 20000,
            maximumAge: 60 * 60
        };

        navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, options);
    }

    geoSuccess = (position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }

    geoFailure = (err) => {
        this.setState({ error: err });
        console.log(this.state.error);
    }

    searchValue = ""
    showData = () => {
        this.setState({isLoading: true, list: null})
        this.searchValue = this.state.term;
        let url = `https://api.yelp.com/v3/businesses/search?term=${this.state.term}&latitude=${this.state.latitude}&longitude=${this.state.longitude}&sort_by=distance`,
            apikey = "ViSrFIkcZoIuZrkjPjPk4BAHTACmP-TaAOhOX8ZmompENMZSZHfUYVn1DDLsHKH5Dw-B9LoKxbJaNqYDpjhJWHSJfQdnrau9QkM2vqenpc6VOvKNhikiQ1RlBwD_W3Yx",

            options = {
                cors: 'cors',
                cache: 'default',
                headers: {
                    "Authorization": `Bearer ${apikey}`
                },
                method: 'GET'
            },
            request = new Request(url, options);
        fetch(request)
            .then((response) => response.json())
            .then((data) => {
                this.setState({term: ""})
                setTimeout(()=>{
                        this.setState({ list: data.businesses,
                            isLoading: false,
                            noResult: false
                        });
                        if(this.state.list.length == 0){
                            this.setState({noResult: true})
                        }
                    console.log(this.state.list[0]);
                }, 100);
                
            })
            .catch((error) => {
                this.setState({ error: error.message });
                console.log(this.state.error);
            });

    }

    static navigationOptions = ({navigation}) => {
        return{
            title: "NearBites",
        headerStyle: {
            backgroundColor: '#E4C9C2'
        },
        headerRight: (
            <NavButton
            onPress={()=> navigation.navigate('Favourites')}
            title="Favourites"
            color="#F25652"
            />
        )
        }
    }

    render() {
        let list = this.state.list;
        let display;
        if(list != null && list.length !== 0){

            display = list;
        }
        return (
                <Container style = {styles.searchContainer}>
                    <Image
                        style={styles.image}
                        source={Images.yelp_logo}
                    />  
                    <Header searchBar rounded style={styles.header}>
                        <Item>
                            <Icon name="ios-search"/>
                        <Input placeholder="Search" ref={'SearchInput'} onChangeText={(text) => this.setState({ term: text }) }/>
                        </Item>
                            { (this.state.latitude !== "") && (this.state.term !== "") && (
                                <Button  transparent dark onPress={() => {
                                    this.showData();
                                    this.refs['SearchInput'].setNativeProps({ text: '' });
                                }}>
                                    <Text>Search</Text>
                                </Button>
                            )}
                    </Header>
                    {
                    (this.state.isLoading) && (<Spinner color="#F25652"/>)         
                }
                {
                    (this.state.noResult) && 
                    (<Text style={styles.text}>There are no results for {this.searchValue}</Text>)
                }
                <Content>
                { 
                    (display) && (
                        <View style={styles.listContainer}>
                        <Text style={styles.text}>showing Results for {this.searchValue}</Text>
                        <List list={this.state.list} details={this.details} style={styles.list}/>
                        </View>
                    )
                }
                </Content>
                
                </Container>
               
        );
    }
    details = (obj) => {
            const {navigate} = this.props.navigation;
            navigate('Details', {shop : obj})
    }

    list() {
        return (<List list={this.state.list} details={this.details} />)
    }
}

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        backgroundColor: '#E4C9C2',
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: -20
    },
    listContainer: {
        justifyContent: 'flex-start',
        alignItems: 'stretch'
        
    },
    header: {
        backgroundColor: '#F25652'
    },
    text:{
        marginTop: 25,
        textAlign: "center"
    },
    list:{
        marginTop: -25
    },
    image : {
        marginLeft: "auto",
        marginRight: 'auto',
        height: 44,
        width: 44,
        marginTop: 20
    }
});