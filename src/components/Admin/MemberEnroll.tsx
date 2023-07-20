import { useState, useEffect } from "react";
import moment from "moment";
import { MemberDoc } from "../../types";
import { postMember } from "../../utils/api";
import styled from "styled-components";
import { BoxShadow } from "../../utils/styled";
import { memberStore } from "../../store/memberStore";

interface IFormProps {
  name: string;
  gender: "male" | "female";
  joinDate: string;
  birthDay: string;
  isManager: boolean;
}

const defaultInfo: IFormProps = {
  name: "",
  gender: "male",
  joinDate: "",
  birthDay: "",
  isManager: false,
};

interface IFormValidationProps {
  name: string | boolean;
  birthDay: boolean;
  joinDate: boolean;
}

const MemberEnroll = () => {
  const { members } = memberStore();
  const [formInfo, setFormInfo] = useState<IFormProps>({
    ...defaultInfo,
  });
  const [formAlert, setFormAlert] = useState<IFormValidationProps>({
    name: true,
    birthDay: true,
    joinDate: true,
  });

  useEffect(() => {
    const memberList = members.map((member) => member.name);
    const { name, birthDay, joinDate } = formInfo;
    const temp: IFormValidationProps = {
      name: true,
      birthDay: true,
      joinDate: true,
    };
    if (name.length >= 2) temp.name = false;
    if (!memberList.includes(name)) temp.name = false;
    else temp.name = "이미 존재하는 이름입니다.";
    if (birthDay) temp.birthDay = false;
    if (joinDate) temp.joinDate = false;
    setFormAlert(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formInfo.name, formInfo.birthDay, formInfo.joinDate]);

  const checkFormAlert = () => {
    if (Object.values(formAlert).includes(false)) return false;
    else return true;
  };

  const onSubmit = () => {
    const payload: MemberDoc = {
      birthDay: moment(formInfo.birthDay).format("YYYY.MM.DD"),
      createdDate: moment(new Date()).format("YYYY.MM.DD"),
      gender: formInfo.gender,
      isAdmin: false,
      isManager: false,
      joinDate: moment(formInfo.joinDate).format("YYYY.MM.DD"),
      name: formInfo.name,
      uid: "",
    };
    postMember(payload)
      .then((res) => {
        console.log("🚀 postMember then res:", res);
        setFormInfo({ ...defaultInfo });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h3 style={{ fontWeight: "bold", fontSize: 18 }}>회원 등록</h3>
        <InputContainer>
          <InputWrapper>
            <Label htmlFor="nameId">이름</Label>
            <div>
              <Input
                type="text"
                id="nameId"
                name="name"
                placeholder="입력하세요"
                value={formInfo.name}
                onChange={(e) =>
                  setFormInfo({ ...formInfo, name: e.target.value })
                }
              />
              {formAlert.name && <div>중복되는 이름이 이미 존재합니다.</div>}
            </div>
          </InputWrapper>
          <InputWrapper style={{ justifyContent: "flex-end" }}>
            <Label htmlFor="maleId">
              <Input
                style={{ width: 32 }}
                type="radio"
                id="maleId"
                name="male"
                value="male"
                checked={formInfo.gender === "male"}
                onChange={(e) =>
                  setFormInfo({
                    ...formInfo,
                    gender: e.target.value as "male" | "female",
                  })
                }
              />
              남
            </Label>
            <Label htmlFor="femaleCheckId">
              <Input
                style={{ width: 32 }}
                type="radio"
                id="femaleId"
                name="female"
                value="female"
                checked={formInfo.gender === "female"}
                onChange={(e) =>
                  setFormInfo({
                    ...formInfo,
                    gender: e.target.value as "male" | "female",
                  })
                }
              />
              여
            </Label>
          </InputWrapper>
        </InputContainer>
        <InputContainer>
          <InputWrapper>
            <Label htmlFor="joinDateId">가입일</Label>
            <Input
              type="date"
              id="joinDateId"
              name="joinDate"
              value={formInfo.joinDate}
              onChange={(e) =>
                setFormInfo({ ...formInfo, joinDate: e.target.value })
              }
            />
          </InputWrapper>
          <InputWrapper style={{ marginLeft: 16 }}>
            <Label htmlFor="birthDayId">생일</Label>
            <Input
              type="date"
              id="birthDayId"
              name="birthDay"
              value={formInfo.birthDay}
              onChange={(e) =>
                setFormInfo({ ...formInfo, birthDay: e.target.value })
              }
            />
          </InputWrapper>
        </InputContainer>
        <InputContainer>
          <InputWrapper>
            <Label htmlFor="managerTrue" style={{ width: 84 }}>
              <Input
                type="radio"
                id="managerTrue"
                name="isManager"
                checked={formInfo.isManager === true}
                onClick={() => setFormInfo({ ...formInfo, isManager: true })}
              />
              운영진
            </Label>
            <Label htmlFor="managerFalse" style={{ width: 84 }}>
              <Input
                type="radio"
                id="managerFalse"
                name="isNotManager"
                checked={formInfo.isManager === false}
                onClick={() => setFormInfo({ ...formInfo, isManager: false })}
              />
              일반 회원
            </Label>
          </InputWrapper>
        </InputContainer>
      </div>
      <Button disabled={checkFormAlert()} onClick={onSubmit}>
        회원 생성
      </Button>
    </div>
  );
};

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const Label = styled.label`
  color: black;
  width: 64px;
`;

const Input = styled.input`
  flex: 1;
  color: black;
  padding: 4px 8px;
  border-radius: 16px;
  border: 1px solid lightgray;
  outline: none;
`;

const Button = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => (props.disabled ? "lightgray" : "white")};
  margin-bottom: 20px;
  font-weight: bold;
  align-self: center;
  color: black;
  padding: 8px 16px;
  border: 1px solid lightgray;
  border-radius: 8px;
  box-shadow: ${BoxShadow};
`;

export default MemberEnroll;
