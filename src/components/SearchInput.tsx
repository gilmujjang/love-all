import { Dispatch, SetStateAction } from "react";
import SearchIcon from "../assets/Icon/SearchIcon";
import { checkEnter } from "../utils/utils";
import { BoxShadow } from "../utils/styled";

interface Props {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  onClick: () => void;
}

const SearchInput = ({ text, setText, onClick }: Props) => {
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
        onClick={() => onClick()}
      />
      <input
        value={text}
        onKeyDown={(e) => checkEnter(e.key) && onClick()}
        onChange={(e) => setText(e.target.value)}
        type="text"
        style={{
          padding: "4px 28px 4px 12px",
          borderRadius: 16,
          border: "1px solid lightgray",
          boxShadow: BoxShadow,
          outline: "blue",
        }}
      />
    </div>
  );
};

export default SearchInput;
