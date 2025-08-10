import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useId,
} from "react";
import "./dropDown.scss";

export interface DropdownOption {
  name: string;
  value: string;
}

interface DropdownProps {
  required?: boolean;
  label?: string;
  options: DropdownOption[];
  placeholder?: string;
  value?: string;
  onChange?: (option: DropdownOption) => void;
  width?: string | number;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value = "",
  onChange,
  width = "100%",
  required = false,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownId = useId();

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("pointerdown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (option: DropdownOption) => {
      onChange?.(option);
      setIsOpen(false);
    },
    [onChange]
  );

  const selectedLabel = useMemo(() => {
    return options.find((opt) => opt.value === value)?.name || "";
  }, [options, value]);

  return (
    <div
      className="dropdown-container"
      ref={containerRef}
      style={{ width }}
      aria-label={label}
      aria-required={required}
    >
      {label && (
        <label htmlFor={dropdownId}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}

      <div
        id={dropdownId}
        className="dropdown-header"
        onClick={toggleDropdown}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleDropdown();
          }
        }}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={!selectedLabel ? "placeholder" : ""}>
          {selectedLabel || placeholder}
        </span>
        <span className={`arrow ${isOpen ? "up" : "down"}`} />
      </div>

      {isOpen && options.length > 0 && (
        <ul className="dropdown-list" role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`dropdown-item ${
                value === opt.value ? "selected" : ""
              }`}
              onClick={() => handleSelect(opt)}
              role="option"
              aria-selected={value === opt.value}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(opt);
                }
              }}
            >
              {opt.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.displayName = "Dropdown";

export default React.memo(Dropdown);
