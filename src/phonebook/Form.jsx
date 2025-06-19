

function Form({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) {

    return (
        <>
            <h3>Phonebook</h3>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                {/* <div>debug: {newName}</div> */}
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}


export default Form;