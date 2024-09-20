import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap";
//import "EventHandler";

function App() {
  const [users, setUsers] = useState([]);
  const hostUrl = import.meta.env.PROD
    ? window.location.href
    : "http://localhost:8080/"; // looks for variable env.PROD in GCP, if nots exists it picks localhost url

  //async func looks for the response and react
  const fetchUsers = async () => {
    const response = await fetch(`${hostUrl}api/users`); //wait func
    const usersToJson = await response.json();
    console.log(usersToJson);
    setUsers(usersToJson);
  };

  useEffect(() => {
    //as soon display the result, when the component mounted
    fetchUsers();
  }, []);

  const createUser = async (e) => {
    //e - event
    console.log(e);
    e.preventDefault()  // prevents from reloading the page if there is any changes
    const response = await fetch(`${hostUrl}api/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
     
      body: JSON.stringify({
        name: e.target.name.value,
        isAdmin: e.target.isAdmin.checked,
        isActive: e.target.isActive.checked,
      }),
    });
    const newUser = await response.json();

    setUsers([...users, newUser]); // spread operator and append to array at the end of the array
  };

  const deleteUser = async (e) => {
    await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    await fetchUsers();
  };

  const updateUser = async (e) => {
    const response = await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ isAdmin: e.target.checked }),
    });
    await response.json();
    await fetchUsers();
  };
   
 /* const onsubmit = async (e) =>
  {
    e.preventDefault();
   const submitres=e.target.name.value;
   if (submitres != null){      
    console.log("Enter valid username");
    return;
  }
  else {
   return submitres;
  }  };
*/
  return (
    <>
      <div>
        <h1>New User</h1>
        <form onSubmit={createUser}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="isAdmin">Is Admin</label>
          <input type="checkbox" name="isAdmin" />
          <label htmlFor="isActive">Is Active</label>
          <input type="checkbox" name="isActive" />
          <button type="submit" class="submit">submit</button>
        </form>
     
       <h1>Users</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Is Admin</th>
              <th scope="col">Is Active</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.isAdmin.toString()}</td>
                <td>{user.isActive.toString()}</td>
                <td>
                  <input data-id={user.id} type="checkbox" checked={user.isAdmin} onChange={updateUser}/>
                </td>
                <td>
                  <button data-id={user.id} onClick={deleteUser}>Delete</button>
                </td>
              </tr>)
              )
            }</tbody>
        </table>
      </div>
    </>
  );
}
export default App;
