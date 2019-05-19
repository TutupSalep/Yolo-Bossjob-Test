import React from 'react'

import Logo from '../../../assets/images/Logo.svg'
import './Header.css'

const Header = () => (
  <header className="Header">
    <img src={Logo} width="120" alt="Bossjob"/>
  </header>
)

export default Header