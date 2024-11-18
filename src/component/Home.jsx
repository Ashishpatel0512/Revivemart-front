import { Link } from 'react-router-dom';
import Navbar from './Navbar';

import { useEffect,useState } from "react";
import './Home.css'
import { data } from "autoprefixer";

  export default function Example() {

    const [products, setproduct] = useState([])
    console.log("proddddddddddddddddddddddddddddddddddddddddddddddddddddddd",products)
    const [showproducts, setshowproduct] = useState([])
    console.log(showproducts)
    const [user, setuser] = useState([])
    const [url,seturl] = useState([])
    const [catagoryss, Changcatagorys] = useState(undefined)
    const [greater, Changgreater] = useState(undefined)
    const [less, Changless] = useState(undefined)
    const [searchitem,setsearch] = useState(undefined)



    useEffect(() => {
      setshowproduct(products);
    }, [products]); 

    //age filters

    const setage=(e)=>{
      let value=e.target.value;
      console.log("age",value)
      if(value=="1"){
        Changgreater("0");
        Changless("4");
      }
      if(value=="2"){
        Changgreater("3");
        Changless("7");
      }
      if(value=="3"){
        Changgreater("6");
        Changless("10");
      }
      if(value=="4"){
        Changgreater("9");
        Changless("51");
      }
    }
    const catagorysEc = (e) => {
      Changcatagorys("Electronic")
  };
  const catagorysFr = (e) => {
    Changcatagorys("Funicher")
};
 const catagorysVl = (e) => {
  Changcatagorys("Vehicals")
};
const search = (e) => {
  let value=e.target.value;
  console.log("search",value)
  setsearch(value)
  const result = (products.filter(product => product.name.startsWith(`${value}`)));
  console.log("search",result); 
  setshowproduct(result)
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
        fetch(`http://localhost:3001/show/?catagory=${catagoryss}&greater=${greater} &less=${less}`,{
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
      },[catagoryss,Changcatagorys,greater,less,Changgreater,Changless])
    
      const showform = async (e) => {
        const form=document.querySelector(".form").classList.toggle("myStyle");;
        console.log(form)
      //   table.style.opacity="0.2"
        }

console.log(user)
console.log(products)


    return (
      <>
      <Navbar user={user} url={url}></Navbar><br /><br /><br /><br />
    {/* search bar */}
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <input
        type="text"
        name="search"
        value={searchitem}
        onChange={search}
        placeholder="Search here..."
        style={{ position: "fixed" ,top:"80px",marginBottom:"-100px", marginLeft:"20%",adding: "8px", fontSize: "25px", width: "1000px",height:"30px",backgroundColor:"white" }}
      />
          </div>
      <br />
      <div className='grid'>
        <div className='filt'>
          <h4>Filters</h4><hr />
         
          <img src="https://as2.ftcdn.net/v2/jpg/03/04/51/69/1000_F_304516933_igZeVhkvymc65Z1YHkPiF8glb3y8b3x9.jpg" onClick={catagorysEc}  alt=""  className='catagory ca'/>
          <p>Electronic</p><br />
          <img src="https://cdn.vectorstock.com/i/1000v/86/45/car-icon-logo-design-black-symbol-isolated-vector-30688645.jpg" alt="" onClick={catagorysVl} className='catagory cb'/>
          <p>Vehicals</p><br />
          <img src="https://i.pinimg.com/originals/c4/09/b3/c409b332604c0f8acb5dd0f0f569a8b8.png" alt=""  onClick={catagorysFr} className='catagory cc'/>
          <p>Funicher</p>
          <img src="https://vectorified.com/images/filter-icon-1.png" className='catagory' alt="" onClick={showform} />
          <p>OTHER FILTERS</p>

          {/* <img src="https://cdn3.vectorstock.com/i/1000x1000/60/17/clothing-logo-template-vector-23896017.jpg" alt=""  onClick={catagorysFn} className='catagory cc'/>
          <p>Fashion </p>
          <img src="https://thumbs.dreamstime.com/z/logo-concept-featuring-basketball-player-white-black-capturing-dynamic-energy-sport-282640720.jpg" alt=""  onClick={catagorysSt} className='catagory cc'/>
          <p>Sports</p>
          <img src="https://clipart-library.com/images/BcaKKBR7i.png" alt=""  onClick={catagorysBk} className='catagory cc'/>
          <p>Books</p> */}

        </div>
      
       <div className="div">
      {showproducts.sort(() => 0.5 - Math.random()).map((product) => (
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
      
      <form action="" className='form myStyle'>
      <h4>Filters</h4><hr />
         <div className='catalist'>
         &nbsp;&nbsp;&nbsp;&nbsp;<div><img src="https://as2.ftcdn.net/v2/jpg/03/04/51/69/1000_F_304516933_igZeVhkvymc65Z1YHkPiF8glb3y8b3x9.jpg" onClick={catagorysEc}  alt=""  className='catagory ca'/> <p>Electronic</p></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div><img src="https://cdn.vectorstock.com/i/1000v/86/45/car-icon-logo-design-black-symbol-isolated-vector-30688645.jpg" alt="" onClick={catagorysVl} className='catagory cb'/><p>Vehicals</p></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <div><img src="https://i.pinimg.com/originals/c4/09/b3/c409b332604c0f8acb5dd0f0f569a8b8.png" alt=""  onClick={catagorysFr} className='catagory cc'/><p>Funicher</p></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         
         </div>
    <div className='old'><input type="radio" id="age" name="fav_language" value="1"  onChange={setage}/><p className='olds'>1-3 YEAR/OLD</p></div>
    <div className='old'><input type="radio" id="age" name="fav_language" value="2"  onChange={setage} /><p className='olds'>3-6 YEAR/OLD</p></div>
     <div className='old'><input type="radio" id="age" name="fav_language" value="3" onChange={setage}/><p className='olds'>6-9 YEAR/OLD</p></div>
    <div className='old'><input type="radio" id="age" name="fav_language" value="4" onChange={setage}/><p className='olds'>10.. YEAR/OLD</p></div>
    </form>
     {/* //search */}
     {/* <form action="">
     <input type="text" name='search' value={searchitem} onChange={search} />
      </form> */}
      </>
    )
  }