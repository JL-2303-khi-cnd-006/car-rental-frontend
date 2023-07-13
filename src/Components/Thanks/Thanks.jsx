import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './thanks.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmileBeam } from '@fortawesome/free-solid-svg-icons'

const Thanks = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }
    
    return (
        <div className={styles.top}>
    <div className={styles.thanks}>
    <FontAwesomeIcon icon={faFaceSmileBeam} className={styles.icon}/>
        <h2> Thank You for Your Order </h2>
        <button type="button" class="btn btn-outline-light" onClick={handleClick}>Start Over</button>
    </div>
    </div>
  )
}

export default Thanks