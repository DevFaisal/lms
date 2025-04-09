import { useEffect, useState } from "react";
import { userService } from "../services/users";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router";

interface User {
  id: number;
  name: string;
  email: string;
}

const ChooseUser = () => {
  const [users, setUsers] = useState([]);
  const setUserId = useUserStore((state) => state.setUserId);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      //clear local storage
      localStorage.clear();
      const fetchedUsers = await Promise.all([
        userService.getUser(26),
        userService.getUser(28),
        userService.getUser(29),
      ]);
      console.log(fetchedUsers);
      //@ts-ignore
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  const handleUserClick = (userId: number) => {
    //Store the user in local storage
    //@ts-ignore
    localStorage.setItem("user", JSON.stringify(users.find((user) => user.id === userId)));
    setUserId(userId);

    navigate("/dashboard");
    console.log(`User ${userId} clicked`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h2 className="text-2xl font-bold mb-6">Login As</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, idx) => (
          //@ts-ignore
          <UserCard key={idx} user={user} onclick={() => handleUserClick(user.id)} />
        ))}
      </div>
    </div>
  );
};

export default ChooseUser;

function UserCard({ user, onclick }: { user: User; onclick: () => void }) {
  return (
    <button onClick={onclick} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
    </button>
  );
}
