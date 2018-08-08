import React, { Component } from 'react';
import logo from '../../logo.svg';
import styled from 'styled-components'
import { media, slugify } from '../../helpers'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchSets, createSet } from '../../actions/setActions'
import PropTypes from 'prop-types'

const ASPECT_RATIO = 373 / 289
const WIDTH = (28900 / 1440)

const SetGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 80%;
  margin: 64px auto 0;
  height: ${ASPECT_RATIO * WIDTH}vw;
  max-height: 373px;

  .grid-card {
    border: 1px solid #888;
    max-width: 420px;

    img {
      width: 100%;
    }

    a {
      text-decoration: none;
      color: #444;
    }

    :hover {
      transform: translateY(-7px);
      transition: all 200ms cubic-bezier(0.39, 0.575, 0.565, 1);
      box-shadow: 0 14px 27px 0 rgba(60, 70, 68, 0.25);

      ${media.phone`
        transform: none;
        transform: none;
        box-shadow: none;
      `}
    }
  }

  ${media.phone`
    grid-template-columns: 1fr;
    width: 95%;
    margin: 32px auto 0;
  `}
`

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      artist: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    // MOVED FETCH INTO REDUX
    this.props.fetchSets()
  }

  static getDerivedStateFromProps (props, state) {
    let objToRtn = {}
    if (Object.keys(props.newSet).length > 0) {
      objToRtn = {
        ...objToRtn,
        sets: props.sets.push(props.newSet.sets)
      }
    }

    if (Object.keys(objToRtn).length > 0) {
      return objToRtn
    } else {
      return null
    }
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value})
  }

  onSubmit (e) {
    e.preventDefault()

    const payload = {
      title: this.state.title,
      artist: this.state.artist
    }

    this.props.createSet(payload)
  }

  render() {
    const renderSetList = this.props.sets.map((set) => (
      <div className='grid-card' key={set.slug}>
        <Link to={`/set/${slugify(set.title)}`}>
          <iframe
            width="100%"
            height="315px"
            src={set.url}
            frameborder="0">
          </iframe>
          <h2>{set.title}</h2>
          <p>Artist: {set.artist}</p>
          <p>Location: {set.location}</p>
        </Link>
      </div>
    ))

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Homepage</h1>
        </header>

        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title: </label>
            <br />
            <input
              type='text'
              name='title'
              onChange={this.onChange}
              value={this.state.title} />
          </div>
          <div>
            <label>Artist: </label>
            <br />
            <input
              type='text'
              name='artist'
              onChange={this.onChange}
              value={this.state.artist} />
          </div>
          <br />
          <button type='submit'>Submit</button>
        </form>
        <hr />

        <SetGridContainer>
          { renderSetList }
        </SetGridContainer>
      </div>
    )
  }
}

Home.propTypes = {
  fetchSets: PropTypes.func.isRequired,
  sets: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  sets: state.sets.items,
  newSet: state.sets.item
})

export default connect(mapStateToProps, { fetchSets, createSet })(Home)
