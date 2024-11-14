
import './filters.css'

function Filters({catagorys}){
    return(
        <>
  <input type="radio" id="Electronic" name="fav_language"className='cat' value="Electronic" onChange={catagorys}/><br />
  <input type="radio" id="Vehicals" name="fav_language" className='cat' value="Vehicals"  onChange={catagorys}/><br />
  <input type="radio" id="javascript" name="fav_language" className='cat' value="JavaScript"/><br />
        </>
        
    )
}

export default Filters