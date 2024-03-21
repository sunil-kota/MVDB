import React from "react";
import './SearchBox.css';

export default function SearchBox(props){
    return(
        <div className="searchBox">
           <div>
           <h1>MVDB</h1>
            </div> 
            <div>
            <input type="text" 
            placeholder="type here to search"
            value={props.searchValue}
            onChange={(event)=>props.setSearchValue(event.target.value)}
             />
            </div>    
        </div>
    )
};