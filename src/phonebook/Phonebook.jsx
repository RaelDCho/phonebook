import { useState, useEffect } from "react";
import axios from "axios";

// what?
import personService from '../services/Persons.js';

import List from "./List";
import Form from "./Form";
import Search from "./Search";
import Notification from "./Notification.jsx";

function Phonebook() {
    /* 
        useState functions
    */
    const [persons, setPersons] = useState([]);

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchName, setSearchName] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);

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

        // search if person name is already in the array
        // if person has been found ask user if they want to update with new details (new number)
        // using windows.confirm (like in removePerson function)
        if (persons.find(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())) {
            console.log('Already in list');
            // alertMessage = `\'${newName}\' already exists in the phonebook`;

            if (window.confirm(`\'${newName}\' already exists in the phonebook, do you wish to update the details?`)) {
                updatePerson(newName);
                console.log(`Successfully updated \'${newName}\'`);
                updateMessage(2, newName);
            } else {
                updateMessage(3, newName);
            }
        } else {
            // add person to the array
            // setPersons(persons.concat(newPerson));

            // adding to server
            personService.create(newPerson).then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
            })

            console.log('newPerson is: ', newPerson);
            updateMessage(1, newName);
        }
        
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
        }).catch(error => {
            updateMessage(5, person.name);
            setPersons(persons.filter(p => p.name !== person.name));
        })

        return;
    }

    /* 
        Function for timeout message
    */
    function updateMessage(type, name) {
        /*
            1: added user
            2: existing user, updated user
            3: existing user, did not update
            4: removed user
            5: notification of conflicting errors
            default: log error message and return
        */
        switch(type) {
            case 1:
                setErrorMessage(`successfully added \'${name}\'`);
                break;
            case 2:
                setErrorMessage(`\'${name}\''s details were successfully updated`);
                break;
            case 3:
                setErrorMessage(`details of \'${name}\' were not updated`);
                break;
            case 4:
                setErrorMessage(`successfully removed \'${name}\'`);
                break;
            case 5:
                setErrorMessage(`${name} has already been deleted from server`);
                break;
            default:
                console.log('error on updateMessage');
                break;
        }

        setTimeout(() => {setErrorMessage(null)}, 5000);
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

                // message
                updateMessage(4, deletePerson.name);

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
                <Notification message={errorMessage} />
            </div>
        </>
    )
}

export default Phonebook;