import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SearchIcon from "../assets/Icon/SearchIcon";
import { BoxShadow } from "../utils/styled";
import styled from "styled-components";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onSubmit: (value: string) => void;
  autoTargetNameList: string[];
}

const SearchInput = ({
  value,
  setValue,
  onSubmit,
  autoTargetNameList,
}: Props) => {
  const [seleted, setSelected] = useState<string>("");

  useEffect(() => {
    if (autoTargetNameList.length) {
      setSelected(autoTargetNameList[0]);
    } else setSelected("");
  }, [autoTargetNameList]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const targetIndex = autoTargetNameList.indexOf(seleted);
    const lastIndex = autoTargetNameList.length - 1;

    switch (e.key) {
      case "Enter":
        onSubmit(seleted);
        return;
      case "ArrowUp":
        if (targetIndex === 0)
          setSelected(autoTargetNameList[lastIndex] || autoTargetNameList[0]);
        else setSelected(autoTargetNameList[targetIndex - 1]);
        return;
      case "ArrowDown":
        if (targetIndex === lastIndex) setSelected(autoTargetNameList[0]);
        else setSelected(autoTargetNameList[targetIndex + 1]);
        return;
      default:
        return;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: 24,
        position: "relative",
      }}
    >
      <SearchIcon
        style={{ position: "absolute", right: "8px", cursor: "pointer" }}
        onClick={() => onSubmit(seleted)}
      />
      <Input
        value={value}
        onKeyDown={handleKey}
        onChange={(e) => setValue(e.target.value)}
        type="text"
      />
      {autoTargetNameList.length !== 0 && (
        <SearchBox>
          <SearchItem
            isSelected={false}
            style={{ borderTop: "none", fontSize: 11, padding: "2px 12px" }}
          >
            자동완성
          </SearchItem>
          {autoTargetNameList.map((autoTargetName) => {
            return (
              <SearchItem
                isSelected={seleted === autoTargetName}
                onMouseEnter={() => {
                  setSelected(autoTargetName);
                }}
                onClick={() => {
                  onSubmit(autoTargetName);
                }}
              >
                {autoTargetName}
              </SearchItem>
            );
          })}
        </SearchBox>
      )}
    </div>
  );
};

const Input = styled.input`
  padding: 4px 28px 4px 12px;
  border-radius: 16px;
  border: 1px solid lightgray;
  box-shadow: ${BoxShadow};
  outline: blue;
`;

const SearchBox = styled.ul`
  position: absolute;
  top: 40px;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding-bottom: 8px;
  background-color: white;
  box-shadow: ${BoxShadow};
`;

const SearchItem = styled.li<{ isSelected: boolean }>`
  padding: 4px 12px;
  border-top: 1px solid lightgray;
  width: 257px;
  background-color: ${(props) => (props.isSelected ? "whitesmoke" : "")};
  cursor: pointer;
`;

export default SearchInput;
