

function List({persons, search, remove}) {

    return (
        <>
            <h3>Numbers</h3>
            <ul>
                {persons.map(person => 
                    {if (person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                        return <li key={person.id}>{person.name} | {person.number}<button onClick={() => remove(person.id)}>delete</button></li>
                    }}
                )}
            </ul>
        </>
    )
}


export default List;