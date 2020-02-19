import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView, Button, FlatList, Dimensions, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { hide } from 'expo/build/launch/SplashScreen';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayHolder = [];
  }

  componentDidMount() {
    this.makeMovieDataRequest();
  }

  makeMovieDataRequest = () => {
    const url = "https://api.themoviedb.org/3/movie/upcoming?api_key=c05382d4c2d2575044aba789d2f144aa&language=en-US&page=1"
    this.setState({ loading:true });

    fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({
        data: res.results,
        error: res.error || null,
        loading: false,
      });
      this.arrayHolder = res.results;
    })
    .catch(error => {
      this.setState({error, loading:false});
    })
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayHolder.filter(item => {
      const itemData = `${item.original_title.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
    console.log(this.state.data);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex:1}}>
          <View style={styles.searchHeader}>
            <View style={styles.searchBox}>
              <Icon name="search" color='darkgray' size={20} style={styles.searchIcon} />
              <TextInput placeholder="Search" style={styles.searchText} onChangeText={text => this.searchFilterFunction(text)} value={this.state.text}/>
            </View>
          </View>
          <ScrollView style={{flex:1}}>
            <View style={styles.movieList}>
              <FlatList 
                data={this.state.data}
                renderItem={({ item }) => (
                  <View style={[styles.movieBox, {width: Dimensions.get('window').width/2-24, height:220}]} >
                    <Image source={{uri:'https://image.tmdb.org/t/p/w500'+item.poster_path}} style={styles.movieBoxImg}/>
                    <View style={{flex:1,flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
                      <Text style={styles.movieBoxText}numberOfLines={1}>{`${item.original_title}`}</Text>
                      <Text style={styles.movieBoxText,{color:'red',alignSelf:'flex-end'}}>HH:MM</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
                      <Text style={{fontSize:11, color:'grey'}} numberOfLines={1}>Cast ...</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row', flexWrap:'wrap'}}>
                      <Text style={{color:'grey',flex:1,fontSize:10}}>Genre</Text>
                      <Text style={{color:'grey',alignSelf:'flex-end',fontSize:10}}>(Rating)</Text>
                    </View>
                  </View>
                )}
                numColumns={2}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    backgroundColor: '#fff',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    elevation: 2
  },
  searchBox: {
    marginTop: 32,
    marginBottom: 8,
    marginHorizontal: 16,
    backgroundColor: '#eee',
    height: 40,
    borderRadius: 8,
    flexDirection: 'row'
  },
  searchIcon: {
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  searchText: {
    flex: 1,
    fontWeight: "normal",
    fontSize: 16,
  },
  movieList: {
    flex:1, 
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movieBox: {
    backgroundColor: '#ddd',
    marginLeft: 16,
    marginTop: 16,
    borderRadius: 8,
    elevation: 8,
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 1.0,
    shadowColor: '#ddd',
    overflow: "hidden"
  },
  'movieBox:last-child': {
    backgroundColor: '#ddd',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 8,
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 1.0,
    shadowColor: '#ddd'
  },
  movieBoxImg: {
    height:'70%',
    resizeMode:'stretch',
  },
  movieBoxText: {
    fontSize: 12,
    flex:2,
    color:'blue'
  },
});