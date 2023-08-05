import { useEffect, useState } from "react";
import SearchIcon from "../assets/Icon/SearchIcon";
import { BoxShadow } from "../utils/styled";
import styled from "styled-components";
import { gameDataStore } from "../store/gameDataStore";
import { RangeEnum, SearchType } from "../types";
import Button from "../components/Button";
import { getRangeDisplayName } from "../utils/utils";
import { authStore } from "../store/authStore";

const SearchLayout = () => {
  const {
    searchTarget,
    setSearchTarget,
    playerList,
    courtList,
    range,
    setRange,
  } = gameDataStore();
  const { user, googleLoginInfo } = authStore();
  const [autoTargetNameList, setAutoTargetNameList] = useState<
    { targetName: string; targetType: SearchType | null }[]
  >([]);
  const [input, setInput] = useState<string>("");
  const [seleted, setSelected] = useState<{
    targetName: string;
    targetType: SearchType | null;
  }>({ targetName: "", targetType: null });

  const { targetName } = searchTarget;

  useEffect(() => {
    setInput("");
  }, [targetName]);

  useEffect(() => {
    if (input) {
      const playerListObj = playerList.map((player) => {
        return { targetType: SearchType.player, targetName: player };
      });
      const courtListObj = courtList.map((court) => {
        return { targetType: SearchType.court, targetName: court };
      });
      const filtered = [...playerListObj, ...courtListObj].filter((obj) => {
        return obj.targetName.toLowerCase().includes(input.toLowerCase());
      });

      const sorted = filtered.sort((a, b) => {
        const startsWithA = a.targetName
          .toLowerCase()
          .startsWith(input.toLowerCase());
        const startsWithB = b.targetName
          .toLowerCase()
          .startsWith(input.toLowerCase());
        if (startsWithA && !startsWithB) return -1;
        else if (!startsWithA && startsWithB) return 1;
        else return 0;
      });
      setAutoTargetNameList(sorted.slice(0, 8));
    } else setAutoTargetNameList([]);
  }, [playerList, courtList, input]);

  useEffect(() => {
    if (autoTargetNameList.length) {
      setSelected(autoTargetNameList[0]);
    } else setSelected({ targetType: null, targetName: "" });
  }, [autoTargetNameList]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const targetIndex = autoTargetNameList.indexOf(seleted);
    const lastIndex = autoTargetNameList.length - 1;

    switch (e.key) {
      case "Enter":
        setSearchTarget(seleted);
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
    <div style={{ display: "flex" }}>
      <Button
        onClick={() => setRange(RangeEnum.일개월)}
        isSelected={range === RangeEnum.일개월}
      >
        {getRangeDisplayName(RangeEnum.일개월)}
      </Button>
      <Button
        onClick={() => setRange(RangeEnum.삼개월)}
        isSelected={range === RangeEnum.삼개월}
      >
        {getRangeDisplayName(RangeEnum.삼개월)}
      </Button>
      <Button
        onClick={() => setRange(RangeEnum.육개월)}
        isSelected={range === RangeEnum.육개월}
      >
        {getRangeDisplayName(RangeEnum.육개월)}
      </Button>
      <Button
        onClick={() => setRange(RangeEnum.일년)}
        isSelected={range === RangeEnum.일년}
      >
        {getRangeDisplayName(RangeEnum.일년)}
      </Button>
      <Button
        onClick={() => setRange(RangeEnum.전체)}
        isSelected={range === RangeEnum.전체}
      >
        {getRangeDisplayName(RangeEnum.전체)}
      </Button>
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
          onClick={() => setSearchTarget(seleted)}
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
            {autoTargetNameList.map((autoTarget) => {
              return (
                <SearchItem
                  key={autoTarget.targetName}
                  isSelected={seleted === autoTarget}
                  onMouseEnter={() => {
                    setSelected(autoTarget);
                  }}
                  onClick={() => {
                    setSearchTarget(seleted);
                  }}
                >
                  {autoTarget.targetName}
                </SearchItem>
              );
            })}
          </SearchBox>
        )}
      </div>
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

export default SearchLayout;
