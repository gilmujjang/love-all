import { useEffect } from "react";
import { authStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { isManager } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isManager) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isManager]);

  return <div>Admin</div>;
};

export default Admin;
