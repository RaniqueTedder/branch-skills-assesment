import { useState } from "react";
import React from 'react';
import { gql } from 'apollo-boost';
import { useParams, useNavigate } from "react-router-dom";
import './index.css';
import { useMutation } from "@apollo/react-hooks";
import { ALL_USERS_QUERY } from './queries';

const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser($email: ID!,$newAttributes: UserAttributesInput!) {
        updateUser(email: $email, newAttributes: $newAttributes ) {
            name
            role   
        }
    }
`;

export function Edit({ data }) {
    const { email } = useParams();
    const navigate = useNavigate();
    const selectedUser = data.allUsers.find((user) => user.email === email);
    const [userName, setUserName] = useState(selectedUser.name);
    const [userRole, setUserRole] = useState(selectedUser.role);
    const [updateUser] = useMutation(UPDATE_USER_MUTATION, { refetchQueries: [ {query:ALL_USERS_QUERY} ] });

    const handleUpdate = () => {
        console.log('Exit Edit Mode');
        updateUser({
            variables: {
                email,
                newAttributes: {
                    name: userName,
                    role: userRole
                }
            },
        });
        navigate('/');
    }


    return (
        <section>
            <header>
                <h1>{email}</h1>
                <button
                    type='button'
                    id='saveButton'
                    onClick={handleUpdate}
                >
                    Save
                </button>
            </header>

            <article className='updateForm'>
                <div className='editName'>
                    <label>Name</label>
                    <br />
                    <input
                        type='text'
                        aria-label='User Name'
                        value={userName}
                        onChange={(e) => { setUserName(e.target.value); }}
                    />
                </div>
                <div className='radioRole'>
                    <span>Role</span>
                    <br />
                    <div>
                        <input
                            type='radio'
                            id='admin'
                            name='role'
                            value='ADMIN'
                            checked={userRole === 'ADMIN'}
                            onChange={(e) => { setUserRole(e.target.value); }}
                        />
                        <label htmlFor='admin'>Admin</label>
                        <br />
                        <input
                            type='radio'
                            id='developer'
                            name='role'
                            value='DEVELOPER'
                            checked={userRole === 'DEVELOPER'}
                            onChange={(e) => { setUserRole(e.target.value); }}
                        />
                        <label htmlFor='developer'>Developer</label>
                        <br />
                        <input
                            type='radio'
                            id='app manager'
                            name='role'
                            value='APP_MANAGER'
                            checked={userRole === 'APP_MANAGER'}
                            onChange={(e) => { setUserRole(e.target.value); }}
                        />
                        <label htmlFor='app manager'>App Manager</label>
                        <br />
                        <input
                            type='radio'
                            id='marketing'
                            name='role'
                            value='MARKETING'
                            checked={userRole === 'MARKETING'}
                            onChange={(e) => { setUserRole(e.target.value); }}
                        />
                        <label htmlFor='marketing'>Marketing</label>
                        <br />
                        <input
                            type='radio'
                            id='sales'
                            name='role'
                            value='SALES'
                            checked={userRole === 'SALES'}
                            onChange={(e) => { setUserRole(e.target.value); }}
                        />
                        <label htmlFor='sales'>Sales</label>
                        <br />
                    </div>
                </div>
            </article>
        </section>


    );
}

