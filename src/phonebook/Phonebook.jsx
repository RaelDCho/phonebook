import { useState, useEffect } from "react";
import axios from "axios";

// what?
import personService from '../services/Persons.js';

import List from "./List";
import Form from "./Form";
import Search from "./Search";

function Phonebook() {
    /* 
        useState functions
    */
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 }
    ]);

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchName, setSearchName] = useState('');

    /* 
        axios to connect to json server for backend
    */
    useEffect(() => {
        console.log('effect');
        personService.getAll().then(initialPersons => {
            console.log('promise fulfilled');
            setPersons(initialPersons);
        });
    }, []);

    /* 
        Function to add a new person to the phonebook
    */
    function addPerson(event) {
        event.preventDefault();
        console.log("event: ", event.target);

        // create an object of new person
        const newPerson = {
            name: newName,
            number: newNumber,
            id: (persons.length + 1).toString()
        }

        let alertMessage = ``;

        // search if person name is already in the array
        // if person has been found ask user if they want to update with new details (new number)
        // using windows.confirm (like in removePerson function)
        if (persons.find(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())) {
            console.log('Already in list');
            // alertMessage = `\'${newName}\' already exists in the phonebook`;

            if (window.confirm(`\'${newName}\' already exists in the phonebook, do you wish to update the details?`)) {
                updatePerson(newName);
                console.log(`Successfully updated \'${newName}\'`);
                alertMessage = `\'${newName}\''s details were successfully updated`;
            } else {
                alertMessage = `\'${newName}\''s details were not updated`;
            }
        } else {
            // add person to the array
            // setPersons(persons.concat(newPerson));

            // adding to server
            personService.create(newPerson).then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
            })

            console.log('newPerson is: ', newPerson);
            alertMessage = `\'${newName}\' has been added to the phonebook`;
        }
        
        alert(alertMessage);
        setNewName('');
        setNewNumber('');
        return;
    }

    /*
        Function for updated a person
    */
    function updatePerson(personName) {
        const person = persons.find(p => p.name === personName);
        // console.log(`person: ${person} | personId: ${personId}`); // personId comes out as 7 (because it is length of the array + 1)
        const changedPerson = {...person, number: newNumber};
        personService.update(person.id, changedPerson).then(returnedPerson => {
            setPersons(persons.map(person => person.name === personName ? returnedPerson : person));
        })

        return;
    }

    /* 
        Function for removing a person

        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            will have to rework this
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    */
    function removePerson(personId) {
        const deletePerson = persons.find(person => person.id === personId);
        
        if (deletePerson) {
            if (window.confirm(`do you want to delete ${deletePerson.name}?`)) {
                // remove deleted item from state
                setPersons(persons.filter(person => person.id !== personId));

                // delete from db
                personService.remove(personId);
                return;
            }
        }
    }

    /* 
        Functions to change value in input
    */
    function handleNameChange(event) {
        setNewName(event.target.value);
    }

    function handleNumberChange(event) {
        setNewNumber(event.target.value);
    }

    function handleSearchChange(event) {
        setSearchName(event.target.value);
    }

    return (
        <>
            <div>
                <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
                <Search search={searchName} change={handleSearchChange}/>
                <List persons={persons} search={searchName} remove={removePerson}/>
            </div>
        </>
    )
}

export default Phonebook;