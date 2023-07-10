import moment from "moment";
import { memberStore, IMember } from "../../store/memberStore";
import { BoxShadow } from "../../utils/styled";
import { getAge, getDuration } from "../../utils/utils";

const MemberManage = () => {
  const { members } = memberStore();

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ fontWeight: "bold", fontSize: 18 }}>회원 명단</div>
      <div style={{ marginTop: 24, color: "black" }}>
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
        border: "1px solid whitesmoke",
        borderRadius: 16,
        boxShadow: BoxShadow,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <span>{`${name} (${gender === "male" ? "남" : "여"}/${getAge(
          birthDay
        )})`}</span>
        <span>
          가입: {moment(joinDate).format("YYYY.MM.DD")}
          {` (${getDuration(joinDate)})`}
        </span>
        <span>
          {leaveDate ? "탈퇴 " : "생일 "}
          {moment(leaveDate || birthDay).format("YYYY.MM.DD")}
        </span>
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
