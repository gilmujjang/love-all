import { useEffect, useState } from "react";
import SearchIcon from "../assets/Icon/SearchIcon";
import { BoxShadow } from "../utils/styled";
import styled from "styled-components";
import { gameDataStore } from "../store/gameDataStore";

const SearchInput = () => {
  const { searchTarget, setSearchTarget, playerList } = gameDataStore();
  const [autoTargetNameList, setAutoTargetNameList] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [seleted, setSelected] = useState<string>("");

  const { targetName } = searchTarget;

  useEffect(() => {
    setInput("");
  }, [targetName]);

  useEffect(() => {
    if (input) {
      const filtered = playerList.filter((player) => {
        return player.toLowerCase().includes(input.toLowerCase());
      });

      const sorted = filtered.sort((a, b) => {
        const startsWithA = a.toLowerCase().startsWith(input.toLowerCase());
        const startsWithB = b.toLowerCase().startsWith(input.toLowerCase());
        if (startsWithA && !startsWithB) return -1;
        else if (!startsWithA && startsWithB) return 1;
        else return 0;
      });
      setAutoTargetNameList(sorted.slice(0, 8));
    } else setAutoTargetNameList([]);
  }, [playerList, input]);

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
        setSearchTarget({ targetType: "player", targetName: seleted });
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
        onClick={() =>
          setSearchTarget({ targetType: "player", targetName: seleted })
        }
      />
      <Input
        value={input}
        onKeyDown={handleKey}
        onChange={(e) => setInput(e.target.value)}
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
                key={autoTargetName}
                isSelected={seleted === autoTargetName}
                onMouseEnter={() => {
                  setSelected(autoTargetName);
                }}
                onClick={() => {
                  setSearchTarget({
                    targetType: "player",
                    targetName: seleted,
                  });
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
