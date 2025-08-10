import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import classNames from "classnames";
import { SearchInputProps } from "./inputInterface";
import "./searchInput.scss";

const SearchInput: React.FC<SearchInputProps> = ({
  icon,
  className,
  ...rest
}) => {
  return (
    <div className={classNames("search-input-container", className)}>
      <input
        type="text"
        className="search-input"
        aria-label="Search"
        {...rest}
      />
      <span className="search-icon" role="img" aria-hidden="true">
        {icon || <SearchIcon color={rest.disabled ? "disabled" : "primary"} />}
      </span>
    </div>
  );
};

export default React.memo(SearchInput);
