import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

import Collection from './part-a/collection';
import Course from './part-a/Course';

import Phonebook from './phonebook/Phonebook';

function App() {
  // const notes = [
  //   {
  //     id: 1,
  //     content: 'HTML is easy',
  //     important: true
  //   },
  //   {
  //     id: 2,
  //     content: 'Browser can execute only JavaScript',
  //     important: false
  //   },
  //   {
  //     id: 3,
  //     content: 'GET and POST are the most important methods of HTTP protocol',
  //     important: true
  //   }
  // ]

  // return (
  //   <>
  //     <Collection notes={notes} />
  //   </>
  // )

  // const course = {
  //   id: 1,
  //   name: 'Half Stack application development',
  //   parts: [
  //     {
  //       name: 'Fundamentals of React',
  //       exercises: 10,
  //       id: 1
  //     },
  //     {
  //       name: 'Using props to pass data',
  //       exercises: 7,
  //       id: 2
  //     },
  //     {
  //         name: 'State of a component',
  //         exercises: 14,
  //         id: 3
  //     }
  //   ]
  // }

 

  return(
    <>
      {/* <Course course={course} /> */}
      <Phonebook />
    </>
  )
}

export default App;