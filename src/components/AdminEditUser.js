import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/index.css";
import { callApi} from "../axios-services";
import { ProductImage, ProductInfo, ProductCard } from ".";
import { Button, Card} from "react-bootstrap";
import cardplaceholder from "../imgs/cardplaceholder.png";
import useUser from "../hooks/useUser";

const AdminEditUser = ({token

}) => {
  const {user}=useUser()
  const [users, setUsers] = useState([])
  const [userToEdit, setUserToEdit] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();
  

  const handleUsers = async () =>{
    try{
    const users = await callApi({ method: 'get', url: `/users`, token:token });
    console.log('this is all the users ', users)
    setUsers(users);
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    handleUsers()
    },[setUsers, token]);

  const handleEditUser= async ({id,username, password, email, isActive}) => {
      try {
      localStorage.clear();
      const editUser = await callApi({
        url: `/users/${id}`,
        method: "patch",
        token:token,
        body: {username, password, email, isActive},
      });
      console.log("editUser", editUser);
        } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    const userToEdit = users.find((user) => {
      return user.id === userId * 1;
    });
    setUserToEdit(userToEdit);
  }, [users]);
  console.log("userToEdit", userToEdit)
  
  if (!userToEdit) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="edit-a-user">
        <div className="edit-user-form-title"> Edit Username</div>
        <form className="edit-user-form" >
          {users.map((user) => {
            const { id } = user;
            return (
              <div key={user.id}>
                {id == userId && (
                  <>
                    <input
                      id="username-input"
                      type="text"
                      placeholder="username"
                      value={userToEdit.username}
                      onChange={(event) =>
                        setUserToEdit({
                          ...userToEdit,
                          username: event.target.value,
                        })
                      }
                      required
                    />
                    <input
                      id="password-input"
                      type="text"
                      placeholder="password"
                      value={userToEdit.password}
                      onChange={(event) =>
                        setUserToEdit({
                          ...userToEdit,
                          password: event.target.value,
                        })
                      }
                      required
                    />
                    <input
                      id="email-input"
                      type="text"
                      placeholder="email"
                      value={userToEdit.email}
                      onChange={(event) =>
                        setUserToEdit({
                          ...userToEdit,
                          email: event.target.value,
                        })
                      }
                      required
                    />
                     <input
                      id="isActive-input"
                      type="text"
                      placeholder="isActive"
                      value={userToEdit.isActive}
                      onChange={(event) =>
                        setUserToEdit({
                          ...userToEdit,
                          isActive: event.target.value,
                        })
                      }
                      required
                    />
                    <button id="submit-button" type="submit" onClick={(e)=>{e.preventDefault(); navigate(`/admin-page/users`);
                     handleEditUser(userToEdit)}}>Submit</button>
                  </>
                )}
              </div>
            );
          })}
        </form>
      </div>
    </>
  );
};

export default AdminEditUser;