import Page2Logic from "./Page2Logic";

const Page2 = () => {
  const { isLoading, users, errorMessage } = Page2Logic();
  return (
    <div>
      <h2>Page2</h2>
      {isLoading && <h3>Loading...</h3>}
      {errorMessage && <h3>{errorMessage}</h3>}
      <ul>{users && users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>
    </div>
  );
};

export default Page2;
