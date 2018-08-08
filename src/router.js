import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import styled from 'styled-components'
import { media } from './helpers/breakpoints'
import { slide as Menu } from 'react-burger-menu'

// Pages
import Home from './routes/Homepage'
import Detail from './routes/Detail'
import About from './routes/About'

const Navbar = styled.ul`
  list-style-type: none;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #333;
  margin: 0;

  .nav-item {
    a {
      display: inline;
      float: left;
      text-decoration: none;
      color: white;
      text-align: center;
      padding: 14px 16px;
      font-size: 17px;
    }
  }

  ${media.phone`
    display: none;
  `}
`

const MobileBurger = styled(Menu)`
  .nav-item {
    a {
      display: block;
      text-decoration: none;
      color: white;
      text-align: center;
      padding: 14px 16px;
      font-size: 17px;
    }
  }
`

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <div>
        <Navbar>
          <li className='nav-item'><Link to="/">Home</Link></li>
          <li className='nav-item'><Link to="/about">About</Link></li>
        </Navbar>
        <MobileBurger>
          <li className='nav-item'><Link to="/">Home</Link></li>
          <li className='nav-item'><Link to="/about">About</Link></li>
        </MobileBurger>

        <Route exact path="/" component={Home}/>
        <Route path="/set/:id" component={Detail}/>
        <Route path="/about" component={About}/>
      </div>
    </Router>
  )
}

export default AppRouter
