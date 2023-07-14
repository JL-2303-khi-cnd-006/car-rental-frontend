import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './carlist.module.css'
import { useNavigate } from 'react-router-dom';

export const CarList = () => {
    
    const [getCar, setGetCar] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(()=>{
        fetch("http://localhost:8080/car/getList")
        .then(res => res.json())
        .then(data => {
            setGetCar(data);
            console.log(data)
            setLoading(false);
           } )
    },[])
        
  
    return (
    <div className={styles.carList} >
        {loading ?  "loading..."
        :
        getCar.map((item, index) => {
          if(index < 5){
            return <div className={styles.card} key={item.id}>
              <img src={item.image} alt='' />

              <div className={styles.info}>
             <h2><Link to={`/details/${item.id}`}>{item.name}</Link></h2>
              <p>{item.short_dsrp}</p>
              <div className={styles.list}>
              <p><b>Price Per Day: </b>Rs {item.rental_fee_per_day}</p>
              </div>
              {/* <button onClick={()=>{ navigate(`/form/${item.id}`)}}>Rent Me Now</button> */}
              <button type="button" class="btn btn-outline-secondary" data-mdb-ripple-color="dark" onClick={()=>{ navigate(`/form/${item.id}`)}}>Rent Me Now</button>

              </div>

        </div>
}
})
    }

    </div>
  )
}
