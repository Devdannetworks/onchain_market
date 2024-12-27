import React from "react";

type containerProps ={
    children: React.ReactNode;

}

const  Container: React.FC<containerProps> = ({children}) => {
    return(
        <div>
           {children}           
        </div>
    )

}

export default Container;