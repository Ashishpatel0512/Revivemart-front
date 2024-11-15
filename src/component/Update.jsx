
import { useEffect,useState } from "react"
import { useParams,Navigate } from "react-router-dom"
import axios from 'axios';


function Update(){
    const [file, setFile] = useState(null);
    const [names,Changname]=useState(null);
    const [descriptions,Changdescription]=useState(null);
    const [prices,Changprice]=useState(null);
    const [ages,Changages]=useState(null);
    const [locations,Changlocation]=useState(null);
    const [catagorys,Changcatagory]=useState(null);

    const [others,Changother]=useState(null);
    
    let {productid}=useParams();
    const [data,setdata]=useState([]);
    const [success,setsuccess]=useState(null);
    const [url,seturl]=useState([]);

    useEffect(()=>{
        fetch(`http://localhost:3001/edit/${productid}`,{
            headers:{
                "Authorization":localStorage.getItem("token")


            }
        })
        .then(res => res.json())
        .then((data)=>{
            setdata(data.data);
            seturl(data.data.image[0].url)
        }
        );
      },[])

  console.log(data)

  //update
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
};
const Name = (e) => {
    const selectedFile = e.target.value;
    Changname(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
};
const description = (e) => {
    const selectedFile = e.target.value;
    Changdescription(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
};
const price = (e) => {
    const selectedFile = e.target.value;
    Changprice(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
};
const age = (e) => {
    const selectedFile = e.target.value;
    Changages(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
};
const location = (e) => {
    const selectedFile = e.target.value;
    Changlocation(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
};
const catagory = (e) => {
    const selectedFile = e.target.value;
    Changcatagory(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
};
const other = (e) => {
    const selectedFile = e.target.value;
    Changother(selectedFile)

    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
};
// Function to handle file upload
const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', names||data.name);
    formData.append('description', descriptions||data.description);
    formData.append('price', prices||data.price);
    formData.append('catagory',catagorys||data.catagory);
    formData.append('age', ages||data.age);
    formData.append('location', locations||data.location);
    formData.append('other', others||data.other);

    console.log("FormData object:", formData.get('file')); // Debug: check if file is appended to FormData
    console.log("FormData object:", formData.get('name')); // Debug: check if file is appended to FormData
    console.log("FormData object:", formData.get('description')); // Debug: check if file is appended to FormData
    console.log("FormData object:", formData.get('price'));
    console.log("FormData object:", formData.get('catagory')); // Debug: check if file is appended to FormData
    console.log("FormData object:", formData.get('age')); // Debug: check if file is appended to FormData
    console.log("FormData object:", formData.get('location')); // Debug: check if file is appended to FormData
    console.log("FormData object:", formData.get('other')); // Debug: check if file is appended to FormData

    try {
        await axios.post(`http://localhost:3001/update/${productid}`,formData,{
            headers:{
                "Authorization":localStorage.getItem("token")

            }
        });
        
        alert("product update successfully");
        setsuccess("true");
    } catch (error) {
        console.error("File update error:", error);
    }
};
console.log(descriptions)
    return (
        
        <>
        {success=="true"?<Navigate to="/myproduct" replace={true} />:
        <div>
            <h1>Edit</h1>
        <form onSubmit={handleSubmit} className="form">
            <input type="text" name='name' value={names==null?data.name:names}  onChange={Name} required/><br />
            <input type="text" name='description' value={descriptions==null?data.description:descriptions} onChange={description} required/><br />
            <input type="text" name='price' value={prices==null?data.price:prices} onChange={price} required/><br />
            <input type="text" name='age'   value={ages==null?data.age:ages}  onChange={age} required/><br />
            <input type="text" name='location' value={locations==null?data.location:locations} onChange={location}required/><br />
            <select name="catagory" id="catagory" onChange={catagory}>
             <option value="Funicher">Funicher</option>
             <option value="Electronic">Electronic</option>
             <option value="Vehicals">Vehicals</option>
             <option value="Other">Other</option>
             </select><br />
             <select name="other" id="catagory" onChange={other}>
             <option value="Warranty">Warranty</option>
             <option value="Guaranty">Guaranty</option>
             <option value="Warranty-Guaranty">Warranty-Guaranty</option>
             </select><br />
            {/* <input type="text" name='other'value={others==null?data.other:others} onChange={other} /><br /> */}
            {/* <img src={url} alt="" className="formimg" /><br /> */}
            <input type="file" onChange={handleFileChange}  /><br />
            <button type="submit" className="updatebtn">Update</button><br />
        </form>
        </div>
}
        </>
    )
}

export default Update