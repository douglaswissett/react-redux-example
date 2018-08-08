import React, { Component } from 'react'
import styled from 'styled-components'
import { media } from '../../helpers'

const YoutubeContainer = styled.div`
  width: 60%;
  margin: 16px auto;

  ${media.phone`
    margin: 0 auto;
    width: 100%;
  `}
`

export default class index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount () {
    console.log('fetching data')
    fetch(`http://localhost:3000/sets/${this.props.match.params.id}`)
      .then(resp => resp.json())
      .then(resp => this.setState({data: resp.data}))
  }

  render() {
    const { data } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{data ? data.title : ''}</h1>
        </header>

        <YoutubeContainer>
          <iframe
            width="100%"
            height="500px"
            src={data ? data.url : ''}
            frameBorder="0">
          </iframe>
        </YoutubeContainer>
      </div>
    )
  }
}


