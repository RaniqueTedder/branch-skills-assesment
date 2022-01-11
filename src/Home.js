import React, { useState } from 'react';
import './index.css';
import { Link } from "react-router-dom";
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
//import { useParams } from "react-router-dom";

const DELETE_USERS_MUTATION = gql`
    mutation DeleteUsers($emails: [ID]!) {
      deleteUsers(emails: $emails){
        email
      }
    }
`;

export function Home({ data }) {
  //const { email } = useParams();
  const [deleteUsers] = useMutation(DELETE_USERS_MUTATION);
  const [selectedUsers, setSelectedUsers] = useState([]);


  /*const handleAdd = (e) => {
    e.stopPropagation();
    const selectedUser = e.target.id;
    console.log(`Selected User ${selectedUser}`);
    setSelectedUsers((prev) => {
      if (prev.includes(selectedUser)) {
        return prev.filter(user => user !== selectedUser)
      } else {
        return [ ...prev, selectedUser]
      }
    });
    console.log({ selectedUsers })
  }*/

  const handleAdd = (e) => {
    e.stopPropagation();
    const selectedUser = e.target.checked;
    console.log(`Selected User ${selectedUser}`);
    setSelectedUsers(() => {
    
    });
    //console.log({ selectedUsers })
  }


  const handleDelete = () => {
    deleteUsers({
      variables: { email: selectedUsers }
    });
    console.log('Delete Users')
  }

  return (

    <section>
      <header>
        <h1>Users</h1>
        <button onClick={handleDelete}>
          Delete
        </button>
      </header>

      <article className='listContainer'>
        <div className="columnTitle">
          <h4>EMAIL</h4>
          <h4>NAME</h4>
          <h4>ROLE</h4>
        </div>

        {data.allUsers.map((user) => {
          return (
            <Link
              to={`/edit/${user.email}`}
              key={user.email}
              style={{ textDecoration: "none", color: "black" }}
            >
              <li>

                <div
                  className="rowData"
                  htmlFor={user}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type='checkbox'
                      id={user.email}
                      name={user}
                      onClick={handleAdd}
                    />
                    <p style={{ paddingLeft: '15px' }}>{user.email}</p>
                  </div>
                  <p>{user.name}</p>
                  <p style={{ textTransform: 'lowercase' }}>{user.role}</p>
                </div>
              </li>
            </Link>
          );
        })}

      </article>
    </section>
  )
}

