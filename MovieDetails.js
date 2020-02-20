import React from "react";
import { View,ScrollView,Text,Image,StyleSheet, Dimensions} from "react-native";
import { BackHandler } from 'react-native';

export default class MovieDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: [],
            error: null,
        };
    }
    
    componentDidMount() {
        this.makeMovieDetailsRequest();
    }

    makeMovieDetailsRequest = () => {
        const url = "https://api.themoviedb.org/3/movie/"+this.props.route.params.item+"?api_key=c05382d4c2d2575044aba789d2f144aa&language=en-US"
        this.setState({ loading:true });
    
        fetch(url)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: res,
            error: res.error || null,
            loading: false,
          });
        })
        .catch(error => {
          this.setState({error, loading:false});
        })
    }
    
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{flex:1}}>
                    <Image source={{uri:'https://image.tmdb.org/t/p/w500'+this.state.data.poster_path}} 
                        style={styles.img}
                    />
                    <View style={{paddingVertical:8,flexDirection:'row'}}>
                        <Text style={styles.movieTitle}>
                            {`${this.state.data.original_title}`}&nbsp;
                        </Text>
                        <Text style={styles.movieRating}>
                            ({`${this.state.data.vote_average}`})
                        </Text>
                    </View>
                    <View style={{paddingVertical:8,flexDirection:'row'}}>
                        <Text style={styles.movieYear}>
                            {`${this.state.data.release_date}`.substring(0,4)} |&nbsp;
                        </Text>
                        <Text style={styles.movieYear}>
                            {`${this.state.data.runtime}`} Min | Director
                        </Text>
                    </View>
                    <View style={{paddingVertical:8,flexDirection:'row'}}>
                        <Text style={styles.movieYear}>
                            Description: {`${this.state.data.overview}`}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        paddingHorizontal:16,
        marginTop: 16
    },
    img: {
        height:Dimensions.get('window').height*0.5,
        resizeMode:'stretch'
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: '600',
        color:'#222',

    },
    movieRating: {
        fontSize: 18,
        fontWeight: '600',
        color:'#666',
    },
    movieYear: {
        fontSize: 16,
        color:'#555',
    },
})