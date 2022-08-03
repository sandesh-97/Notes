import React, { useState, useEffect } from "react";
import "./App.css";
import AddNote from "./Components/AddNote";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Note from "./Components/Note";
import ReactPaginate from "react-paginate";
import PaginatedItems from "./Components/Pagination";
// import ArrayPagination from "@vlsergey/react-bootstrap-array-pagination";
// import Pagination from "react-bootstrap-4-pagination";
// import Pagination from 'react-pagination';
import Pagination from "react-bootstrap/Pagination";

function App() {
  const [addItem, setAddItem] = useState([]);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  const items = loadedMeetups;

  const [idxx, setIdxx] = useState("");

  const setIdx = (id) => {
    return setIdxx(id);
  };

  const getTodo = () => {
    fetch("https://meet-3daf4-default-rtdb.firebaseio.com/todo.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];
        console.log(data);
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }

        console.log(meetups);
        setLoadedMeetups(meetups);
      });
  };

  useEffect(() => {
    getTodo();
  }, []);

  function addMeetupHandler(meetupData) {
    fetch("https://meet-3daf4-default-rtdb.firebaseio.com/todo.json", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "content-Type": "application/json",
      },
    }).then(() => {
      // Navigate    ('/');
      getTodo();
      console.log("abcd");
    });
  }

  function onDelete() {
    fetch(`https://meet-3daf4-default-rtdb.firebaseio.com/todo/${idxx}.json`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    }).then(() => {
      // Navigate    ('/');
      getTodo();
      console.log("abcd");
    });
  }

  useEffect(() => {
    addMeetupHandler(addItem);
  }, [addItem]);

  const AddNotes = (note) => {
    // alert("I'm clicked")

    setAddItem((oldData) => {
      return [...oldData, note];
    });
    console.log(note);
  };
  console.log(addItem);

  // const onDelete = (id) => {
  //   setAddItem((olddata) =>
  //     olddata.filter((currdata, indx) => {
  //       return indx !== id;
  //     })
  //   );
  // };

  return (
    <>
      <Header />

      <AddNote passnote={AddNotes} />

      {loadedMeetups.map((val, index) => {
        return (
          <Note
            key={index}
            id={val[1]}
            title={val[0].title}
            tagline={val[0].tagline}
            content={val[0].content}
            deleteItem={onDelete}
            setIdx={setIdx}
          />
        );
      })}

      <Footer />
      {/* <PaginatedItems itemsPerPage={4} /> */}
    </>
  );
}

export default App;
