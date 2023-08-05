import { useState } from "react";
import styled from "styled-components";
import { memberStore } from "../store/memberStore";
import { ThemeColor } from "../assets/constants";
import { authStore } from "../store/authStore";
import moment from "moment";
import { updateMember } from "../utils/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { googleLoginInfo, setUser } = authStore();
  const { members } = memberStore();
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    name: string;
    gender: string;
    birthDay: string;
  }>({
    name: "",
    gender: "",
    birthDay: "",
  });

  const submit = () => {
    const target = members.find(
      (member) =>
        member.name === form.name &&
        member.birthDay === moment(form.birthDay).format("YYYY.MM.DD")
    );
    if (!target) {
      alert("이름과 생일이 일치하는 회원이 없습니다. 운영진에게 문의해주세요.");
      return;
    }
    if (!googleLoginInfo?.uid) {
      alert("구글 로그인에 문제가 있습니다. 재로그인하고 다시 시도해 주세요.");
      return;
    }
    updateMember(form.name, "uid", googleLoginInfo.uid)
      .then(() => {
        alert("회원가입에 성공했습니다.");
        setUser({ ...target, uid: googleLoginInfo.uid });
        navigate("/");
      })
      .catch((error) => alert(error));
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 12,
        }}
      >
        러브올 회원가입
      </p>
      <Description>
        1. 회원 가입 방법 이미 러브올 db에 등록되어있는 회원의 경우 이름과
        생년월일, 성별을 정확히 입력하여 가입하면 즉시 회원가입이 완료됩니다.
      </Description>
      {/* <Description>
        2. 러브올 db에 등록되어 있지 않은 분의 경우 러브올 운영진에게 가입
        신청이 전송되어 처리 후 가입이 완료됩니다.
      </Description> */}
      <form style={{ display: "flex", flexDirection: "column" }}>
        <InputContainer>
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="name">생일</Label>
          <Input
            type="date"
            id="birthDay"
            value={form.birthDay}
            onChange={(e) => setForm({ ...form, birthDay: e.target.value })}
          />
        </InputContainer>
        <InputContainer>
          <Label>성별</Label>
          <Label style={{ marginLeft: 8 }} htmlFor="maleGender">
            남
          </Label>
          <Input
            id="maleGender"
            type="radio"
            value={"male"}
            checked={form.gender === "male"}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          />
          <Label style={{ marginLeft: 20 }} htmlFor="femaleGender">
            여
          </Label>
          <Input
            id="femaleGender"
            type="radio"
            value={"female"}
            checked={form.gender === "female"}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          />
        </InputContainer>
      </form>
      <button
        disabled={!form.name || !form.gender || !form.birthDay}
        onClick={submit}
        style={{
          padding: "4px 8px",
          marginTop: 20,
          fontWeight: "bold",
          borderRadius: 8,
          border: `1px solid ${ThemeColor}`,
          color: ThemeColor,
          backgroundColor: "aliceblue",
        }}
      >
        회원 가입
      </button>
    </div>
  );
};

const Description = styled.p`
  width: 320px;
  margin-bottom: 12px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Label = styled.label`
  margin-right: 12px;
  font-weight: 600;
`;

const Input = styled.input`
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #cccccc;
  border-radius: 8px;
`;

export default SignUp;
