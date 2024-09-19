import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const hostUrl = import.meta.env.PROD ? window.location.href : "http://localhost:8080/";  // looks for variable env.PROD in GCP, if nots exists it picks localhost url
  
  //async func looks for the response and react
  const fetchUsers = async () => {
    const response = await fetch(`${hostUrl}api/users`); //wait func 
    const usersToJson = await response.json();
    console.log(usersToJson)
    setUsers(usersToJson);
  };

  useEffect(() => {  //as soon display the result, when the component mounted
    fetchUsers();
  }, []);
  
  const createUser = async (e) => {  //e - event 
    console.log(e)
    //e.preventDefault()  // prevents from reloading the page if there is any changes
    const response = await fetch(`${hostUrl}api/users`, {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify({ name: e.target.name.value, isAdmin: e.target.isAdmin.checked , isActive: e.target.isActive.checked }),
    });
    const newUser = await response.json();

    setUsers([...users, newUser]);  // spread operator and append to array at the end of the array
}
  return (
    <><div>

      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Is Admin</th>
            <th>Is Active</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.isAdmin.toString()}</td>
              <td>{user.isActive.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div><div><h1>New User</h1>
        <form onSubmit={createUser}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="isAdmin">Is Admin</label>
          <input type="checkbox" name="isAdmin" />
          <label htmlFor="isActive">Is Active</label>
          <input type="checkbox" name="isActive" />
          <input type="submit" />
        </form>
        
      </div></>
 );
}
export default App;