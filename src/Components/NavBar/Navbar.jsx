import React from 'react'
import styles from './navbar.module.css'
import logo from '../../logo.png'
export const Navbar = () => {
  return (
    <div className={styles.nav}>
        <img src={logo} alt=''/>
        <h2>KhushAmdeed</h2>
    </div>
  )
}
