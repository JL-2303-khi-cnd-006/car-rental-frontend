import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styles from './cardetails.module.css'
import { useNavigate } from 'react-router-dom';

export const CarDetails = () => {
  
  const [getCarById, setGetCarById] = useState({});
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{

    fetch(`http://Localhost:8080/car/${id}`)
    .then(res => res.json())
    .then(data =>(
      setGetCarById(data)
    )
      )

  },[id])

  
  return (
    <div className={styles.detailPage} key={getCarById.id}>
          <div className={styles.details}>
            <img src={getCarById.image} alt='' className={styles.img}/>

            <div className={styles.info}>
            <h2> {getCarById.name}</h2>
            <p> {getCarById.long_dsrp}.</p>
            <p> Price : Rs {getCarById.rental_fee_per_day}</p>
            
            </div>
            
            <button type="button" class="btn btn-outline-secondary" data-mdb-ripple-color="dark" onClick={()=>{ navigate(`/form/${getCarById.id}`)}}>Rent Me Now</button>
          </div>
    </div>
  )
}
