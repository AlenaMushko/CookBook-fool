import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper, Stack } from "@mui/material";
import { UniversalSwitcher } from "@shared/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface FilterProps {
  setIsMyDishes: (e: boolean) => void;
  setSearchDish: (e: string) => void;
  isMyDishes: boolean;
}

const Filter: React.FC<FilterProps> = ({
  setIsMyDishes,
  setSearchDish,
  isMyDishes,
}) => {
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState<string>("");

  const handleSearch = () => {
    setSearchDish(inputValue);
  };
  return (
    <Stack
      direction='row'
      sx={{
        gap: "16px",
        p: "16px 0",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <UniversalSwitcher
        checked={isMyDishes}
        onChange={(e) => setIsMyDishes(e.target.checked)}
        label={isMyDishes ? t("dish.myDishes") : t("dish.allDishes")}
      />
      <Paper
        component='form'
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={t("dish.search")}
          inputProps={{ "aria-label": "search dish" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <IconButton
          type='button'
          sx={{ p: "10px" }}
          aria-label='search'
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Filter;
