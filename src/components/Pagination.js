import React from 'react'


function Pagination(props){

    const {totalTasks, tasksPerPage, paginate} = props
    const pageNumbers = []


    for(let i=1; i <= Math.ceil(totalTasks/ tasksPerPage); i++ ){
        
        pageNumbers.push(i)

    }
       
        

    return(
        <nav aria-label="Page navigation example" >
            <ul className="pagination">

                {pageNumbers.map((pageNumber)=>(

                     <li key={pageNumber} className="page-item" >
                        <a onClick={()=>paginate(pageNumber)} className="page-link bg-dark text-white" href="#">
                            {pageNumber}
                        </a>
                    </li>

                ))}                
               
            </ul>
        </nav>
    )
}


export default Pagination;
