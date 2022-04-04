import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../style/AdminEditUser.css";
import { callApi} from "../axios-services";
import useUser from "../hooks/useUser";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const AdminEditUser = ({token

}) => {
  const {user}=useUser()
  const [users, setUsers] = useState([])
  const [userToEdit, setUserToEdit] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [errors, setErrors] = useState([]);
  

  const handleUsers = async () =>{
    try{
    const users = await callApi({ method: 'get', url: `/users`, token:token });
    console.log('this is all the users ', users)
    setUsers(users);
    }catch(error){
      setErrors(error.message);
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
          setErrors(error.message);
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
        {/* <div className="edit-user-form-title"> Edit Username</div> */}
        <form className="edit-user-form" >
          {users.map((user) => {
            const { id } = user;
            return (
              <div key={user.id}>
                {id == userId && (
                  <>
                      <Container>
        <Row className="window1 m-auto">
        {errors && (<div style={{ marginTop: "1em", color: "red" }}>
                      {errors}
                    </div>
                  )}
            <Col lg={5} md={6} sm={12} className="window p-5 m-auto shadow-lg">
              <h3
                className="text-title text-center"
                style={{ overflowY: "hidden" }}
              >Edit User
              </h3>
        <Form className="edit-product-form" >
        <Form.Group
                  className="form-Basic-username"
                  controlId="formBasicUsername"
                >
                    <Form.Control
                      className="username-input"
                      type="text"
                      label="username"
                      variant="outlined"
                      required
                      placeholder="username"
                      value={userToEdit.username}
                      onChange={(event) =>
                        setUserToEdit({
                          ...userToEdit,
                          username: event.target.value,
                        })
                      }
                    />
                </Form.Group>
                <Form.Group
                  className="form-Basic-password"
                  controlId="formBasicPassword"
                >
                  <Form.Control
                      className="password-input"
                      type="text"
                      label="password"
                      variant="outlined"
                      required
                      placeholder="password"
                      value={userToEdit.password}
                      onChange={(event) =>
                        setUserToEdit({
                          ...userToEdit,
                          password: event.target.value,
                        })
                      }
                      />
                </Form.Group>
                <Form.Group
                  className="form-Basic-email"
                  controlId="formBasicEmail"
                >
                  <Form.Control
                      className="email-input"
                      type="text"
                      label="email"
                      variant="outlined"
                      required
                      placeholder="email"
                      value={userToEdit.email}
                      onChange={(event) =>
                        setUserToEdit({
                          ...userToEdit,
                          email: event.target.value,
                        })
                      }
                      />
                      </Form.Group>
                      <Form.Group
                        className="form-Basic-isActive"
                        controlId="formBasicIsActive"
                      >
                        <Form.Control
                      className="isActive-input"
                      type="text"
                      label="isActive"
                      variant="outlined"
                      required
                      placeholder="isActive"
                      value={userToEdit.isActive}
                      onChange={(event) =>
                        setUserToEdit({
                          ...userToEdit,
                          isActive: event.target.value,
                        })
                      }
                    />
                    </Form.Group>
                    <Button id="submit-button" type="submit" 
                    style={{ background: "#557272", border: "none" }}
                    className ="edit-user-button"
                    onClick={(e)=>{e.preventDefault(); navigate(`/admin-page/users`);
                     handleEditUser(userToEdit)}}>Create</Button>
                     </Form>
        </Col>
          </Row>
        </Container>
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