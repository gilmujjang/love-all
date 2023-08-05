import moment from "moment";
import { memberStore } from "../../store/memberStore";
import { BoxShadow } from "../../utils/styled";
import { getAge, getDuration } from "../../utils/utils";
import { IMember } from "../../types";

const MemberManage = () => {
  const { members } = memberStore();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <h3
        style={{
          fontWeight: "bold",
          fontSize: 18,
          padding: 16,
          borderBottom: "1px solid whitesmoke",
        }}
      >
        회원 명단
      </h3>
      <div style={{ flex: 1, color: "black", overflowY: "auto" }}>
        {members.map((memberData) => {
          return <MemberCard userData={memberData} />;
        })}
      </div>
    </div>
  );
};

const MemberCard = ({ userData }: { userData: IMember }) => {
  const {
    name,
    gender,
    birthDay,
    joinDate,
    createdDate,
    editedDate,
    leaveDate,
  } = userData;
  return (
    <div
      style={{
        padding: "4px 12px",
        border: "1px solid lightgray",
        borderRadius: 16,
        boxShadow: BoxShadow,
        display: "flex",
        flexDirection: "column",
        margin: "8px 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <span>
          {`${name} (${gender === "male" ? "남" : "여"}/${getAge(birthDay)})`}
        </span>
        <div>
          <div>가입: {moment(joinDate).format("YYYY.MM.DD")}</div>
          <div style={{ fontSize: 14, color: "gray" }}>
            {` (${getDuration(2, joinDate)})`}
          </div>
        </div>
        {(leaveDate || birthDay) && (
          <span>
            {leaveDate ? "탈퇴 " : "생일 "}
            {moment(leaveDate || birthDay).format("YYYY.MM.DD")}
          </span>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <span style={{ fontSize: 14, color: "gray" }}>
          {editedDate
            ? `수정일 ${moment(joinDate).format("YYYY.MM.DD")}`
            : `생성일: ${moment(createdDate).format("YYYY.MM.DD")}`}
        </span>
      </div>
    </div>
  );
};

export default MemberManage;
