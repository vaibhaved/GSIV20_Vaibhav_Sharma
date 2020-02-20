import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView, BackHandler, FlatList, Dimensions, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MovieDetails from './MovieDetails';

export default class MovieList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      movieData: [],
    };

    this.arrayHolder = [];
  }

  componentDidMount() {
    this.makeMovieListRequest();
  }

  makeMovieListRequest = () => {
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
      this.arrayHolder.forEach(element => {
        this.makeMovieDetailsRequest(element.id)
      });
    })
    .catch(error => {
      this.setState({error, loading:false});
    })
  }

  makeMovieDetailsRequest(id) {
    const url = "https://api.themoviedb.org/3/movie/"+id+"?api_key=c05382d4c2d2575044aba789d2f144aa&language=en-US"
    this.setState({ loading:true });

    fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({
        movieData: res,
        error: res.error || null,
        loading: false,
      });
      for(var i=0;i<this.state.data.length;i++) {
        if(id==this.state.data[i].id) {
          this.state.data[i].runtime=res.runtime
          this.state.data[i].genre=res.genres[0].name
        }
      }
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
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex:1}}>
          <View style={styles.searchHeader}>
            <View style={styles.searchBox}>
              <Icon name="search" color='darkgray' size={20} style={styles.searchIcon} />
              <TextInput 
                placeholder="Search" 
                style={styles.searchText} 
                onChangeText={text => this.searchFilterFunction(text)} 
                value={this.state.text}
              />
            </View>
          </View>
          <ScrollView style={{flex:1}}>
            <View style={styles.movieList}>
              <FlatList 
                data={this.state.data}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={[styles.movieBox, {width: Dimensions.get('window').width/2-24, height:220}]} 
                    onPress={() => {
                      this.props.navigation.navigate('MovieDetails', {item: item.id})}} >
                    <Image 
                      source={{uri:'https://image.tmdb.org/t/p/w500'+item.poster_path}} 
                      style={styles.movieBoxImg}
                    />
                    <View style={{flex:1,flexDirection:'row', flexWrap:'wrap'}}>
                      <Text style={styles.movieBoxTitle} numberOfLines={1}>
                        {`${item.original_title}`}
                      </Text>
                      <Text style={{color:'red',alignSelf:'flex-end',fontSize:12}}>
                        {`${item.runtime}`}
                      </Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
                      <Text style={{fontSize:11, color:'grey'}} numberOfLines={1}>
                        Cast ...
                      </Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row', flexWrap:'wrap'}}>
                      <Text style={{color:'grey',flex:1,fontSize:10}}>
                      {`${item.genre}`}
                      </Text>
                      <Text style={{color:'grey',alignSelf:'flex-end',fontSize:10}}>
                        ({`${item.vote_average}`})
                      </Text>
                    </View>
                  </TouchableOpacity>
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
    backgroundColor:'white',
    paddingBottom:16,
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
  movieBoxImg: {
    height:'70%',
    resizeMode:'stretch',
  },
  movieBoxTitle: {
    fontSize: 12,
    flex:1,
    color:'blue'
  },
});