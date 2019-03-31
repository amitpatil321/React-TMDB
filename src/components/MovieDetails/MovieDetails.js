import React, { Component } from 'react';
import { Row, Col, Typography, Tag, Divider, Empty, Avatar } from 'antd';
import { Fade,Zoom } from 'react-reveal';
import { Link } from 'react-router-dom';

import * as API from '../../API/MoviesAPI';
import './MovieDetails.css'
import Alert from '../Alert/Alert.js';

const { Title, Paragraph } = Typography;

class MovieDetails extends Component {
    state = {
        movie : null,
        error : null,
        ignore : false // Whether to ignore to this error ?
    }

    componentDidMount(){
        // Show whatever we have quickly and then we load more details later
        this.setState({ movie : this.props.location.state.movie });
        // Load other details
        let movieId = this.props.location.state.movie.id;
        API.movieDetails(movieId).then(response => {
            let details = { ...this.state.movie, ...response };
            this.setState({ movie : details });
        }).catch((error) => {
            let errorBox = <Alert type="error" message={error.toString()} />
            this.setState({ error : errorBox, ignore : false })
        });

        // Load movie cast
        API.movieCast(movieId).then(response => {
            let details = { ...this.state.movie, ...response };
            console.log(details);
            this.setState({ movie : details });            
        }).catch((error) => {
            let errorBox = <Alert type="error" message={error.toString()} />
            this.setState({ error : errorBox, ignore :  true })
        });
    }

    componentWillReceiveProps(){
        this.setState({ movie : this.props.history.location.state.movie });
    }

    _getTags(){
        return this.state.movie.genres.map(genre => {
            return <Tag key={genre.id} color={'#'+Math.random().toString(16).substr(-6)}>{genre.name}</Tag>
        });
    }

    _getProductionCompanies(companies){
        let arrCompanies = Object.keys(companies);
        return arrCompanies.map((element, index) => 
            index == arrCompanies.length - 1 ? <Link to={"/company/"+companies[element].name} key={index}>{companies[element].name}</Link> : [<Link to={"/company/"+companies[element].name} key={index}>{companies[element].name}</Link>, ", "]
        )
    }

    _getCast(casts){
        return casts.map((person, index) => {
            // show only top 8 cast members
            if(index > 7) return;
            return <Col span={3} key={index}>
                <Zoom delay={index * 80}>
                    <Link to={"/person/"+person.id+"/"+person.name}>
                        <img src={"https://image.tmdb.org/t/p/w264_and_h264_bestv2/"+person.profile_path} className="actorPic"/>
                        <p>
                            <strong>{person.name}</strong><br />
                            <i>{person.character}</i>
                        </p>
                    </Link>
                </Zoom>        
            </Col>
        });
    }

    render() {
        let tags = "";
        let companies = "";
        let casts = "";

        // Handle error and show error message
        if(this.state.error != null && !this.state.ignore)
            return this.state.error;

        if(this.state.movie){
            console.log(this.state.movie);
            // Destructuring
            let { title, name, production_companies, genres, backdrop_path, poster_path, tagline, overview, cast } = this.state.movie;

            // Check whether title OR name provided
            title = (title) ? title : name;
            
            // List movie production companies
            if(production_companies)
                companies = this._getProductionCompanies(production_companies);

            if(cast){
                casts = this._getCast(cast);
            }

            if(genres)
                tags = this._getTags();

            let backgroundImage = "http://image.tmdb.org/t/p/original"+ backdrop_path;
                document.getElementById("mainContent").style.backgroundImage = 'url("'+backgroundImage+'")';
                return (
                        <div className="movieDetails">
                            <Row gutter={16}>
                                <Col span={6}>                    
                                    <Fade>
                                        <img src={"http://image.tmdb.org/t/p/w342"+poster_path} alt={title} width="294px"/>
                                    </Fade>
                                </Col>
                                <Col span={17} offset={1}>
                                    <Fade>
                                        <Title className="movieName">
                                            {title}
                                        </Title>
                                        <Title level={2} className="movieTagline">{tagline}</Title>
                                        <Paragraph className="overview">
                                            {overview}
                                        </Paragraph>
                                        <div>{tags}</div>
                                    </Fade>
                                </Col>
                                
                                <Col span={17} offset={1} className="prodCompanies">
                                    <Divider>Production Companies</Divider>
                                    {companies}
                                </Col>  
                             
                            </Row>
                            <Row>
                                <Col span={24} className="cast">
                                    <Divider>Cast And Crew</Divider>
                                    {casts}
                                </Col>
                            </Row>
                        </div>
                );
        }else 
            return (<Empty />);
    }
}

export default MovieDetails;