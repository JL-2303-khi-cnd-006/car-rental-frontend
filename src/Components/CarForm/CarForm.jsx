import React, { useState, useEffect } from 'react'
import styles from './carform.module.css'
import { useNavigate, useParams} from 'react-router-dom'

export const CarForm = () => {
    
    const navigate = useNavigate();
    const [getCarById, setGetCarById] = useState({});
    const [driverName , setName] = useState("");
    const [email , setEmail] = useState("");
    const [address , setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [licenseNumber, setLicense] = useState("")
    const [pickDate , setPickDate] = useState("");
    const [returnDate , setReturnDate] = useState("");
    const [checkBox , setCheckbox] = useState(false)
    const [totalAmount, setTotalAmount] = useState("");
    const {id} = useParams();

    
    useEffect(()=>{
      
      fetch(`http://Localhost:8080/car/${id}`)
      .then(res => res.json())
      .then((data) =>{
        setGetCarById(data);
        
        let previousData = localStorage.getItem("newdata");
        previousData = JSON.parse(previousData);
        setName(previousData?.driverName);
        setAddress(previousData?.address);
        setEmail(previousData?.email);
        setPhoneNumber(previousData?.phoneNumber);
        setLicense(previousData?.licenseNumber);
        setPickDate(previousData?.pickDate);
        setReturnDate(previousData?.returnDate);
        
      })
        
      },[id])

      const handleTotalAmount=()=>{
          if(pickDate && returnDate && checkBox === true){
            const pick = new Date(pickDate);
            const retn = new Date(returnDate);
            const date = retn.getTime() - pick.getTime();
            const totalNights = Math.ceil(date / (1000 * 3600 * 24));
            const price = totalNights*(getCarById.rental_fee_per_day);
            const finalPrice = price + (totalNights*15000);
            setTotalAmount(finalPrice); 
            return finalPrice;
          } 
          else {
          
            const pick = new Date(pickDate);
            const retn = new Date(returnDate);
            const date = retn.getTime() - pick.getTime();
            const totalNights = Math.ceil(date / (1000 * 3600 * 24));
            const price = totalNights*(getCarById.rental_fee_per_day);
            setTotalAmount(price);
            return price;
        }
      }
      
      const handleChange = () => {
        const data = {
          driverName: driverName,
          address: address,
          email: email,
          phoneNumber: phoneNumber,
          licenseNumber: licenseNumber,
          pickDate: pickDate,
          returnDate: returnDate,
      }
      localStorage.setItem("newdata", JSON.stringify(data));
      console.log(data)
        navigate('/')
      }
      
      const handleCheckout = (e) => {
      
        e.preventDefault();

        if(checkBox === false){
        let data = {
          carId: getCarById.id,
          driverName: driverName,
          email: email,
          address: address,
          phoneNumber: phoneNumber,
          licenseNumber: licenseNumber,
          pickDate: pickDate,
          returnDate: returnDate,
          totalPrice: handleTotalAmount()
        }

        fetch("http://localhost:8081/rentalForm/add",{
          method: "POST",
          headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
          }).then(res => {
            console.log(res)
          })
        
          .catch(error => console.log('posting error', error))
          localStorage.clear();
          navigate('/thanks')

    } else{
      let data = {
        carId: getCarById.id,
        driverName: driverName,
        email: email,
        address: address,
        phoneNumber: phoneNumber,
        licenseNumber: licenseNumber,
        pickDate: pickDate,
        returnDate: returnDate,
        totalPrice: handleTotalAmount()
      }

      fetch("http://localhost:8081/rentalForm/add",{
        method: "POST",
        headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
        }).then(res => {
          console.log(res)
        })
      
        .catch(error => console.log('posting error', error))
        localStorage.clear();
    }
    navigate('/thanks')
  } 
    return (
    <div className={styles.fullFormPage}>
        <div className={styles.form}>
        <div className={styles.details}>
            <img src={getCarById.image} alt='' className={styles.img}/>

            <div className={styles.info}>
            <h2> {getCarById.name}</h2>
            <p> {getCarById.short_dsrp}.</p>
            <p> Price : Rs {getCarById.rental_fee_per_day}</p>
            
            </div>
            <div className={styles.amount}>
            <div class="form-check">
              <input 
              class="form-check-input" 
              type="checkbox" 
              value={checkBox} 
              id="flexCheckChecked" 
              onClick={(e)=>(setCheckbox(e.target.checked))} 
              readOnly
              />
              <label class="form-check-label" for="flexCheckChecked">
                Damage Waiver of Rs 15,000 is required.
              </label>
            </div>
            <div className={styles.price}>
            <label> Total Amount: Rs </label> 
            <input type="text" value={totalAmount} />
            </div>
          </div>
          </div>
        <form onSubmit={handleCheckout} >
        <div className={styles.detailForm}>
        <h2 className={styles.detailTitle}>Fill the Form for booking</h2>
        <br/>
            <label>Name:</label>
            <input 
            type='Text' 
            value={driverName} 
            onChange={(e)=> setName(e.target.value)} 
            name='name'
            required 
            />

            <label>Email:</label>
            <input 
            type='Text' 
            value={email} 
            onChange={(e)=>(setEmail(e.target.value))}
            name='email'
            required 
            />

            <label>Address:</label>
            <input 
            type='Text' 
            value={address} 
            onChange={(e)=>setAddress(e.target.value)} 
            name='address'
            required 
            />

            <label>Phone Number:</label>
            <input 
            type='Text' 
            value={phoneNumber} 
            onChange={(e)=>setPhoneNumber(e.target.value)} 
            name='address'
            required 
            />

            <label>License Number:</label>
            <input 
            type='Text' 
            value={licenseNumber} 
            onChange={(e)=>setLicense(e.target.value)} 
            name='address'
            required 
            /><br/>

            <label>Pick Up at:</label>
            <input 
            type='DateTime-local'  
            value={pickDate} 
            onChange={(e)=>setPickDate(e.target.value)} 
            name='pickDate'
            required 
            /><br/>
            
            <label>Return at:</label>
            <input 
            type='DateTime-local' 
            value={returnDate} 
            onChange={(e)=>setReturnDate(e.target.value)} 
            name='returnDate'
            required 
            /><br/>

            
            <br/>
            </div>
            <div className={styles.btns}>
            <button 
            type="" 
            class="btn btn-outline-dark" 
            data-mdb-ripple-color="dark"
            onClick={handleChange}>
              Change Car
            </button>
            <button 
            type="submit" 
            class="btn btn-outline-dark" 
            data-mdb-ripple-color="dark">
              Checkout
            </button>
            </div>
        </form>
        </div> 
    </div>
  )
}
