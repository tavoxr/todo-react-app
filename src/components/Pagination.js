import React, {useState} from 'react'


function Pagination(props){

    const [pageNumberLimit, setPageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(1)

    const {totalTasks, tasksPerPage, paginate, currentPage, setCurrentPage} = props
    const pageNumbers = []


    for(let i=1; i <= Math.ceil(totalTasks/ tasksPerPage); i++ ){
        
        pageNumbers.push(i)

    }
       
    const renderPagesNumbers = pageNumbers.map((pageNumber)=>{

        if(pageNumber <= maxPageNumberLimit && pageNumber >= minPageNumberLimit ){
            return(
                <li key={pageNumber} className={ currentPage == pageNumber ? "page-item active": "page-item"}  >
                    <a onClick={()=>paginate(pageNumber)} className="page-link bg-dark text-white" href="#">
                        {pageNumber}
                    </a>
                </li>
            )
        }else{
            return null
        }
    })

    const handlePreviousBtn = ()=>{
        setCurrentPage(currentPage - 1)
        
        if((currentPage -1) % pageNumberLimit == 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit )
        }
    }

    const handleNextBtn = ()=>{
        setCurrentPage(currentPage + 1)

        if(currentPage >= maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit )
        }
    }

    let pageIncrementBtn = null
    if(pageNumbers.length > maxPageNumberLimit){
        pageIncrementBtn = <li className="page-link bg-dark text-white"  onClick={handleNextBtn}> &hellip; </li>
    }

    let pageDecrementBtn = null
    if(pageNumbers.length < maxPageNumberLimit){
        pageDecrementBtn = <li className="page-link bg-dark text-white" onClick={handlePreviousBtn}> &hellip; </li>
    }

    
        

    return(
        <nav aria-label="Page navigation example" >
            <ul className="pagination">
            <li  className="page-item" >
                    <button  onClick={handlePreviousBtn} 
                        className="page-link bg-dark text-white" 
                        href="#"
                        disabled={currentPage == pageNumbers[0] ? true: false}
                        >
                        Previous
                    </button>
                </li>
                {pageDecrementBtn}
                {renderPagesNumbers}
                {pageIncrementBtn}   
                <li className="page-item"  >
                    <button onClick={handleNextBtn} 
                            className="page-link bg-dark text-white" 
                            href="#"
                            disabled={currentPage == pageNumbers.length ? true : false}        
                        >   
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    )
}


export default Pagination;
