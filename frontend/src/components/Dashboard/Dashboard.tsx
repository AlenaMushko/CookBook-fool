import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{
          width: "250px",
          background: "#f4f4f4",
          padding: "1rem",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <nav>
          <ul>
            <li>
              <a href='/dashboard/dishes/qwe'>Dishes</a>
            </li>
            <li>
              <a href='/dashboard/dish/1'>Dish #1</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
