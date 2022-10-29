import { createContext } from 'react';

const userCtx = createContext();
function UserContextProvider() {
  return (
    <div>UserContextProvider</div>
  );
}

export default UserContextProvider;
