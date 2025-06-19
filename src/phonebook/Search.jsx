

function Search({search, change}) {
    

    return(
        <>  
            <h3>Filter</h3>
            <div>
                search: <input value={search} onChange={change} />
            </div>
        </>
    )
}

export default Search;