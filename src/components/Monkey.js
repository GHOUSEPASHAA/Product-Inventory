import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { Button } from 'react-bootstrap'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
export class AddProducts extends Component {
    articles=[
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
    ]


    constructor(){
        super()
        this.state = {
            articles: this.articles,
            loading: false,
            page :1
        }
    }
    static propTypes={
    category:PropTypes.string
}
    static defaultProps={
    category:'general'
    }

    async componentDidMount(){
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=fr&category=${this.props.category}&apiKey=d0f323c254304bc8902c092fec642828&pageSize=5`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parseddata = await data.json()
        this.setState({
            articles: parseddata.articles,
            loading:false
            

        })
    }
 handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=fr&category=${this.props.category}&apiKey=d0f323c254304bc8902c092fec642828&page=${this.state.page - 1}&pageSize=5`;
     let data = await fetch(url);
      this.setState({
            loading:true
        })
     
     this.setState({
            loading:true
        })
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading:false
    })
}
    handleNextClick = async () => {
    console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) 
        {
    
        let url = `https://newsapi.org/v2/top-headlines?country=fr&category=${this.props.category}&apiKey=d0f323c254304bc8902c092fec642828&page=${this.state.page + 1}&pageSize=5`;
       this.setState({
            loading: true
        })
       
            let data = await fetch(url);
        
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading:false
        })
    }
    }
    
    render() {
      
    return (
        <div className='container'>
            {this.state.loading && <Spinner />}
            <h1 className='text-center'>welcome to monkey news</h1>
           
            <div className='row my-9' >
                {!this.state.loading && this.state.articles.map((element) => {
            return (<div className='col-md-4'  key={element.url}>
                <NewsItem key={element.url} title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} newsurl={element.url} />
                </div>);
          })}
               
                
            </div>
            <div className="d-flex justify-content-between">
                <Button variant="secondary" disabled={this.state.page<=1} onClick={this.handlePrevClick}>&larr;previous</Button>
                <Button variant="secondary" onClick={this.handleNextClick}>next &rarr;</Button>
            </div>
            
        </div>
        
    )
  }
}

export default AddProducts
