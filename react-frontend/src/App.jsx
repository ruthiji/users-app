import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap";
//import "EventHandler";

function App() {
  const [users, setUsers] = useState([]);
  // const hostUrl = import.meta.env.PROD
   // ? window.location.href
   // : "http://localhost:8080/"; // looks for variable env.PROD in GCP, if nots exists it picks localhost url
   const hostUrl = "http://localhost:8080/";

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
        isManager: e.target.isManager.checked,
        isActive: e.target.isActive.checked
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

  // const updateUser = async (e) => {
  //   const response = await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({ isAdmin: e.target.checked }),
  //   });
  //   await response.json();
  //   await fetchUsers();
  // };
   
  const updateRole = async (e) => {
      
    // Update role status on the server
    await fetch(`${hostUrl}api/addrole/${e.target.dataset.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ 
        isManager: 'true',
        adminRole:  "role.admin", }),
    });
  
    let updatedUser;
    if (e.target.checked) {
      // Fetch updated user details if isAdmin is true
      const response = await fetch(`${hostUrl}api/users/${e.target.dataset.id}`);
      updatedUser = await response.json();
    } else {
      // If isAdmin is false, modify the user locally
      updatedUser = users.find(user => user.id === e.target.dataset.id) || {};
      updatedUser = { ...updatedUser, adminRole: 'N/A' };
    }
  
    // Update state with the modified user
    setUsers(prevUsers =>
      prevUsers.map(user => (user.id === e.target.dataset.id ? updatedUser : user))
    );
  };


 /* const onsubmit = async (e) =>
  {
    e.preventDefault();
   const submitres=e.target.name.value;
   if (submitres != null){      
    console.log("Enter valid username");
    return;
                <td>
                  <button data-id={user.id} onClick={deleteUser}>Delete</button>
                </td>
              </tr>)
              )
            }</tbody>
        </table>
      </div>
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
          <label htmlFor="isManager">Is Manager</label>
          <input type="checkbox" name="isManager" />
          <label htmlFor="isActive">Is Active</label>
          <input type="checkbox" name="isActive" />
          <button type="submit" class="submit">submit</button>
        </form>
     
       <h1>Users</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Is Manager</th>
              <th scope="col">Is Active</th>
              <th scope="col">AdminRole</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.isManager.toString()}</td>
                <td>{user.isActive.toString()}</td>
                <td>{user.adminRole}</td>
                <td>
                  <input data-id={user.id} type="checkbox" checked={user.isAdmin} onChange={updateRole}/>
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
