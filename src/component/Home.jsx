import { Link } from 'react-router-dom';
import Navbar from './Navbar';

import { useEffect,useState } from "react";
import './Home.css'
import { data } from "autoprefixer";

  export default function Example() {

    const [products, setproduct] = useState([])
    const [user, setuser] = useState([])
    const [url,seturl] = useState([])

    const [catagoryss, Changcatagorys] = useState(undefined)

    const catagorysEc = (e) => {
      Changcatagorys("Electronic")
  };
  const catagorysFr = (e) => {
    Changcatagorys("Funicher")
};
 const catagorysVl = (e) => {
  Changcatagorys("Vehicals")
};
// const catagorysFn = (e) => {
//   Changcatagorys("Fashion")
// };
// const catagorysSt = (e) => {
//   Changcatagorys("Sports")
// };
// const catagorysBk = (e) => {
//   Changcatagorys("Books")
// };
console.log("catagorys"+catagoryss)

    useEffect(()=>{
        fetch(`http://localhost:3001/show/?catagory=${catagoryss}`,{
          headers:{
            "Authorization":localStorage.getItem("token")

          }
        })
        .then(res => res.json())
        .then((data)=>{
          setproduct(data.list)
          setuser(data.data)
          seturl(data.data.image.url)

        }
        ).catch(err=>{
          console.log("this is error",err)
        });
      },[catagoryss,Changcatagorys])
    


console.log(user)
console.log(products)


    return (
      <>
      <Navbar user={user} url={url}></Navbar>

      <div className='grid'>
        <div>
          <h4>Filters</h4><hr />
         
          <img src="https://as2.ftcdn.net/v2/jpg/03/04/51/69/1000_F_304516933_igZeVhkvymc65Z1YHkPiF8glb3y8b3x9.jpg" onClick={catagorysEc}  alt=""  className='catagory ca'/>
          <p>Electronic</p><br />
          <img src="https://cdn.vectorstock.com/i/1000v/86/45/car-icon-logo-design-black-symbol-isolated-vector-30688645.jpg" alt="" onClick={catagorysVl} className='catagory cb'/>
          <p>Vehicals</p><br />
          <img src="https://i.pinimg.com/originals/c4/09/b3/c409b332604c0f8acb5dd0f0f569a8b8.png" alt=""  onClick={catagorysFr} className='catagory cc'/>
          <p>Funicher</p>
          {/* <img src="https://cdn3.vectorstock.com/i/1000x1000/60/17/clothing-logo-template-vector-23896017.jpg" alt=""  onClick={catagorysFn} className='catagory cc'/>
          <p>Fashion </p>
          <img src="https://thumbs.dreamstime.com/z/logo-concept-featuring-basketball-player-white-black-capturing-dynamic-energy-sport-282640720.jpg" alt=""  onClick={catagorysSt} className='catagory cc'/>
          <p>Sports</p>
          <img src="https://clipart-library.com/images/BcaKKBR7i.png" alt=""  onClick={catagorysBk} className='catagory cc'/>
          <p>Books</p> */}

        </div>
      
       <div className="div">
      {products.sort(() => 0.5 - Math.random()).map((product) => (
        <Link to={`/show/${product._id}`} className='underline'>
        <div className="product">
<img src={product.image[0].url} alt="" />
<p className='item'>{product.name}</p>
<p className='itemone'>{product.price} &#x20b9;</p>
<p>{product.age} year/old</p>

        </div>
        </Link>
      ))}
      </div>
      </div>
      
      {/* <form action="">
  <input type="radio" id="Electronic" name="fav_language" value="Electronic" onChange={catagorys}/><br />
  <input type="radio" id="Vehicals" name="fav_language" value="Vehicals" onChange={catagorys}/><br />
  <input type="radio" id="Funicher" name="fav_language" value="Funicher" onChange={catagorys}/><br />
</form> */}
      </>
    )
  }