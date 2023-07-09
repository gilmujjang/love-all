import { useEffect } from "react";
import { authStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import MemberEnroll from "../components/Admin/MemberEnroll";
import MemberManage from "../components/Admin/MemberManage";

const Admin = () => {
  const { isManager } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isManager) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isManager]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        margin: "20px",
        flexWrap: "wrap",
      }}
    >
      <Card>
        <MemberManage />
      </Card>
      <Card>
        <MemberEnroll />
      </Card>
    </div>
  );
};

export default Admin;
